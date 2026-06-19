import React from 'react';

function RecommendationCard({ movie, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-[#161920] to-[#12141A] rounded-2xl border border-gray-800/60 p-1 flex gap-4 hover:border-rose-500/30 transition duration-200 group shadow-xl cursor-pointer"
    >
      <div className="w-28 h-36 flex-shrink-0 overflow-hidden rounded-xl">
        <img 
          src={movie.image} 
          alt={movie.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
        />
      </div>
      <div className="flex flex-col justify-between py-3 pr-4 flex-grow min-w-0">
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md">
            PREFERENCE MATRIX
          </span>
          <h3 className="font-bold text-white text-base mt-1.5 truncate group-hover:text-rose-400 transition">
            {movie.title}
          </h3>
          <p className="text-xs text-gray-400 truncate">{movie.genre}</p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
            {movie.score || 'Match 95%'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;
