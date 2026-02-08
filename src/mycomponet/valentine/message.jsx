import { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default function Message({ name, yourName, loveLetter }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Music play failed:', error);
      });
    }
  }, []);

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

      <div className="text-center text-white love-screen px-3">
        <div className="heart-symbol" style={{ fontSize: '180px' }}>💝</div>

        <h1 className="display-4 fw-bold fade-in">🎉 {name} Accepted {yourName}'s Love! 🎉</h1>
        
        <h2 className="my-5">{yourName} ❤️ {name}</h2>
        
        <div className="bg-white text-dark p-4 rounded-4 shadow my-4 mx-auto" style={{ maxWidth: '600px' }}>
          <h4 className="text-gradient mb-3">💌 {loveLetter} 💌</h4>
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
