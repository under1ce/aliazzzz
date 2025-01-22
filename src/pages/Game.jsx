import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { wordsString } from "../words";
import { useNavigate } from "react-router-dom";
import { getUpdatedTeams, getNextTeamIndex } from "../gameLogic";

function Game() {
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [word, setWord] = useState("");
  const [wordsHistory, setWordsHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLastWord, setIsLastWord] = useState(false);
  const [swipedLastWord, setSwipedLastWord] = useState(false);

  const x = useMotionValue(0);
  const backgroundColor = useTransform(x, [-150, 0, 150], ["#FF0000", "#FFFFFF", "#00FF00"]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(savedTeams);
  
    const savedIndex = parseInt(localStorage.getItem("currentTeamIndex"), 10) || 0;
    setCurrentTeamIndex(savedIndex);
  
    // ❌ Не загружаем `score` из команды – теперь оно всегда 0
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

  const handleDragEnd = (event, info) => {
    if (isAnimating || !word) return;
  
    const swipeThreshold = 120;
  
    if (info.offset.x > swipeThreshold) {
      // Увеличиваем локальный счет
      setScore(prevScore => prevScore + 1);
  
      // Обновляем счет команды сразу
      setTeams(prevTeams =>
        prevTeams.map((team, index) =>
          index === currentTeamIndex ? { ...team, score: team.score + 1 } : team
        )
      );
  
      setWordsHistory(prevWords => [...prevWords, { word, isGuessed: true }]);
      animateCard(200);
    } else if (info.offset.x < -swipeThreshold) {
      setWordsHistory(prevWords => [...prevWords, { word, isGuessed: false }]);
      animateCard(-200);
    } else {
      x.set(0);
    }
  
    if (isLastWord) {
      setSwipedLastWord(true);
    }
  };
  
  

  const animateCard = (endX) => {
    setIsAnimating(true);
    x.set(endX);

    setTimeout(() => {
      if (!isLastWord) {
        setRandomWord();
        x.set(0);
        setIsAnimating(false);
      }
    }, 300);
  };

  const navigateToResults = () => {
    const updatedTeams = getUpdatedTeams(teams, currentTeamIndex, score);
    const nextTeamIndex = getNextTeamIndex(currentTeamIndex, teams.length);
  
    // ✅ Сохраняем обновленные очки команд в localStorage
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
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 relative">
      <div className="relative flex flex-col items-center mt-6">
        <img src="Rules/shapka.svg" alt="Alias Logo" className="items-center w-full max-w-md -mt-6" />
      </div>

      <div className="absolute top-20 text-white text-xl font-semibold">
        <p>Текущая команда: {teams[currentTeamIndex]?.name}</p>
      </div>

      <div className="relative flex justify-center items-center w-full max-w-md mt-6">
        <motion.div
          className="w-64 h-64 flex items-center justify-center rounded-full shadow-lg text-[#292D32] text-3xl font-bold"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, backgroundColor }}
        >
          {word}
        </motion.div>
      </div>

      <div className="text-center mt-6">
        <p className="text-3xl">⏳ {secondsLeft}s</p>
        <p className="text-2xl font-semibold">Очки: {score}</p>
      </div>

      {isGameOver && (
        <div className="mt-6 flex flex-col items-center">
          {isLastWord && !swipedLastWord && <p className="text-2xl font-semibold mb-4">Последнее слово!</p>}
        </div>
      )}
    </div>
  );
}

export default Game;
