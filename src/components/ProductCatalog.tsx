import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Package, ShoppingCart, Info } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-1 w-12 bg-[#ff9f1c]"></div>
        <h2 className="text-3xl font-black text-[#2f3e46] uppercase italic">Product Catalog</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 group hover:border-[#ff9f1c] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-orange-50 transition-colors">
                <Package className="text-[#2f3e46] group-hover:text-[#ff9f1c]" size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-[#2f3e46] mb-2">{product.name}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-black text-[#ff9f1c]">₹{product.price}</span>
              <span className="text-xs font-bold text-gray-400 uppercase">per {product.unit}</span>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => addToCart(product, 1)}
                className="flex-1 bg-[#2f3e46] text-white py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={14} /> Add to Cart
              </button>
              <button className="p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                <Info size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
