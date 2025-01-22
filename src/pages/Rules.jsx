import React from "react";
import { Link } from "react-router-dom";

function Rules() {
  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 relative">
      {/* Верхняя часть с логотипом и медведями */}
      <div className="relative w-full flex flex-col items-center mt-6">
        <img src="Rules/shapka.svg" alt="Alias Logo" className="items-center w-full max-w-md -mt-6" />   
      </div>

      {/* Основной контент с правилами */}
      <div className="relative flex justify-center items-center w-full max-w-md mt-6">
        {/* Фон эллипса */}
        <img
          src="Rules/Ellipse5.svg"
          alt="Ellipse Background"
          className="absolute w-full max-w-md h-auto"
        />
        
        {/* Текст */}
        <div className="relative z-10 flex flex-col items-start text-white px-6 py-12 max-w-[85%] text-left">
          <h1 className="text-3xl font-bold text-center w-full mb-6">ПРАВИЛА ИГРЫ</h1>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img src="Rules/icon1.svg" alt="Игроки" className="w-6 h-6" />
              <p className="text-lg">Игроки разбиваются на команды.</p>
            </div>
            <div className="flex items-start gap-3">
              <img src="Rules/icon2.svg" alt="Время" className="w-6 h-6" />
              <p className="text-lg">На ход команды выделяется одна минута, в течение этого времени выбранный игрок должен объяснить как можно больше слов с вытянутой карты.</p>
            </div>
            <div className="flex items-start gap-3">
              <img src="Rules/icon3.svg" alt="Запрет" className="w-6 h-6" />
              <p className="text-lg">Нельзя использовать однокоренные слова.</p>
            </div>
            <div className="flex items-start gap-3">
              <img src="Rules/icon4.svg" alt="Очки" className="w-6 h-6" />
              <p className="text-lg">За каждое угаданное слово команда получает баллы и продвигается по игровому полю.</p>
            </div>
            <div className="flex items-start gap-3">
              <img src="Rules/icon5.svg" alt="Победа" className="w-6 h-6" />
              <p className="text-lg">Победителем становится команда, первая набравшая нужное количество очков.</p>
            </div>
            <div className="mt-auto mb-8">
        <Link to="/">
          <button className="bg-[#FFD686] text-[#292D32] py-3 px-12 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300">
            ПОНЯТНО
          </button>
        </Link>
      </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Rules;
