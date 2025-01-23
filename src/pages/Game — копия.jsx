import React, { useState, useEffect } from "react";
import { wordsString } from "../words";
import { useNavigate } from "react-router-dom";
import { getUpdatedTeams, getNextTeamIndex } from "../gameLogic";

const Game = () => {
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [word, setWord] = useState("");
  const [wordsHistory, setWordsHistory] = useState([]);
  const [isLastWord, setIsLastWord] = useState(false);
  const [swipedLastWord, setSwipedLastWord] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(savedTeams);

    const savedIndex = parseInt(localStorage.getItem("currentTeamIndex"), 10) || 0;
    setCurrentTeamIndex(savedIndex);

    setScore(0);
    setRandomWord();
  }, []);

  const setRandomWord = () => {
    const words = wordsString.split(",");
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  };

  useEffect(() => {
    if (secondsLeft > 0 && !isGameOver) {
      const timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (secondsLeft === 0) {
      setIsGameOver(true);
      setIsLastWord(true);
    }
  }, [secondsLeft, isGameOver]);

  const handleGuess = (guessed) => {
    if (guessed) {
      setScore(prevScore => prevScore + 1);
      setTeams(prevTeams =>
        prevTeams.map((team, index) =>
          index === currentTeamIndex ? { ...team, score: team.score + 1 } : team
        )
      );
      setWordsHistory(prevWords => [...prevWords, { word, isGuessed: true }]);
    } else {
      setWordsHistory(prevWords => [...prevWords, { word, isGuessed: false }]);
    }

    if (!isLastWord) {
      setRandomWord();
    } else {
      setSwipedLastWord(true);
    }
  };

  const navigateToResults = () => {
    const updatedTeams = getUpdatedTeams(teams, currentTeamIndex, score);
    const nextTeamIndex = getNextTeamIndex(currentTeamIndex, teams.length);

    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    localStorage.setItem("currentTeamIndex", nextTeamIndex.toString());

    navigate("/res", {
      state: {
        teamName: teams[currentTeamIndex]?.name,
        wordsHistory,
        allScores: updatedTeams.map(team => ({ name: team.name, score: team.score || 0 })),
        nextTeamIndex,
      },
    });
  };

  useEffect(() => {
    if (swipedLastWord) {
      navigateToResults();
    }
  }, [swipedLastWord]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 py-8">
      {/* Header */}
      <div className="relative flex flex-col items-center mt-6">
        <img src="Rules/shapka.svg" alt="Alias Logo" className="w-full max-w-md -mt-6" />
        <p className="text-white text-xl font-semibold absolute top-20">
          Текущая команда: {teams[currentTeamIndex]?.name}
        </p>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative flex justify-center items-center w-full max-w-md">
        <div className="w-64 h-64 flex items-center justify-center rounded-full shadow-lg text-[#292D32] text-3xl font-bold bg-white">
          {word}
        </div>
      </div>

      {/* Timer and Score */}
      <div className="mt-6 text-center text-white">
        {!isGameOver && (
          <>
            <p className="text-3xl">⏳ {secondsLeft}s</p>
            <p className="text-2xl font-semibold">Очки: {score}</p>
          </>
        )}
      </div>

      {/* Game Over */}
      {isGameOver && (
  <div className="flex flex-col items-center mt-0"> {/* Для текста, пониже */}
    {isLastWord && !swipedLastWord && (
      <p className="text-white text-2xl font-semibold mb-4">Последнее слово!</p>
    )}
  </div>
)}

{/* Контейнер для кнопок, с уменьшенным отступом */}
<div className="mt-11 flex flex-col gap-4"> {/* Изменил mt-8 на mt-6 */}
  <button
    onClick={() => handleGuess(true)}
    className="w-full bg-[#A7D82A] text-[#ffffff] py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-green-400 transition duration-300"
    style={{ boxShadow: '2px 5px 0px rgba(0, 0, 0, 0.2)' }}
  >
    УГАДАНО
  </button>
  <button
    onClick={() => handleGuess(false)}
    className="flex items-center gap-0 justify-center">
    <img src="StartGame/back-icon.svg" alt="" className="w-6 h-6" />
    <span className="text-white text-lg">НАЗАД</span>
  </button>
</div>

    </div>
  );
};

export default Game;
