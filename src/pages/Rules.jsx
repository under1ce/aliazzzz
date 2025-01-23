import React from "react";
import { Link } from "react-router-dom";

function Rules() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8b1e00] via-[#800000] to-[#8b1e00] text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#ffffff]">ПРАВИЛА ИГРЫ</h1>

        <div className="space-y-6">
          {[
             { icon: "Rules/icon1.svg", text: "Игроки разбиваются на команды." },
             { icon: "Rules/icon2.svg", text: "На ход команды выделяется 1 минута, в течение которой игрок объясняет слова." },
             { icon: "Rules/icon3.svg", text: "Нельзя использовать однокоренные слова." },
             { icon: "Rules/icon4.svg", text: "За каждое угаданное слово команда получает баллы и продвигается по полю." },
             { icon: "Rules/icon5.svg", text: "Побеждает команда, первой набравшая нужное количество очков." }
          ].map((rule, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 p-4 bg-[#ffffff3a] rounded-xl shadow-lg hover:bg-[#ff0000] transition-colors"
            >
              <img src={rule.icon} alt={`Правило ${index + 1}`} className="w-6 h-6 mt-1 flex-shrink-0" />
              <p className="flex-1 text-base">{rule.text}</p>
            </div>
          ))}
        </div>

        <Link to="/" className="block mt-8">
          <button className="w-full bg-[#FFD686] text-[#292D32] py-3 px-8 rounded-full font-semibold text-lg" style={{ boxShadow: '2px 5px 0px rgba(0, 0, 0, 0.1)' }}> 
            
            ПОНЯТНО
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Rules;