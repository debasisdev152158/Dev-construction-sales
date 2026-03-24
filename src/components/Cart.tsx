import React from 'react';
import { useStore } from '../store/useStore';
import { ShoppingCart, X, Trash2, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Cart: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 bg-[#2f3e46] text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-[#ff9f1c]" />
                <h2 className="text-xl font-black uppercase tracking-tighter">Your Bulk Cart</h2>
              </div>
              <button onClick={onClose} className="hover:text-[#ff9f1c] transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingCart size={64} strokeWidth={1} />
                  <p className="font-bold uppercase tracking-widest text-sm">Cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6">
                    <div className="bg-gray-100 p-4 rounded-lg h-20 w-20 flex items-center justify-center">
                      <ShoppingCart className="text-gray-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#2f3e46]">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 uppercase font-bold mb-2">{item.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold">Qty: {item.quantity} {item.unit}</span>
                        <span className="font-black text-[#ff9f1c]">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold uppercase text-xs">Subtotal</span>
                  <span className="text-xl font-black text-[#2f3e46]">₹{getCartTotal()}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase bg-green-50 p-2 rounded border border-green-100">
                  <Truck size={12} /> Bulk delivery estimation included
                </div>
                <button className="w-full bg-[#ff9f1c] text-black py-4 rounded font-black uppercase tracking-widest hover:bg-[#ff9f1c]/90 transition-all">
                  Checkout Order
                </button>
                <button 
                  onClick={clearCart}
                  className="w-full text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-red-500 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
