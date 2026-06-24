import type { User } from "./types/User";

type UserCardProps = {
  user: User;
  onSelect: (user: User) => void;
};

export default function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <li onClick={() => onSelect(user)}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </li>
  );
}
