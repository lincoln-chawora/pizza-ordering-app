import { useSelector } from 'react-redux';
import { getUsername } from './userSlice.js';

export function Username() {
  const username = useSelector(getUsername);

  if (!username) return null;
  return (
    <div className="text-sm font-semibold block">{username}</div>
  );
}