import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default function ValentineApp() {
  const [showLove, setShowLove] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [yourName, setYourName] = useState("");
  const [loveLetter, setLoveLetter] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("+91");
  const [noPosition, setNoPosition] = useState({ top: "65%", left: "40%" });
  const [noText, setNoText] = useState("No 😢");
  const audioRef = useRef(null);

  const noMessages = [
    "Please? 🥺",
    "Are you sure? 😭",
    "Think again! 💔",
    "Don't break my heart 😥",
    "Give me a chance 🙏",
    "Pretty please? 🌹",
    "I'll be sad 😭",
    "Reconsider? 💖"
  ];

  // Music will play only when Yes is clicked

  const moveNoButton = (e) => {
    e.preventDefault();
    const randomTop = Math.floor(Math.random() * 80) + "%";
    const randomLeft = Math.floor(Math.random() * 80) + "%";
    setNoPosition({ top: randomTop, left: randomLeft });
    setNoText(noMessages[Math.floor(Math.random() * noMessages.length)]);
  };

  const handleYesClick = () => {
    // Play music when Yes is clicked
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Music play failed:', error);
      });
    }
    setShowForm(true);
  };

  const submitReason = () => {
    if (!yourName || !name || !partnerPhone || !loveLetter) {
      alert("Please fill all fields 💌");
      return;
    }

    const shareURL = `${window.location.origin}/message?n=${encodeURIComponent(name)}&y=${encodeURIComponent(yourName)}&l=${encodeURIComponent(loveLetter)}`;
    const message = `${shareURL}`;
    const whatsappURL = `https://wa.me/${partnerPhone.replace(/[^0-9]/g, '')}?text=${message}`;
    
    window.open(whatsappURL, '_blank');
    setShowLove(true);
  };

  return (
    <div className="main-bg d-flex justify-content-center align-items-center vh-100 position-relative overflow-hidden">
      {/* Falling Flowers - Different Types */}
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

      {/* Big Heart Symbol */}
      <div className="big-heart">💖</div>

      {/* Background Music */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Question Screen */}
      {!showLove && !showForm && (
        <div className="text-center transparent-box p-5 rounded-4 shadow position-relative" style={{ minHeight: '300px' }}>
          <div className="heart-symbol mb-4">💖</div>

          <h2 className="mb-5 text-white fw-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Do you love me? ❤️</h2>

          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-success px-5 py-2" onClick={handleYesClick}>
              Yes 💖
            </button>

            <button
              className="btn btn-danger px-5 py-2 position-absolute"
              style={{ top: noPosition.top, left: noPosition.left, transition: 'all 0.3s ease', touchAction: 'none' }}
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => { e.preventDefault(); moveNoButton(e); }}
            >
              {noText}
            </button>
          </div>
        </div>
      )}

      {/* After Yes → Show Heart Symbols + Form */}
      {showForm && !showLove && (
        <div className="bg-white p-4 rounded-4 shadow text-center form-container mx-3" style={{ width: '420px', maxWidth: '95vw' }}>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <div className="heart-symbol" style={{ fontSize: '80px' }}>💕</div>
            <div className="heart-symbol" style={{ fontSize: '80px' }}>💗</div>
          </div>

          <h5 className="mb-4 text-gradient">Write Your Love Message 💌</h5>

          <input
            type="text"
            className="form-control mb-3 input-animated"
            placeholder="Your Name 💖"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-3 input-animated"
            placeholder="Partner Name 💖"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            className="form-control mb-3 input-animated"
            placeholder="Partner WhatsApp Number 📱"
            value={partnerPhone}
            onChange={(e) => {
              const value = e.target.value;
              if (value.startsWith('+91') || value === '+' || value === '') {
                setPartnerPhone(value || '+91');
              }
            }}
            onFocus={(e) => {
              if (e.target.value === '+91') {
                e.target.setSelectionRange(3, 3);
              }
            }}
          />

          <textarea
            className="form-control mb-3 input-animated"
            rows="5"
            placeholder="Write your love letter here... ❤️💕💖"
            value={loveLetter}
            onChange={(e) => setLoveLetter(e.target.value)}
          />

          <button className="btn btn-primary w-100 btn-animated" onClick={submitReason}>
            Send via WhatsApp 📱💖
          </button>
        </div>
      )}

      {/* Final Love Screen */}
      {showLove && (
        <div className="text-center text-white love-screen px-3">
          <div className="heart-symbol" style={{ fontSize: '180px' }}>💝</div>

          <h1 className="display-4 fw-bold fade-in">Thank You for Accepting My Love! 😍</h1>
          
          <h2 className="my-5">{yourName} ❤️ {name}</h2>
          
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
      )}
    </div>
  );
}
