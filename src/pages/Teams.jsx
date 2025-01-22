import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

// Массив случайных имен команд
const randomTeamNames = [
  "ПАЛИТРА",
  "БОССЫ KFC",
  "НАЙК ПРО",
  "МЕДВЕДИ",
  "СКУФЫ",
  "ВЕНОМЫ",
  "ВИКИНГИ",
];

// Дефолтные команды с фиксированными ID
const defaultTeams = [
  { id: "team1", name: "ПИКМИ", icon: "bear1.svg" },
  { id: "team2", name: "СИМПЫ", icon: "bear2.svg" }
];

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams"));
    if (savedTeams && savedTeams.length > 0) {
      setTeams(savedTeams);
    } else {
      setTeams(defaultTeams);
      localStorage.setItem("teams", JSON.stringify(defaultTeams));
    }
  }, []);

  // Функция для получения первого свободного номера медведя
  const getNextBearIndex = () => {
    const existingNumbers = teams
      .map(team => parseInt(team.icon.replace("bear", "").replace(".svg", "")))
      .filter(num => !isNaN(num));

    for (let i = 1; i <= 7; i++) {
      if (!existingNumbers.includes(i)) return i;
    }
    return 1;
  };

  // Функция для добавления новой команды
  const handleAddTeam = () => {
    if (teams.length < 7) {
      let newTeamName;
      do {
        newTeamName = randomTeamNames[Math.floor(Math.random() * randomTeamNames.length)];
      } while (teams.some(team => team.name === newTeamName));

      const newTeam = {
        id: nanoid(),
        name: newTeamName,
        icon: `bear${getNextBearIndex()}.svg`,
        score: 0,
      };

      const updatedTeams = [...teams, newTeam];
      setTeams(updatedTeams);
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
    }
  };

  // Функция для удаления команды (запрещаем удаление первых двух)
  const handleRemoveTeam = (id, index) => {
    if (index < 2) return;
    const updatedTeams = teams.filter(team => team.id !== id);
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  // Функция для изменения названия команды
  const handleRenameTeam = (id, newName) => {
    const updatedTeams = teams.map(team =>
      team.id === id ? { ...team, name: newName } : team
    );
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 relative">
      <div className="relative w-full flex flex-col items-center mt-6">
        <img src="Rules/shapka.svg" alt="Alias Logo" className="items-center w-full max-w-md -mt-6" />
      </div>

      <div className="relative flex justify-center items-center w-full max-w-md mt-6">
        <img src="Rules/Ellipse5.svg" alt="Ellipse Background" className="absolute w-full max-w-md h-auto" />
        
        <div className="relative z-10 flex flex-col items-start text-white px-6 py-12 max-w-[85%] text-left">
          <h1 className="text-3xl font-bold text-center w-full mb-6">ВЫБОР КОМАНД</h1>

          <div className="space-y-4">
            {teams.map((team, index) => (
              <div key={team.id} className="flex items-center gap-3">
                <img src={`Teams/${team.icon}`} alt={team.name} className="w-6 h-6" />
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => handleRenameTeam(team.id, e.target.value)}
                  className="text-lg bg-transparent border-b border-white text-white focus:outline-none"
                />
                {index >= 2 && (
                  <button
                    onClick={() => handleRemoveTeam(team.id, index)}
                    className="text-red-500"
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddTeam}
              className="bg-[#FFD686] text-[#292D32] py-3 px-12 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300"
            >
              ДОБАВИТЬ
            </button>

            <Link to="/start">
              <button className="bg-[#FFD686] text-[#292D32] py-3 px-12 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300">
                НАЧАТЬ ИГРУ
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-0">
              <img src="StartGame/back-icon.svg" alt="Назад" className="w-6 h-6" />
              <p className="text-white text-lg">НАЗАД</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teams;
