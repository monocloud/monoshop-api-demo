interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="bg-gray-50 aspect-square flex items-center justify-center p-6 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm text-black leading-tight mb-2">
          {name}
        </h3>
        <p className="text-lg font-black text-black">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
