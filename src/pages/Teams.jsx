import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

const randomTeamNames = [
  "ПАЛИТРА",
  "БОССЫ KFC",
  "НАЙК ПРО",
  "МЕДВЕДИ",
  "СКУФЫ",
  "ВЕНОМЫ",
  "ВИКИНГИ",
];

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

  const getNextBearIndex = () => {
    const existingNumbers = teams
      .map(team => parseInt(team.icon.replace("bear", "").replace(".svg", "")))
      .filter(num => !isNaN(num));

    for (let i = 1; i <= 7; i++) {
      if (!existingNumbers.includes(i)) return i;
    }
    return 1;
  };

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

  const handleRemoveTeam = (id, index) => {
    if (index < 2) return;
    const updatedTeams = teams.filter(team => team.id !== id);
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const handleRenameTeam = (id, newName) => {
    const updatedTeams = teams.map(team =>
      team.id === id ? { ...team, name: newName } : team
    );
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 py-8">
      {/* Header with Teams title */}
      <div className="flex items-center gap-2 mb-6">
        <img src="Teams/komandy.svg" alt="" className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-white">КОМАНДЫ:</h1>
      </div>

      {/* Teams List */}
      <div className="flex-1">
        {teams.map((team, index) => (
          <div 
            key={team.id} 
            className={`flex items-center gap-3 p-3 rounded-lg mb-2 ${
              index === teams.length && teams.length < 7 ? 'bg-[#FFD686]' : 'bg-[#8B1E00]'
            }`}
          >
            <img 
              src={`Teams/${team.icon}`} 
              alt="" 
              className="w-8 h-8"
            />
            <input
              type="text"
              value={team.name}
              onChange={(e) => handleRenameTeam(team.id, e.target.value)}
              className={`text-lg bg-transparent border-none focus:outline-none w-full ${
                index === teams.length && teams.length < 7 ? 'text-[#292D32]' : 'text-white'
              }`}
            />
            {index >= 2 && (
              <button
                onClick={() => handleRemoveTeam(team.id, index)}
                className="text-red-500 ml-auto"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Add Team Button */}
        {teams.length < 7 && (
          <div 
            onClick={handleAddTeam}
            className="flex items-center gap-3 p-3 bg-[#FFD686] rounded-lg mb-2 cursor-pointer"
          >
            <img 
              src="Teams/bear3.svg" 
              alt="" 
              className="w-8 h-8"
            />
            <span className="text-lg text-[#292D32] font-medium">
              ДОБАВИТЬ
            </span>
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto flex flex-col gap-4">
        <Link to="/start" className="w-full">
          <button className="w-full bg-[#FFD686] text-[#292D32] py-3 px-8 rounded-full font-semibold text-lg">
            ПРОДОЛЖИТЬ
          </button>
        </Link>

        <Link to="/" className="flex items-center gap-2 justify-center">
          <img src="StartGame/back-icon.svg" alt="" className="w-6 h-6" />
          <span className="text-white text-lg">НАЗАД</span>
        </Link>
      </div>
    </div>
  );
}

export default Teams;