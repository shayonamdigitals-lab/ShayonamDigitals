import React, { useState } from 'react';

export default function PixelHeroGraphic() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setMousePos({ x, y });
  };

  return (
    <div
      className="relative w-full aspect-[4/3] max-w-[480px] mx-auto select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered ? `perspective(800px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)` : 'none',
        transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A03C" />
            <stop offset="100%" stopColor="#F26A52" />
          </linearGradient>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C27A" />
            <stop offset="100%" stopColor="#F5A03C" />
          </linearGradient>
          
          <style>{`
            @keyframes assembleHeader {
              0% { transform: translateY(-30px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes assembleHeroBlock {
              0% { transform: scale(0.92); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes assembleCard1 {
              0% { transform: translateY(20px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes assembleCard2 {
              0% { transform: translateY(20px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes assembleCard3 {
              0% { transform: translateY(20px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes pixelDrift1 {
              0% { transform: translate(40px, -40px) rotate(45deg); opacity: 0; }
              60% { opacity: 0.9; }
              100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            }
            @keyframes pixelDrift2 {
              0% { transform: translate(60px, -20px) rotate(-30deg); opacity: 0; }
              60% { opacity: 0.9; }
              100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            }
            @keyframes pixelDrift3 {
              0% { transform: translate(30px, 40px) rotate(20deg); opacity: 0; }
              60% { opacity: 0.9; }
              100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            }

            .anim-header {
              animation: assembleHeader 700ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
            }
            .anim-hero {
              animation: assembleHeroBlock 800ms 200ms cubic-bezier(0.23, 1, 0.32, 1) both;
            }
            .anim-c1 {
              animation: assembleCard1 700ms 400ms cubic-bezier(0.23, 1, 0.32, 1) both;
            }
            .anim-c2 {
              animation: assembleCard2 700ms 500ms cubic-bezier(0.23, 1, 0.32, 1) both;
            }
            .anim-c3 {
              animation: assembleCard3 700ms 600ms cubic-bezier(0.23, 1, 0.32, 1) both;
            }
            .anim-px1 {
              animation: pixelDrift1 1000ms 100ms cubic-bezier(0.23, 1, 0.32, 1) both;
            }
            .anim-px2 {
              animation: pixelDrift2 1100ms 200ms cubic-bezier(0.23, 1, 0.32, 1) both;
            }
            .anim-px3 {
              animation: pixelDrift3 1200ms 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
            }

            @media (prefers-reduced-motion: reduce) {
              .anim-header, .anim-hero, .anim-c1, .anim-c2, .anim-c3, .anim-px1, .anim-px2, .anim-px3 {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
              }
            }
          `}</style>
        </defs>

        {/* Base Canvas Frame / Window */}
        <rect
          x="10"
          y="10"
          width="380"
          height="280"
          rx="14"
          fill="#FFFEFC"
          stroke="#EFE8DC"
          strokeWidth="2"
        />

        {/* Assembled Website Header Bar */}
        <g className="anim-header">
          <rect x="25" y="24" width="350" height="26" rx="6" fill="#F7F2EA" />
          <circle cx="40" cy="37" r="4" fill="#E8C27A" />
          <rect x="52" y="34" width="38" height="6" rx="3" fill="#3A2C22" opacity="0.6" />
          <rect x="260" y="34" width="22" height="6" rx="3" fill="#6B594D" opacity="0.4" />
          <rect x="290" y="34" width="22" height="6" rx="3" fill="#6B594D" opacity="0.4" />
          <rect x="320" y="31" width="44" height="12" rx="4" fill="url(#brand-grad)" />
        </g>

        {/* Assembled Hero Section Block */}
        <g className="anim-hero">
          <rect x="25" y="60" width="350" height="92" rx="8" fill="#F7F2EA" />
          <rect x="42" y="78" width="160" height="12" rx="4" fill="#3A2C22" opacity="0.85" />
          <rect x="42" y="96" width="130" height="7" rx="3.5" fill="#6B594D" opacity="0.5" />
          <rect x="42" y="108" width="110" height="7" rx="3.5" fill="#6B594D" opacity="0.4" />
          {/* Primary CTA Button in Wireframe */}
          <rect x="42" y="124" width="60" height="16" rx="5" fill="url(#brand-grad)" />
          
          {/* Abstract Hero Graphic Box */}
          <rect x="235" y="72" width="125" height="68" rx="6" fill="#EFE8DC" />
          <rect x="250" y="85" width="45" height="28" rx="4" fill="#E8C27A" opacity="0.7" />
          <rect x="302" y="85" width="45" height="42" rx="4" fill="url(#brand-grad)" opacity="0.8" />
        </g>

        {/* Assembled 3 Cards Grid */}
        <g className="anim-c1">
          <rect x="25" y="162" width="110" height="110" rx="8" fill="#F7F2EA" stroke="#EFE8DC" strokeWidth="1" />
          <rect x="38" y="176" width="24" height="24" rx="5" fill="#F5A03C" opacity="0.25" />
          <rect x="44" y="182" width="12" height="12" rx="2" fill="#F5A03C" />
          <rect x="38" y="210" width="70" height="8" rx="4" fill="#3A2C22" opacity="0.8" />
          <rect x="38" y="224" width="84" height="6" rx="3" fill="#6B594D" opacity="0.4" />
          <rect x="38" y="234" width="65" height="6" rx="3" fill="#6B594D" opacity="0.3" />
        </g>

        <g className="anim-c2">
          <rect x="145" y="162" width="110" height="110" rx="8" fill="#F7F2EA" stroke="#EFE8DC" strokeWidth="1" />
          <rect x="158" y="176" width="24" height="24" rx="5" fill="#F26A52" opacity="0.25" />
          <rect x="164" y="182" width="12" height="12" rx="2" fill="#F26A52" />
          <rect x="158" y="210" width="70" height="8" rx="4" fill="#3A2C22" opacity="0.8" />
          <rect x="158" y="224" width="84" height="6" rx="3" fill="#6B594D" opacity="0.4" />
          <rect x="158" y="234" width="65" height="6" rx="3" fill="#6B594D" opacity="0.3" />
        </g>

        <g className="anim-c3">
          <rect x="265" y="162" width="110" height="110" rx="8" fill="#F7F2EA" stroke="#EFE8DC" strokeWidth="1" />
          <rect x="278" y="176" width="24" height="24" rx="5" fill="#E8C27A" opacity="0.4" />
          <rect x="284" y="182" width="12" height="12" rx="2" fill="#E8C27A" />
          <rect x="278" y="210" width="70" height="8" rx="4" fill="#3A2C22" opacity="0.8" />
          <rect x="278" y="224" width="84" height="6" rx="3" fill="#6B594D" opacity="0.4" />
          <rect x="278" y="234" width="65" height="6" rx="3" fill="#6B594D" opacity="0.3" />
        </g>

        {/* Drifting Logo Pixel Squares */}
        <g className="anim-px1">
          <rect x="368" y="44" width="10" height="10" rx="2" fill="#F5A03C" />
          <rect x="382" y="58" width="7" height="7" rx="1.5" fill="#E8C27A" />
        </g>
        
        <g className="anim-px2">
          <rect x="372" y="112" width="8" height="8" rx="2" fill="#F26A52" />
          <rect x="384" y="126" width="6" height="6" rx="1.5" fill="#F5A03C" />
        </g>

        <g className="anim-px3">
          <rect x="248" y="48" width="9" height="9" rx="2" fill="#E8C27A" />
          <rect x="14" y="148" width="8" height="8" rx="2" fill="#F5A03C" />
        </g>
      </svg>
    </div>
  );
}
