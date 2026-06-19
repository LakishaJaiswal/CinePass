import React from 'react';

function Navbar({ currentTab, setTab }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'movies', label: 'Movies' },
    { id: 'recommendations', label: 'Recommendations' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#12141C]/80 backdrop-blur-md border-b border-gray-800/60 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Typography */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setTab('home')}>
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            CINE<span className="text-white">PASS</span>
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md">PRO</span>
        </div>

        {/* Tab Switch Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/10' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
