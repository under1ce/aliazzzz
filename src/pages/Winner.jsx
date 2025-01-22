import React from "react";
import { useLocation } from "react-router-dom";

const Winner = ({ onPlayAgain, onExit }) => {
  const location = useLocation();
  
  // Получаем имя победителя из `location.state` или `localStorage`
  const winnerName = location.state?.winnerName || JSON.parse(localStorage.getItem("winner"))?.name;
  
  // Получаем список команд из `localStorage`
  const teams = JSON.parse(localStorage.getItem("teams")) || [];
  
  // Ищем победившую команду
  const winningTeam = teams.find(team => team.name === winnerName);
  
  // Определяем индекс команды (нужно для выбора bearX.svg)
  const teamIndex = winningTeam ? teams.indexOf(winningTeam) + 1 : 1; // +1, чтобы соответствовать номерам медведей

  // Определяем иконку медведя
  const bearIcon = `/Teams/bear${teamIndex}.svg`;

  const handlePlayAgain = () => {
    // Очищаем состояние игры
    localStorage.removeItem("teams");
    localStorage.removeItem("currentTeamIndex");
    localStorage.removeItem("winner"); // Очищаем победителя
    onPlayAgain?.();
  };

  const handleExit = () => {
    localStorage.removeItem("teams");
    localStorage.removeItem("currentTeamIndex");
    localStorage.removeItem("winner");
    onExit?.();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between bg-[#C02900] px-4 py-8">
      {/* Время вверху */}
      <div className="w-full flex justify-start pl-4 pt-2">
        <span className="text-white">9:41</span>
      </div>

      {/* Основной контент */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Заголовок победы */}
        <div className="text-center mb-4">
          <h1 className="text-white text-4xl font-bold mb-2">ПОБЕДА!!!</h1>
          <h2 className="text-white text-2xl">{winnerName}</h2>
        </div>

        {/* Медведь с трофеем */}
        <div className="relative w-48 h-48 my-8">
          <img src={bearIcon} alt="Winner Bear" className="w-full h-full" />
          {/* Эффекты */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-4 h-4 bg-white rotate-45" />
            <div className="absolute bottom-8 left-0 w-3 h-3 bg-yellow-300 rotate-12" />
            <div className="absolute top-12 right-4 w-3 h-3 bg-blue-400 rotate-45" />
            <div className="absolute bottom-4 right-8 w-2 h-2 bg-pink-300 rotate-12" />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col w-full max-w-xs gap-4">
          <button
            onClick={handlePlayAgain}
            className="w-full bg-[#FFD686] text-[#292D32] py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300"
          >
            ИГРАТЬ ЗАНОВО
          </button>

          <button
            onClick={handleExit}
            className="w-full bg-transparent border-2 border-white text-white py-3 px-6 rounded-full font-semibold hover:bg-white/10 transition duration-300"
          >
            ВЫЙТИ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Winner;
