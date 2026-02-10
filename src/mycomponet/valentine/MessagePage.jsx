import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default function MessagePage() {
  const [searchParams] = useSearchParams();
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  
  let yourName = '';
  let loveLetter = '';
  
  const encrypted = searchParams.get('d');
  if (encrypted) {
    try {
      const decoded = JSON.parse(atob(encrypted));
      yourName = decoded.y || '';
      loveLetter = decoded.l || '';
    } catch (e) {
      console.error('Decryption failed:', e);
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setMusicPlaying(true);
      }).catch((error) => {
        console.log('Music play failed:', error);
      });
    }
  }, []);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  if (!yourName && !loveLetter) {
    return (
      <div className="main-bg d-flex justify-content-center align-items-center vh-100">
        <div className="text-white text-center">
          <h2>Invalid link</h2>
          <p>Debug: y={yourName}, l={loveLetter}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-bg d-flex justify-content-center align-items-center vh-100 position-relative overflow-hidden">
      <div className="flowers-container">
        {Array.from({ length: 25 }).map((_, i) => {
          const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💐'];
          return (
            <div key={i} className="flower" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${5 + Math.random() * 5}s` }}>
              {flowers[i % flowers.length]}
            </div>
          );
        })}
      </div>

      <div className="big-heart">💖</div>

      <audio ref={audioRef} src="/music.mp3" loop autoPlay />

      {!musicPlaying && (
        <button 
          className="btn btn-danger position-fixed" 
          style={{ top: '20px', right: '20px', zIndex: 1000 }}
          onClick={playMusic}
        >
          🎵 Play Music
        </button>
      )}

      <div className="text-center text-white love-screen px-3">
        <div className="heart-symbol" style={{ fontSize: '180px' }}>💝</div>

        <h1 className="display-4 fw-bold fade-in">🎉 {yourName} Accepted Your Love! 🎉</h1>
        
        <h2 className="my-5">{yourName} ❤️</h2>
        
        <div className="bg-white text-dark p-4 rounded-4 shadow my-4 mx-auto" style={{ maxWidth: '600px' }}>
          <h4 className="text-gradient mb-3">💌 Message from {yourName} 💌</h4>
          <p className="fst-italic" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{loveLetter}</p>
        </div>
        
        <div className="love-quote fade-in-delay-2 mb-3">
          <p className="fs-6 fst-italic" style={{ maxWidth: '500px', margin: '0 auto', lineHeight: '1.8' }}>
            "💖 You are my today and all of my tomorrows. 💖"<br/>
            "❤️ In you, I've found the love of my life and my closest friend. ❤️"<br/>
            "💕 Every love story is beautiful, but ours is my favorite. 💕"
          </p>
        </div>

        <div className="hearts">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="heart">❤️</span>
          ))}
        </div>
      </div>
    </div>
  );
}
