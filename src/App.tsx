import { useEffect, useState } from "react";
import CounterButton from "./CounterButton";
import "./App.css";

type User = {
  id: number;
  name: string;
};
function App() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().startsWith(normalizedSearch),
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  function handleCounters(operator: "-" | "+") {
    setCount((c) => (operator === "+" ? c + 1 : c - 1));
    setClicks((c) => c + 1);
  }
  function handleReset() {
    setClicks(0);
    setCount(0);
  }
  return (
    <main>
      <h1>Hello Monika</h1>
      <p>I am preparing for frontend interviews.</p>
      <p> Count: {count}</p>
      <CounterButton label="-" onClick={() => handleCounters("-")} />
      <span style={{ margin: "0 5px" }}></span>
      <CounterButton label="+" onClick={() => handleCounters("+")} />
      <p>You've clicked the buttons {clicks} times.</p>
      <CounterButton label="Reset" onClick={handleReset} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default App;
