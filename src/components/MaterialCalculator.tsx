import React, { useState } from 'react';
import { Calculator, Truck, Package, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const MaterialCalculator: React.FC = () => {
  const [projectType, setProjectType] = useState<'slab' | 'road'>('slab');
  const [area, setArea] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(0);

  const calculate = () => {
    const volume = area * (thickness / 12); // Volume in cubic feet
    if (projectType === 'slab') {
      return {
        cement: Math.ceil(volume * 0.22), // Bags
        sand: Math.ceil(volume * 0.45), // Cu.Ft
        rods: Math.ceil(volume * 2.5), // Kg
      };
    } else {
      return {
        bitumen: Math.ceil(volume * 0.15), // Tons
        aggregates: Math.ceil(volume * 0.8), // Cu.Ft
        sand: Math.ceil(volume * 0.2), // Cu.Ft
      };
    }
  };

  const results = calculate();

  return (
    <div className="bg-[#2f3e46] text-white p-8 rounded-xl shadow-2xl border border-[#ff9f1c]/20">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="text-[#ff9f1c]" size={28} />
        <h2 className="text-2xl font-bold uppercase tracking-wider">Material Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-[#ff9f1c] mb-2">Project Type</label>
            <div className="flex gap-4">
              <button
                onClick={() => setProjectType('slab')}
                className={`flex-1 py-3 px-4 rounded font-bold transition-all ${
                  projectType === 'slab' ? 'bg-[#ff9f1c] text-black' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Residential Slab
              </button>
              <button
                onClick={() => setProjectType('road')}
                className={`flex-1 py-3 px-4 rounded font-bold transition-all ${
                  projectType === 'road' ? 'bg-[#ff9f1c] text-black' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Infrastructure Road
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#ff9f1c] mb-2">
              {projectType === 'slab' ? 'Slab Area (Sq.Ft)' : 'Road Length (Ft)'}
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full bg-black/30 border border-white/10 rounded p-3 focus:outline-none focus:border-[#ff9f1c]"
              placeholder="Enter value..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#ff9f1c] mb-2">Thickness (Inches)</label>
            <input
              type="number"
              value={thickness}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full bg-black/30 border border-white/10 rounded p-3 focus:outline-none focus:border-[#ff9f1c]"
              placeholder="Enter thickness..."
            />
          </div>
        </div>

        <div className="bg-black/20 p-6 rounded-lg border border-white/5">
          <h3 className="text-sm font-bold uppercase mb-4 text-white/50">Estimated Requirements</h3>
          <div className="space-y-4">
            {projectType === 'slab' ? (
              <>
                <ResultItem icon={<Package size={18} />} label="Cement" value={`${results.cement} Bags`} />
                <ResultItem icon={<Info size={18} />} label="Sand" value={`${results.sand} Cu.Ft`} />
                <ResultItem icon={<Truck size={18} />} label="RCC Rods" value={`${results.rods} Kg`} />
              </>
            ) : (
              <>
                <ResultItem icon={<Package size={18} />} label="Bitumen" value={`${results.bitumen} Tons`} />
                <ResultItem icon={<Info size={18} />} label="Aggregates" value={`${results.aggregates} Cu.Ft`} />
                <ResultItem icon={<Truck size={18} />} label="Sand" value={`${results.sand} Cu.Ft`} />
              </>
            )}
          </div>
          <button className="w-full mt-8 bg-[#ff9f1c] text-black font-black py-4 rounded uppercase tracking-widest hover:scale-[1.02] transition-transform">
            Add to Bulk Order
          </button>
        </div>
      </div>
    </div>
  );
};

const ResultItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-3">
    <div className="flex items-center gap-3">
      <span className="text-[#ff9f1c]">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="font-mono text-lg font-bold">{value}</span>
  </div>
);
