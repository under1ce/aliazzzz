import React from "react";
import { Link } from "react-router-dom";

function Rules() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 py-8">
      <div 
        className="h-screen flex flex-col items-center bg-cover bg-center px-4 relative"
        style={{ backgroundImage: "url('Rules/background.svg')" }}
      >
        {/* Основной контент с правилами */}
        <div className="relative flex justify-center items-center w-full max-w-md mt-6">
          {/* Прокручиваемый блок с правилами */}
          <div className="relative z-10 flex flex-col items-start text-white px-4 py-8 max-w-[85%] text-left overflow-y-auto max-h-[50vh] text-sm">
            <h1 className="text-2xl font-bold text-center w-full mb-4">ПРАВИЛА ИГРЫ</h1>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <img src="Rules/icon1.svg" alt="Игроки" className="w-5 h-5" />
                <p>Игроки разбиваются на команды.</p>
              </div>
              <div className="flex items-start gap-2">
                <img src="Rules/icon2.svg" alt="Время" className="w-5 h-5" />
                <p>На ход команды выделяется 1 минута, в течение которой игрок объясняет слова.</p>
              </div>
              <div className="flex items-start gap-2">
                <img src="Rules/icon3.svg" alt="Запрет" className="w-5 h-5" />
                <p>Нельзя использовать однокоренные слова.</p>
              </div>
              <div className="flex items-start gap-2">
                <img src="Rules/icon4.svg" alt="Очки" className="w-5 h-5" />
                <p>За каждое угаданное слово команда получает баллы и продвигается по полю.</p>
              </div>
              <div className="flex items-start gap-2">
                <img src="Rules/icon5.svg" alt="Победа" className="w-5 h-5" />
                <p>Побеждает команда, первой набравшая нужное количество очков.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Кнопка "ПОНЯТНО" */}
        <div className="mt-auto mb-6 w-full flex justify-center">
          <Link to="/">
            <button className="bg-[#FFD686] text-[#292D32] py-2 px-8 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300">
              ПОНЯТНО
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Rules;
