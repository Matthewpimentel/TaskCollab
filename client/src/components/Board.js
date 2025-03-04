import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchBoards();
    socket.on("taskUpdated", (updatedBoard) => {
      setBoards((prev) =>
        prev.map((b) => (b._id === updatedBoard._id ? updatedBoard : b))
      );
    });
    return () => socket.off("taskUpdated");
  }, []);

  const fetchBoards = async () => {
    const res = await axios.get("http://localhost:5000/api/boards");
    setBoards(res.data);
  };

  const addBoard = async (e) => {
    e.preventDefault();
    if (!newBoardName) return;
    try {
      const res = await axios.post("http://localhost:5000/api/boards", {
        name: newBoardName,
      });
      setBoards([...boards, res.data]);
      setNewBoardName("");
    } catch (err) {
      console.error("Error adding board:", err);
    }
  };

  const handleBoardClick = (boardName) => {
    navigate(`/${boardName}`); // Navigate to /board-name
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Your Boards</h1>
      {/* Form to add a board */}
      <form onSubmit={addBoard} className="mb-6">
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter board name"
          className="border rounded px-2 py-1 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          Add Board
        </button>
      </form>

      {/* Display boards */}
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {boards.map((board) => (
          <div
            key={board._id}
            className="w-64 h-36 border-2 border-gray-300 rounded-lg p-4 flex flex-col bg-white shadow-md cursor-pointer"
            onClick={() => handleBoardClick(board.name)} // Click handler
          >
            <h2 className="text-lg font-semibold text-left mb-2">{board.name}</h2>
            <div className="flex-1">
              {board.tasks.map((task, idx) => (
                <div key={idx} className="text-sm mb-1">
                  {task.title} - {task.status}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;