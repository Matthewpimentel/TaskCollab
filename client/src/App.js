import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import BoardDetail from "./components/BoardDetail"; // We'll create this next

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-3xl font-bold text-center p-4">CollaboTask</h1>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/:boardName" element={<BoardDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;