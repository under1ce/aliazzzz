import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundAnimation from "./BackgroundAnimation"; // Импортируем компонент с анимацией фона

const StartScreen = () => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    localStorage.removeItem("teams");
    localStorage.removeItem("currentTeamIndex");
    
    const newTeams = [
      { id: "team1", name: "ПИКМИ", score: 0, icon: "bear1.svg" },
      { id: "team2", name: "УБЕЖИЩА", score: 0, icon: "bear2.svg" },
    ];
    
    localStorage.setItem("teams", JSON.stringify(newTeams));
    navigate("/teams");
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative"> {/* Сделайте контейнер относительным для фона */}
      {/* Вставляем компонент с анимацией фона */}
      <BackgroundAnimation />

      {/* Основной контент */}
      <div className="flex-1 flex flex-col items-center justify-center z-10"> {/* Добавьте z-index для других элементов */}
      <img 
  src="StartScreen/logo.svg" 
  alt="Alias Logo" 
  className="w-[380px]"
/>

      </div>

      {/* Кнопки */}
      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto mb-12 z-10"> {/* Убедитесь, что кнопки на переднем плане */}
        <button
          onClick={handleNewGame}
          className="w-full bg-[#FFD686] text-[#292D32] py-3 px-8 rounded-full font-semibold text-lg" style={{ boxShadow: '2px 5px 0px rgba(0, 0, 0, 0.2)' }}
        >
          НАЧАТЬ ИГРАТЬ
        </button>
        
        <Link to="/rules" className="w-full">
        <button className="w-full bg-[#FFD686] text-[#292D32] py-3 px-8 rounded-full font-semibold text-lg" style={{ boxShadow: '2px 5px 0px rgba(0, 0, 0, 0.2)' }}>
  ПРАВИЛА
</button>
        </Link>
      </div>

      {/* Декорация с медведями */}
      <div className="relative w-full flex justify-between items-end px-4 z-10">
        <img 
          src="StartScreen/medved2.svg" 
          alt="" 
          className="w-[380px]"
        />
        <img 
          src="StartScreen/medved3.svg" 
          alt="" 
          className="w-[380px]"
        />
      </div>
    </div>
  );
};

export default StartScreen;