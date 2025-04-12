import React from 'react'
import Aitutor from '../assets/Aitutor.png'

function aiphoto() {
  return (
    <div>
      <a href="https://ai-tutor-bujji.vercel.app/" target="_blank" rel="noopener noreferrer">
        <img 
          src={Aitutor} 
          alt="Description" 
          style={{ 
            height: '8%', 
            maxWidth: '18%', 
            position: "fixed", 
            left: "92%", 
            top: "80%",  
            transform: "translateY(50%)", 
            animation: "float 3s ease-in-out infinite" 
          }} 
        />
      </a>
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

export default aiphoto
