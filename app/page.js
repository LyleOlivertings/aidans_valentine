"use client";

import { useState } from 'react';
import Head from 'next/head';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

export default function PrankValentine() {
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [noCount, setNoCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [width, height] = useWindowSize();

  const funnyReasons = [
    "Nice try!",
    "Not an option!",
    "The cat says no!",
    "Error 404: 'No' not found",
    "Still nope!",
    "Why you clicking this?",
    "Seriously?",
    "Accept your fate!",
  ];

  const handleNoClick = () => {
    setNoCount(prev => Math.min(prev + 1, funnyReasons.length - 1));
  };

  const handleTouchMove = (e) => {
    // Get touch position
    const touch = e.touches[0];
    setButtonPosition({
      x: touch.clientX - 50, // Offset for the button width
      y: touch.clientY - 25, // Offset for the button height
    });
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 relative">
      <Head>
        <title>Will You Be My Valentine? 😏</title>
      </Head>

      {answer === 'yes' && <Confetti width={width} height={height} recycle={false} />}

      <div className="text-center space-y-8 max-w-md w-full">
        {!answered ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 animate-pulse">
              🌹 Will You Be My Valentine? 🌹
            </h1>

            <div className="relative">
              <button
                onClick={() => {
                  setAnswered(true);
                  setAnswer('yes');
                }}
                className="bg-green-500 text-white text-xl px-8 py-4 rounded-full shadow-lg 
                  transform transition-all duration-200 active:scale-95 w-full"
              >
                Yes! 😍
              </button>
              
              <button
                onClick={handleNoClick}
                onTouchStart={handleNoClick}
                onTouchMove={handleTouchMove}  // Track touch move
                className={`bg-red-500 text-white text-xl px-8 py-4 rounded-full shadow-lg 
                  transform transition-all duration-200 absolute top-0 ${
                    noCount > 0 ? 'opacity-0' : 'opacity-100'
                  }`}
                style={{
                  left: `${buttonPosition.x}px`, // Move button dynamically
                  top: `${buttonPosition.y}px`, // Move button dynamically
                  pointerEvents: noCount > 0 ? 'none' : 'auto',
                }}
              >
                {noCount === 0 ? 'No 😒' : funnyReasons[noCount]}
              </button>
            </div>
          </>
        ) : answer === 'yes' ? (
          <div className="animate-bounce">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <img 
                src="/meme.jpg"
                alt="Prank Reveal"
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <p className="text-2xl font-bold text-pink-600 mb-2">😜</p>
              <p className="text-gray-600">
              
              </p>
              <button
                onClick={() => {
                  setAnswered(false);
                  setAnswer(null);
                  setNoCount(0);
                }}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full"
              >
                Try Again 🔄
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-xl">You can't escape! 😈</p>
        )}
      </div>
    </div>
  );
}
