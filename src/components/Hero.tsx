import React from 'react';
import { ShoppingCart, Truck, ShieldCheck, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-[#2f3e46] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#ff9f1c] text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <ShieldCheck size={14} /> Quality Certified Materials
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 uppercase italic">
              Build with <span className="text-[#ff9f1c]">Precision</span>, Deliver with <span className="text-[#ff9f1c]">Speed</span>.
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
              Dev Construction & Sales: Your enterprise-grade partner for high-grade RCC, Bitumen, and heavy aggregates. Powered by the e-Kart logistics engine.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#ff9f1c] text-black px-8 py-4 rounded font-black uppercase tracking-widest flex items-center gap-3 hover:bg-[#ff9f1c]/90 transition-all">
                <ShoppingCart size={20} /> Start Bulk Order
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/20 transition-all">
                <Calculator size={20} /> Material Calculator
              </button>
            </div>

            <div className="mt-12 flex gap-8">
              <Stat label="Active Projects" value="2.5k+" />
              <Stat label="Tons Delivered" value="500k+" />
              <Stat label="Vehicle Fleet" value="120+" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ff9f1c]/20">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000" 
                alt="Construction Site"
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f3e46] to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="bg-[#ff9f1c] p-3 rounded-lg">
                    <Truck className="text-black" size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase tracking-wider">e-Kart Logistics</p>
                    <p className="text-gray-300 text-sm">Real-time tracking enabled for all bulk orders.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-3xl font-black text-white">{value}</p>
    <p className="text-xs font-bold uppercase text-[#ff9f1c] tracking-widest">{label}</p>
  </div>
);
