import { useSelector } from 'react-redux';

export function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;
  return (
    <div className="text-sm font-semibold block">{username}</div>
  );
}