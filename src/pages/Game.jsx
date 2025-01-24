import React, { useState, useEffect, useRef } from "react";
import { wordsString } from "../words";
import { useNavigate } from "react-router-dom";
import { getUpdatedTeams, getNextTeamIndex } from "../gameLogic";
import lastWordSound from "../sounds/last-word.mp3";
import skipWordSound from "../sounds/skip-word.mp3";

const Game = () => {
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);  // Restored to 60 seconds
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [word, setWord] = useState("");
  const [wordsHistory, setWordsHistory] = useState([]);
  const [isLastWord, setIsLastWord] = useState(false);
  const [swipedLastWord, setSwipedLastWord] = useState(false);
  const [wordHighlight, setWordHighlight] = useState("");

  const lastWordAudioRef = useRef(null);
  const skipWordAudioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(savedTeams);

    const savedIndex = parseInt(localStorage.getItem("currentTeamIndex"), 10) || 0;
    setCurrentTeamIndex(savedIndex);

    setScore(0);
    setRandomWord();
  }, []);

  useEffect(() => {
    if (isLastWord && !swipedLastWord) {
      lastWordAudioRef.current.play();
    }
  }, [isLastWord, swipedLastWord]);

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
      setWordHighlight("bg-green-200");
    } else {
      skipWordAudioRef.current.play(); // Play skip sound
      setWordsHistory(prevWords => [...prevWords, { word, isGuessed: false }]);
      setWordHighlight("bg-red-200");
    }

    setTimeout(() => {
      setWordHighlight("");
    }, 500);

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
      {/* Audio elements for sounds */}
      <audio ref={lastWordAudioRef} src={lastWordSound} />
      <audio ref={skipWordAudioRef} src={skipWordSound} />

      {/* Header with Current Team */}
      <div className="text-center mb-6">
        <p className="text-white text-xl font-semibold">
          Текущая команда: {teams[currentTeamIndex]?.name}
        </p>
      </div>

      {/* Word Container and Action Buttons */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md space-y-4">
        {/* Word Container */}
        <div 
          className={`w-64 h-64 flex items-center justify-center rounded-full shadow-lg text-[#292D32] text-3xl font-bold bg-white text-center px-4 transition-colors duration-300 ${wordHighlight}`}
        >
          {word}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => handleGuess(true)}
            className="w-full bg-[#A7D82A] text-[#ffffff] py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-green-400 transition duration-300"
            style={{ boxShadow: '2px 5px 0px rgba(0, 0, 0, 0.2)' }}
          >
            УГАДАНО
          </button>
          <button
            onClick={() => handleGuess(false)}
            className="flex items-center justify-center gap-2 text-white text-lg"
          >
            <img src="StartGame/back-icon.svg" alt="" className="w-6 h-6" />
            ПРОПУСТИТЬ
          </button>
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

      {/* Game Over Message */}
      {isGameOver && (
        <div className="flex flex-col items-center mt-4">
          {isLastWord && !swipedLastWord && (
            <p className="text-white text-2xl font-semibold mb-4">Последнее слово!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
