import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Hero } from './components/Hero';
import { MaterialCalculator } from './components/MaterialCalculator';
import { TrackingDashboard } from './components/TrackingDashboard';
import { ProductCatalog } from './components/ProductCatalog';
import { Cart } from './components/Cart';
import { useStore } from './store/useStore';
import { ShoppingCart, Package, HardHat, Building2, Truck, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { auth, login, logout } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Error Boundary Component
export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, user, setUser } = useStore();
  const cartCount = cart.length;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        <nav className="bg-[#2f3e46] border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center gap-2">
                <div className="bg-[#ff9f1c] p-2 rounded">
                  <Building2 className="text-black" size={24} />
                </div>
                <span className="text-white font-black text-xl uppercase tracking-tighter">
                  Dev <span className="text-[#ff9f1c]">Construction</span>
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-8">
                <NavLink label="Residential" />
                <NavLink label="Infrastructure" />
                <NavLink label="Products" />
                <NavLink label="e-Kart" />
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-white hover:text-[#ff9f1c] transition-colors"
                >
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#ff9f1c] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-2">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-[#ff9f1c]" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#ff9f1c]">
                          <UserIcon size={16} />
                        </div>
                      )}
                      <span className="text-white text-xs font-bold uppercase tracking-widest">{user.displayName?.split(' ')[0]}</span>
                    </div>
                    <button 
                      onClick={logout}
                      className="text-white/50 hover:text-[#ff9f1c] transition-colors"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={login}
                    className="bg-[#ff9f1c] text-black px-6 py-2 rounded font-black uppercase text-sm tracking-widest hover:bg-[#ff9f1c]/90 transition-all flex items-center gap-2"
                  >
                    <LogIn size={18} /> Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

      <main>
        <Hero />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-20">
              <div className="space-y-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 w-12 bg-[#ff9f1c]"></div>
                  <h2 className="text-3xl font-black text-[#2f3e46] uppercase italic">Project Categories</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CategoryCard 
                    title="Residential" 
                    desc="House & Apartment materials. Bricks, Tiles, Finishing."
                    icon={<HardHat size={32} />}
                    image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
                  />
                  <CategoryCard 
                    title="Infrastructure" 
                    desc="Bridge & Road materials. High-grade RCC, Bitumen."
                    icon={<Truck size={32} />}
                    image="https://images.unsplash.com/photo-1590486803833-ffc6f78d50f9?auto=format&fit=crop&q=80&w=800"
                  />
                </div>
              </div>

              <ProductCatalog />

              <MaterialCalculator />
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-black text-[#2f3e46] uppercase mb-4 flex items-center gap-2">
                  <Package className="text-[#ff9f1c]" size={20} /> Quick Order
                </h3>
                <div className="space-y-4">
                  <QuickItem name="OPC Cement" price="₹550/Bag" />
                  <QuickItem name="TMT Rod 12mm" price="₹65,000/Ton" />
                  <QuickItem name="River Sand" price="₹45/Cu.Ft" />
                </div>
                <button className="w-full mt-6 bg-[#2f3e46] text-white py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-black transition-all">
                  View All Products
                </button>
              </div>

              <TrackingDashboard />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2f3e46] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#ff9f1c] p-2 rounded">
                  <Building2 className="text-black" size={24} />
                </div>
                <span className="text-white font-black text-xl uppercase tracking-tighter">
                  Dev <span className="text-[#ff9f1c]">Construction</span>
                </span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Leading supplier of high-quality construction materials and specialized logistics solutions for residential and infrastructure projects.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase text-[#ff9f1c] mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Product Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">e-Kart Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Sales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase text-[#ff9f1c] mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>123 Industrial Area</li>
                <li>New Delhi, India</li>
                <li>+91 98765 43210</li>
                <li>sales@devconstruction.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500 uppercase tracking-widest">
            © 2026 Dev Construction & Sales. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const NavLink: React.FC<{ label: string }> = ({ label }) => (
  <a href="#" className="text-gray-300 hover:text-[#ff9f1c] font-bold uppercase text-xs tracking-widest transition-colors">
    {label}
  </a>
);

const CategoryCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; image: string }> = ({ title, desc, icon, image }) => (
  <div className="group relative h-64 rounded-xl overflow-hidden shadow-lg border border-gray-200">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="absolute bottom-6 left-6 right-6">
      <div className="text-[#ff9f1c] mb-2">{icon}</div>
      <h3 className="text-xl font-black text-white uppercase italic mb-1">{title}</h3>
      <p className="text-gray-300 text-xs font-medium">{desc}</p>
    </div>
  </div>
);

const QuickItem: React.FC<{ name: string; price: string }> = ({ name, price }) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
    <span className="text-sm font-bold text-[#2f3e46]">{name}</span>
    <span className="text-sm font-mono font-bold text-[#ff9f1c]">{price}</span>
  </div>
);

