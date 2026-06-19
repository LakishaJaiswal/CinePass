import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import RecommendationCard from './components/RecommendationCard';
import Checkout from './components/Checkout';

function App() {
  // -------------------------------------------------------------
  // 🔑 STATE CONFIGURATION LAYER
  // -------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState('home');
  const [movies, setMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  
  // Localized Booking Ledger Map
  const [bookingHistory, setBookingHistory] = useState([
    { id: 101, title: "Drishyam 2", screen_name: "Screen 2 (Dolby 7.1)", seats: ["G3", "G4"], amount: 360, status: "Confirmed", transaction_id: "pay_sample_77f8a1" },
    { id: 102, title: "Jawan", screen_name: "Screen 1 (IMAX)", seats: ["A6"], amount: 350, status: "Confirmed", transaction_id: "pay_sample_99a2b5" }
  ]);

  // Active Identity Profile & Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false); 
  const [authName, setAuthName] = useState('');    
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const seatLayout = [
    { row: 'A', type: 'Executive', price: 350 },
    { row: 'B', type: 'Executive', price: 350 },
    { row: 'C', type: 'Executive', price: 350 },
    { row: 'D', type: 'Premium', price: 250 },
    { row: 'E', type: 'Premium', price: 250 },
    { row: 'F', type: 'Premium', price: 250 },
    { row: 'G', type: 'Classic', price: 180 },
    { row: 'H', type: 'Classic', price: 180 },
    { row: 'J', type: 'Classic', price: 180 },
  ];

  const totalColumns = 12;

  // -------------------------------------------------------------
  // 🎬 PROD REGISTRY POOL: Maps explicit matching images
  // -------------------------------------------------------------
  const MOVIE_POOL = [
    { id: 1, title: "Jawan", genre: "Action • Thriller • Drama", image: "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg" },
    { id: 2, title: "Kalki 2898 AD", genre: "Sci-Fi • Epic • Action", image: "https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg" },
    { id: 3, title: "Drishyam 2", genre: "Mystery • Thriller • Crime", image: "https://media-cache.cinematerial.com/p/500x/qlgtumf5/drishyam-2-indian-movie-poster.jpg?v=1665826403" },
    { id: 4, title: "Stree 2", genre: "Comedy • Horror • Mystery", image: "https://tse2.mm.bing.net/th/id/OIP.Jbb8pMOB0RvJe0xpx4FvLQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 5, title: "Animal", genre: "Action • Crime • Drama", image: "https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg" },
    { id: 6, title: "Pathaan", genre: "Action • Spy • Thriller", image: "https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg" },
    { id: 7, title: "Fighter", genre: "Action • Thriller • Patriotic", image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/01/fighter-2024-movie-poster.jpg" },
    { id: 8, title: "Dunki", genre: "Drama • Comedy • Social", image: "https://uaetimes.ae/wp-content/uploads/2023/12/Dunki.jpeg" },
    { id: 9, title: "Leo", genre: "Action • Thriller • Crime", image: "https://images.indianexpress.com/2023/09/leo1-1.jpg" },
    { id: 10, title: "Salaar", genre: "Action • Crime • Thriller", image: "https://media-cache.cinematerial.com/p/500x/97r67qou/salaar-indian-movie-poster.jpg?v=1698004556" },
    { id: 11, title: "Brahmastra", genre: "Fantasy • Adventure • Action", image: "https://static0.srcdn.com/wordpress/wp-content/uploads/2024/08/brahmastra.jpg?q=49&fit=contain&w=480&dpr=2" },
    { id: 12, title: "Kantara", genre: "Action • Thriller • Divine", image: "https://stat4.bollywoodhungama.in/wp-content/uploads/2025/07/Kantara-A-Legend-Chapter-1.jpg" }
  ];

  // -------------------------------------------------------------
  // ⚙️ SYNCHRONIZER ENGINE: Populates grid and recommendations
  // -------------------------------------------------------------
  useEffect(() => {
    setMovies(MOVIE_POOL);
    setRecommendations(MOVIE_POOL.slice(4, 7));
  }, []);

  const resetBookingWorkflowState = () => {
    setSelectedMovie(null);
    setSelectedScreen(null);
    setSelectedSeats([]);
    setActiveBooking(null);
    setConfirmedBooking(null);
  };

  const handleTabNavigation = (targetTab) => {
    if (targetTab === 'history' && !isLoggedIn) {
      setIsSignup(false);
      setShowAuthModal(true);
      return;
    }
    resetBookingWorkflowState();
    setCurrentTab(targetTab);
  };

  const handleSelectMovie = (movie) => {
    if (!isLoggedIn) {
      setIsSignup(false);
      setShowAuthModal(true);
      return;
    }
    setSelectedMovie(movie);
    setSelectedSeats([]);
    setActiveBooking(null);

    setScreens([
      { id: 1, name: "Screen 1 (IMAX)", time: "12:00 PM" },
      { id: 2, name: "Screen 2 (Dolby 7.1)", time: "3:30 PM" },
      { id: 3, name: "Screen 3 (Gold Class)", time: "7:00 PM" }
    ]);
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]);
  };

  const calculateTotalAmount = () => {
    return selectedSeats.reduce((total, seatId) => {
      const rowLetter = seatId.charAt(0);
      const rowConfig = seatLayout.find(cfg => cfg.row === rowLetter);
      return total + (rowConfig ? rowConfig.price : 0);
    }, 0);
  };

  const handleProceedToCheckout = () => {
    if (!selectedScreen) return alert("Please select a screen slot first!");
    if (selectedSeats.length === 0) return alert("Please select at least one seat!");

    setActiveBooking({
      userId: 1,
      showId: 1,
      seatNumbers: selectedSeats,
      amount: calculateTotalAmount()
    });
  };

  // 🔑 MOCK AUTH SERVICE
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) return alert("Please fill in all fields.");
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setAuthPassword('');
    setAuthName('');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    resetBookingWorkflowState();
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-gray-100 font-sans antialiased relative">
      
      {/* 🧭 Classic Navigation Bar */}
      <nav className="bg-[#161920] border-b border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleTabNavigation('home')}>
          <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">CINEPASS</span>
          <span className="bg-rose-500/10 text-rose-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-rose-500/20">PRO</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 bg-[#0F1115] p-1 rounded-xl border border-gray-800/60">
            {['home', 'movies', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabNavigation(tab)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition capitalize ${currentTab === tab && !selectedMovie && !confirmedBooking ? 'bg-rose-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                {tab === 'history' ? 'Booking History' : tab}
              </button>
            ))}
          </div>

          <button 
            onClick={isLoggedIn ? handleSignOut : () => { setIsSignup(false); setShowAuthModal(true); }}
            className={`text-xs font-black px-4 py-2 rounded-xl transition border ${isLoggedIn ? 'bg-gray-800/40 border-gray-700 text-gray-400 hover:text-rose-400' : 'bg-rose-600 border-rose-500 text-white hover:bg-rose-500'}`}
          >
            {isLoggedIn ? 'Sign Out' : 'Login'}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        
        {currentTab === 'history' ? (
          /* 📜 BOOKING HISTORY VIEW */
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-white tracking-tight sm:text-3xl">Your Booking History</h2>
            <div className="grid gap-4">
              {bookingHistory.map((history, idx) => (
                <div key={history.id || idx} className="bg-[#161920] rounded-2xl p-6 border border-gray-800 flex justify-between items-center shadow-lg animate-fadeIn">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {history.status}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{history.title}</h3>
                    <p className="text-xs text-gray-400">{history.screen_name} • <span className="font-mono text-rose-400 font-semibold">{history.seats.join(', ')}</span></p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xl font-black text-white">₹{history.amount}.00</p>
                    <p className="text-[10px] font-medium text-gray-500 font-mono">ID: #{history.id}</p>
                    <p className="text-[9px] text-gray-600 font-mono truncate max-w-[150px]">txn ID: {history.transaction_id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : confirmedBooking ? (
          /* 🎟️ CINEMATIC DIGITAL TICKET STUB VIEW */
          <div className="max-w-md mx-auto bg-[#161920] rounded-3xl border border-gray-800 text-center overflow-hidden shadow-2xl animate-fadeIn relative">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-6 text-white space-y-1">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
              <h2 className="text-xl font-black tracking-tight">Payment Verified Successfully</h2>
              <p className="text-[11px] opacity-80 font-mono">Transaction ID: {confirmedBooking.transactionId}</p>
            </div>

            <div className="p-6 space-y-6 text-left">
              <div className="border-b border-gray-800 pb-4 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400">Admission Ticket</span>
                <h3 className="text-2xl font-black text-white tracking-tight">{selectedMovie?.title}</h3>
                <p className="text-xs text-gray-400">{selectedMovie?.genre}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs border-b border-gray-800 pb-4">
                <div>
                  <p className="text-gray-500 font-sans font-bold uppercase text-[10px]">Auditorium</p>
                  <p className="text-gray-200 font-bold mt-0.5">{selectedScreen?.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-sans font-bold uppercase text-[10px]">Showtime</p>
                  <p className="text-gray-200 font-bold mt-0.5">{selectedScreen?.time}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-sans font-bold uppercase text-[10px]">Allocated Seats</p>
                  <p className="text-rose-400 font-black text-sm mt-0.5">{confirmedBooking.seats.join(', ')}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-sans font-bold uppercase text-[10px]">Total Paid</p>
                  <p className="text-white font-black text-sm mt-0.5">₹{confirmedBooking.amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentTab('history');
                    setConfirmedBooking(null);
                    setSelectedMovie(null);
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wide transition text-center"
                >
                  📄 View History Tab
                </button>
                <button
                  onClick={resetBookingWorkflowState}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wide transition text-center"
                >
                  🏠 Go Back Home
                </button>
              </div>
            </div>
          </div>
        ) : activeBooking ? (
          /* 💳 SKIP CHECKOUT SELECTION INTERSTITIALS */
          <Checkout
            bookingData={activeBooking}
            onPaymentSuccess={(details) => {
              const generatedReceipt = {
                id: Math.floor(100 + Math.random() * 900),
                title: selectedMovie.title,
                screen_name: selectedScreen.name,
                seats: details.seats || selectedSeats,
                amount: details.amount || activeBooking.amount,
                status: "Confirmed",
                transactionId: details.transactionId || 'pay_' + Math.random().toString(36).substring(2, 9)
              };

              setBookingHistory(prev => [generatedReceipt, ...prev]);
              setConfirmedBooking(generatedReceipt);
            }}
            onCancel={() => setActiveBooking(null)}
          />
        ) : selectedMovie ? (
          /* 🎬 SEAT MAP SELECTION HOOK */
          <div className="bg-[#161920] rounded-3xl p-8 max-w-4xl mx-auto border border-gray-800 shadow-2xl space-y-8">
            <div className="flex justify-between items-center border-b border-gray-800 pb-5">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">{selectedMovie.title}</h2>
                <p className="text-xs text-gray-400 mt-1">{selectedMovie.genre}</p>
              </div>
              <button onClick={resetBookingWorkflowState} className="text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 px-4 py-2 rounded-xl border border-gray-700">
                Go Back
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs uppercase font-bold tracking-wider text-gray-400">Select Theatre Screen Room:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {screens.map(scr => (
                  <button key={scr.id} onClick={() => setSelectedScreen(scr)} className={`p-4 rounded-xl text-left border transition-all ${selectedScreen?.id === scr.id ? 'bg-rose-600/10 border-rose-500 text-white shadow-md' : 'bg-[#1C202A] border-gray-800 text-gray-300 hover:border-gray-700'}`}>
                    <p className="text-xs font-bold">{scr.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">{scr.time}</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedScreen && (
              <div className="space-y-8 pt-4 overflow-x-auto">
                <div className="space-y-3 text-center min-w-[600px]">
                  <div className="w-4/5 h-[4px] bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full mx-auto shadow-[0_0_15px_rgba(244,63,94,0.6)]"></div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">All Eyes This Way Screen ({selectedScreen.name})</p>
                </div>

                <div className="space-y-3 pt-6 min-w-[600px] px-4">
                  {seatLayout.map((rowConfig) => (
                    <div key={rowConfig.row} className="flex items-center gap-4">
                      <span className="w-5 text-sm font-bold text-gray-600 font-mono">{rowConfig.row}</span>
                      <div className="flex-grow flex justify-between gap-2">
                        {Array.from({ length: totalColumns }, (_, i) => {
                          const colNum = i + 1;
                          const seatId = `${rowConfig.row}${colNum}`;
                          const isSelected = selectedSeats.includes(seatId);

                          return (
                            <React.Fragment key={seatId}>
                              <button
                                onClick={() => toggleSeat(seatId)}
                                className={`h-8 w-8 text-[10px] font-bold rounded-lg transition-all border flex items-center justify-center ${isSelected ? 'bg-rose-600 text-white border-rose-500 shadow-md' : 'bg-[#1C202A] text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white'}`}
                              >
                                {colNum}
                              </button>
                              {colNum === 6 && <div className="w-8 flex-shrink-0" />}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-6 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Selected Summary ({selectedSeats.length} Seats)</p>
                    <p className="text-3xl font-black text-white tracking-tight">₹{calculateTotalAmount()}</p>
                  </div>
                  <button onClick={handleProceedToCheckout} className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 px-8 rounded-xl transition duration-200">
                    Confirm Seating Selections
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 🏠 CLASSIC HOMEPAGE WORKSPACE */
          <>
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white sm:text-3xl">Trending Releases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => handleSelectMovie(movie)} />
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white sm:text-3xl">Personalized Matches</h2>
                <span className="bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-md tracking-wider">AI Layer</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map(movie => (
                  <RecommendationCard key={movie.id} movie={movie} onClick={() => handleSelectMovie(movie)} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* 🔐 AUTH OVERLAY MODULE */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#161920] border border-gray-800 rounded-3xl w-full max-w-sm p-8 shadow-2xl space-y-5 relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white font-bold font-mono text-sm">✕</button>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black tracking-tight text-white">{isSignup ? 'Create Account' : 'Authentication Required'}</h2>
              <p className="text-xs text-gray-400">{isSignup ? 'Join Cinepass to lock your seats' : 'Sign in using your auth-service credentials'}</p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {isSignup && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Full Name</label>
                  <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Your Name" className="w-full bg-[#0F1115] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 transition" required />
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Email Address</label>
                <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="lakisha@domain.com" className="w-full bg-[#0F1115] border border-gray-800 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 transition" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Password</label>
                <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#0F1115] border border-gray-800 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 transition" required />
              </div>
              <button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 rounded-xl text-sm transition duration-150 mt-2">
                {isSignup ? 'Register New Account' : 'Sign In & Continue'}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-gray-800/60 text-xs">
              <span className="text-gray-400">{isSignup ? "Already have an account? " : "Don't have an account yet? "}</span>
              <button onClick={() => { setIsSignup(!isSignup); setAuthPassword(''); }} className="text-rose-400 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer">
                {isSignup ? 'Login here' : 'Sign up here'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
