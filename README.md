<div align="center">
  <a href="https://www.monocloud.com?utm_source=github&utm_medium=monoshop_demo" target="_blank" rel="noopener noreferrer">
    <picture>
      <img src="https://raw.githubusercontent.com/monocloud/monoshop-api-demo/refs/heads/main/banner.svg" alt="MonoCloud Banner">
    </picture>
  </a>
</div>
<br />

# MonoShop API Demo

MonoShop is a sample storefront that demonstrates how Node.js APIs can validate and use MonoCloud issued access tokens.

The demo includes a **Next.js** front end and two **Express APIs**. Users sign in through MonoCloud, the Next.js app gets an access token, and the APIs validate that token before returning protected data.

This example shows how to build APIs that enforce:

- Valid MonoCloud issued bearer tokens
- API specific audiences
- Route level scopes
- Token based access from a frontend application

## Architecture

```
monoshop-api-demo
├── apps
│   └── web              # Next.js app that signs users in and calls the APIs
└── services
    ├── product-api      # Express API for product data (port 4001)
    └── invoice-api      # Express API for invoice data (port 4002)
```

Each API is modeled as a separate protected resource with its own audience and scope requirements.

| Service      | Audience                           | Protected route | Required scope   |
| ------------ | ---------------------------------- | --------------- | ---------------- |
| Product API  | `http://api.monoshop.com/products` | `GET /products` | `read:products`  |
| Invoice API  | `http://api.monoshop.com/invoices` | `GET /invoices` | `read:invoices`  |

## How it works

1. The user signs in to the Next.js app using MonoCloud.
2. The app requests access to the Product API and Invoice API.
3. MonoCloud issues access tokens for the requested API resources.
4. The Next.js app forwards the access token to the APIs using the `Authorization: Bearer <token>` header.
5. Each Express API validates the token using the MonoCloud Node.js Backend SDK.
6. The API checks the token audience and required scope before returning data.

## Features

- **Express API protection**: Protect routes using middleware from `@monocloud/backend-node`.
- **Audience-aware token validation**: Each API only accepts tokens issued for its own audience.
- **Scoped authorization**: Routes require specific scopes such as `read:products` or `read:invoices`.
- **Frontend-to-API bearer token forwarding**: The Next.js app uses `getTokens()` to retrieve access tokens from the user session and sends them to the APIs.
- **Multi-API demo setup**: The storefront calls two separate APIs, each with its own authorization rules.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 10 or later
- A [MonoCloud account](https://dashboard.monocloud.com/api/auth/signin?prompt=create)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/monocloud/monoshop-api-demo.git
   cd monoshop-api-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables

   Each app and service includes an `.env.example` file. Copy each one to `.env` and fill in the required values from your [MonoCloud dashboard](https://dashboard.monocloud.com).

   ```text
   apps/web/.env.example
   services/product-api/.env.example
   services/invoice-api/.env.example
   ```

4. Start every app in the workspace:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000` in your browser. After signing in, the dashboard calls both protected APIs and renders their data.

## Testing API protection

With the services running, call each API directly without a token:

```bash
curl http://localhost:4001/products
curl http://localhost:4002/invoices
```

Both requests return `401 Unauthorized` because the routes require a valid bearer token.

To call an API successfully, send a valid MonoCloud issued access token with the correct audience and scope:

```bash
curl http://localhost:4001/products \
  -H "Authorization: Bearer <access_token>"
```

The Product API requires an access token with:

```text
audience: http://api.monoshop.com/products
scope: read:products
```

The Invoice API requires an access token with:

```text
audience: http://api.monoshop.com/invoices
scope: read:invoices
```

## What this example demonstrates

Use MonoShop as a reference for building applications with:

- Protected Node.js APIs
- Express middleware-based token validation
- Audience-specific access tokens
- Scoped API authorization
- Frontend-to-backend bearer token calls
- Multiple APIs protected by the same identity platform

## Learn more

- [MonoCloud Website](https://monocloud.com?utm_source=github&utm_medium=monoshop_demo)
- [MonoCloud Documentation](https://www.monocloud.com/docs?utm_source=github&utm_medium=monoshop_demo)
- [MonoCloud Express Backend SDK](https://www.monocloud.com/docs/sdks/express-backend/index)
- [MonoCloud Fastify Backend SDK](https://www.monocloud.com/docs/sdks/fastify-backend/index)
