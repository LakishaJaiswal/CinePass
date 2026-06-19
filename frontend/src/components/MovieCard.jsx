import React from 'react';

function MovieCard({ movie, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-[#161920] rounded-2xl border border-gray-800/80 overflow-hidden hover:border-gray-700 transition duration-200 group shadow-lg h-full flex flex-col justify-between"
    >
      <div className="relative overflow-hidden cursor-pointer">
        <img 
          src={movie.image} 
          alt={movie.title} 
          referrerPolicy="no-referrer"
          className="w-full h-72 object-cover rounded-t-2xl group-hover:scale-105 transition duration-300" 
        />
        <div className="absolute top-3 right-3 bg-[#0F1115]/80 backdrop-blur-md border border-gray-800 px-2 py-1 rounded-lg flex items-center gap-1">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-white text-[11px] font-bold">{movie.rating || '8.5'}</span>
        </div>
      </div>
      <div className="p-4 space-y-1 bg-[#161920] flex-grow cursor-pointer">
        <h3 className="font-bold text-white tracking-tight text-base truncate group-hover:text-rose-400 transition">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400 truncate">{movie.genre}</p>
      </div>
    </div>
  );
}

export default MovieCard;
