import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BoardDetail = () => {
  const { boardName } = useParams(); // Get the board name from the URL
  const [board, setBoard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/boards`);
        const foundBoard = res.data.find((b) => b.name === boardName);
        if (foundBoard) {
          setBoard(foundBoard);
        } else {
          navigate("/"); // Redirect to home if board not found
        }
      } catch (err) {
        console.error("Error fetching board:", err);
        navigate("/");
      }
    };
    fetchBoard();
  }, [boardName, navigate]);

  if (!board) return <div></div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{board.name}</h1>
      <div className="w-96 border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-2">Tasks</h2>
        {board.tasks.length > 0 ? (
          board.tasks.map((task, idx) => (
            <div key={idx} className="text-sm mb-1">
              {task.title} - {task.status}
            </div>
          ))
        ) : (
          <p>No tasks yet.</p>
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-gray-500 text-white px-4 py-1 rounded"
      >
        Back to Boards
      </button>
    </div>
  );
};

export default BoardDetail;