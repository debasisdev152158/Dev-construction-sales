import React from 'react';
import { Truck, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const TrackingDashboard: React.FC = () => {
  const steps = [
    { id: 1, label: 'Order Confirmed', status: 'completed', time: '09:00 AM' },
    { id: 2, label: 'Loading at Warehouse', status: 'completed', time: '10:30 AM' },
    { id: 3, label: 'Out for Delivery', status: 'active', time: '11:45 AM' },
    { id: 4, label: 'Arrived at Site', status: 'pending', time: 'Est. 02:00 PM' },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Truck className="text-[#ff9f1c]" size={28} />
          <h2 className="text-2xl font-bold text-[#2f3e46]">e-Kart Tracking</h2>
        </div>
        <div className="bg-orange-100 text-[#ff9f1c] px-4 py-1 rounded-full text-sm font-bold">
          LIVE STATUS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-6">
            {/* Mock Map */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute top-1/2 left-1/4 w-full h-1 bg-gray-300 -rotate-12"></div>
            <motion.div
              animate={{ x: [0, 100, 200], y: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/4 -mt-4"
            >
              <Truck className="text-[#ff9f1c]" size={32} />
            </motion.div>
            <div className="absolute top-1/2 right-1/4">
              <MapPin className="text-red-500" size={32} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Vehicle Type</p>
              <p className="font-bold text-[#2f3e46]">Tipper Truck (10 Ton)</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Driver Name</p>
              <p className="font-bold text-[#2f3e46]">Rajesh Kumar</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase text-gray-400">Delivery Progress</h3>
          <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {steps.map((step) => (
              <div key={step.id} className="relative flex gap-4 pl-8">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                  step.status === 'completed' ? 'bg-green-500' : 
                  step.status === 'active' ? 'bg-[#ff9f1c]' : 'bg-gray-200'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle2 size={14} className="text-white" />
                  ) : (
                    <div className={`w-2 h-2 rounded-full bg-white ${step.status === 'active' ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <div>
                  <p className={`font-bold ${step.status === 'pending' ? 'text-gray-400' : 'text-[#2f3e46]'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> {step.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
