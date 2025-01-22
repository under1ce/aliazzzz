import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./pages/StartScreen";
import Rules from "./pages/Rules"; 
import StartGame from "./pages/StartGame";
import Teams from "./pages/Teams";
import Game from "./pages/Game";
import Results from "./pages/results"; 
import Winner from "./pages/Winner";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/start" element={<StartGame />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/game" element={<Game />} />
        <Route path="/res" element={<Results />} />
        <Route path="/winner" element={<Winner />} />
      </Routes>
    </Router>
  );
}

export default App;
