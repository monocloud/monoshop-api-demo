import type { Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, type JWTPayload, jwtVerify } from "jose";

export interface AuthMiddlewareOptions {
  issuer: string;
  audience?: string | string[];
  clockTolerance?: number;
  requiredScopes?: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

const jwksCache: Map<string, ReturnType<typeof createRemoteJWKSet>> = new Map();

export const authMiddleware = (
  ...args: (string[] | AuthMiddlewareOptions)[]
) => {
  if (args.length === 1 && Array.isArray(args[0])) {
    return authMiddlewareInternal({
      issuer: process.env.MONOCLOUD_AUTH_ISSUER ?? "",
      audience: process.env.MONOCLOUD_AUTH_RESOURCE_SERVER ?? "",
      requiredScopes: args[0],
    });
  }

  if (args.length === 1 && typeof args[0] === "object") {
    return authMiddlewareInternal(args[0] as AuthMiddlewareOptions);
  }

  return authMiddlewareInternal({
    issuer: process.env.MONOCLOUD_AUTH_ISSUER ?? "",
    audience: process.env.MONOCLOUD_AUTH_RESOURCE_SERVER ?? "",
  });
};

const authMiddlewareInternal = (options: AuthMiddlewareOptions) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "invalid_token" });
    }

    const token = authHeader.slice(7);

    try {
      const { issuer, audience, clockTolerance } = options;

      const jwks = await getJWKS(issuer);

      const { payload } = await jwtVerify(token, jwks, {
        issuer,
        audience,
        clockTolerance,
      });

      if (options.requiredScopes && options.requiredScopes.length > 0) {
        const tokenScopes = (payload.scope as string | undefined) || "";

        if (!validateScopes(tokenScopes, options.requiredScopes)) {
          return res.status(403).json({ error: "insufficient_scope" });
        }
      }

      req.user = payload;
      next();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "authentication failed";
      if (message.includes("expired")) {
        return res.status(401).json({ error: "token_expired" });
      }
      return res.status(401).json({ error: "invalid_token" });
    }
  };
};

const getJWKS = async (issuer: string): Promise<ReturnType<typeof createRemoteJWKSet>> => {
  const normalized = issuer.replace(/\/+$/, "");

  if (jwksCache.has(normalized)) {
    return jwksCache.get(normalized)!;
  }

  const jwksUri = new URL(
    `${normalized}/.well-known/openid-configuration/jwks`,
  );

  const resolver = createRemoteJWKSet(jwksUri);
  jwksCache.set(normalized, resolver);
  return resolver;
};

const validateScopes = (
  tokenScopes: string | string[] | undefined,
  requiredScopes?: string[],
): boolean => {
  if (!requiredScopes || requiredScopes.length === 0) {
    return true;
  }

  const scopes = Array.isArray(tokenScopes)
    ? tokenScopes
    : (tokenScopes || "").split(" ");

  return requiredScopes.every((required) => scopes.includes(required));
};

const k = authMiddleware(["test"])
