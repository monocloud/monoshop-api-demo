"use server";

import { getTokens } from "@monocloud/auth-nextjs";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Invoice {
  id: string;
  total: number;
  status: "paid" | "pending";
}

export type ServerResponse<
  TResult = undefined,
  TSuccess extends boolean = boolean,
> = TSuccess extends true
  ? {
      success: TSuccess;
      result: TResult;
    }
  : {
      success: TSuccess;
      errorMessage: string;
    };

export const getProducts = async (): Promise<ServerResponse<Product[]>> => {
  const tokens = await getTokens();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products`,
    {
      headers: {
        Authorization: `Bearer ${tokens?.accessToken}`,
      },
    },
  );

  if (!res.ok) {
    return {
      success: false,
      errorMessage: `API request failed with status ${res.status}`,
    };
  }

  return {
    success: true,
    result: (await res.json()) as Product[],
  };
};

export const getInvoices = async (): Promise<ServerResponse<Invoice[]>> => {
  const tokens = await getTokens();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_INVOICE_API_URL}/invoices`,
    {
      headers: {
        Authorization: `Bearer ${tokens?.accessToken}`,
      },
    },
  );

  if (!res.ok) {
    return {
      success: false,
      errorMessage: `API request failed with status ${res.status}`,
    };
  }

  return {
    success: true,
    result: (await res.json()) as Invoice[],
  };
};
