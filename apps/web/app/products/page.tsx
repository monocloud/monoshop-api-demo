import { getProducts } from "../actions/api";
import { ErrorCard } from "../components/error-card";
import ProductGrid from "./product-grid";

export default async function ProductsPage() {
  const res = await getProducts();

  if (!res.success) {
    return <ErrorCard title="Error Loading Products" message={res.errorMessage} />;
  }

  const products = res.result;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-1">
          Products
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          {products.length} items available
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
