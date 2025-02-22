import { useEffect, useState } from "react";
import db from "../database/db.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";

const TestHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
    const { user, setUser } = useAuth();
  

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await db.quizHistory.toArray() || [];
      const data = res.filter((item) => item.email === user.email);

      console.log({ data });
      setHistory(data);
    };
    fetchHistory();
  }, [user]); // Reload history when quiz completes

  return (
    <div className="scoreboard p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      <div className="overflow-y-auto max-h-96">
        {history.reverse().length === 0 ? (
          <p className="text-gray-500">No quiz attempts yet.</p>
        ) : (
          <ul className="list-disc">
            {history.map((item) => (
              <li
                key={item.id}
                className="mb-1 flex justify-between items-center p-2 shadow-md rounded-lg"
              >
                <div>
                  <span className="font-semibold">Score:</span> {item.score} -{" "}
                  <span className="text-gray-600">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <button
                  className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                  onClick={() => navigate(`/review/${item.id}`)}
                >
                  Review
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestHistory;
