import React from "react";
import { Link, useNavigate } from "react-router-dom";

function StartScreen() {
  const navigate = useNavigate();

  const handleNewGame = () => {
    localStorage.removeItem("teams"); // Очистить список команд и их очки
    localStorage.removeItem("currentTeamIndex"); // Сбросить текущий индекс команды
  
    // Создаем новый массив команд с фиксированными ID
    const newTeams = [
      { id: "team1", name: "ПИКМИ", score: 0, icon: "bear1.svg" },
      { id: "team2", name: "УБЕЖИЩА", score: 0, icon: "bear2.svg" },
    ];
  
    localStorage.setItem("teams", JSON.stringify(newTeams)); // Сохраняем в localStorage
    navigate("/teams"); // Перейти к экрану выбора команд
  };
  

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00]">
      {/* Логотип */}
      <div className="relative flex justify-center items-center mb-10">
        {/* Эллипс (фон) */}
        <img src="StartScreen/EllipseLogo.svg" alt="Ellipse Logo" className="w-[200px] h-[150px] object-contain" />
        {/* Логотип (поверх эллипса) */}
        <img src="StartScreen/logo.svg" alt="Alias Logo" className="absolute w-64" />
      </div>

      <div className="flex items-center gap-0">
        <img src="StartScreen/medved1.svg" alt="medved1" className="w-32" />
        <img src="StartScreen/medved2.svg" alt="medved2" className="w-32" />
        <img src="StartScreen/medved3.svg" alt="medved3" className="w-32" />
        <img src="StartScreen/Ellipse4.svg" alt="Ellipse4" className="w-[200px] h-[150px] object-contain" />
      </div>

      {/* Заголовок */}
      <h1 className="text-5xl font-bold text-white mb-4">СТАРТОВЫЙ ЭКРАН</h1>

      {/* Описание */}
      <p className="text-white text-lg text-center max-w-lg mb-6">
        Добро пожаловать в игру Alias! Отгадывайте слова, объясняйте их, и развивайтесь вместе с друзьями!
      </p>

      {/* Кнопки */}
      <div className="flex space-x-4">
        <Link to="/start">
          <button className="bg-[#FFD686] text-[#292D32] py-3 px-8 rounded-full font-semibold hover:bg-[#ffedc8] transition duration-300">
            Продолжить игру
          </button>
        </Link>

        <button
          onClick={handleNewGame}
          className="bg-[#C02900] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#8b1e00] transition duration-300"
        >
          Новая игра
        </button>

        <Link to="/rules">
          <button className="bg-[#FFD686] text-[#292D32] py-3 px-8 rounded-full font-semibold hover:bg-[#ffedc8] transition duration-300">
            Правила игры
          </button>
        </Link>
      </div>
    </div>
  );
}

export default StartScreen;
