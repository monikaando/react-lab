import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import type { User } from "../types/User";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  return (
    <section>
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
            <UserCard key={user.id} user={user} onSelect={setSelectedUser} />
          ))}
        </ul>
      )}
      {selectedUser && (
        <div>
          <h2>{selectedUser.name}</h2>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
          <p>Website: {selectedUser.website}</p>
        </div>
      )}
    </section>
  );
}
