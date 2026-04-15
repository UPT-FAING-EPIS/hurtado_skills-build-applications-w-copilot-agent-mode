import { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Leaderboard endpoint:', endpoint);
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Leaderboard fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        setLeaderboard(normalized);
      } catch (error) {
        console.error('Leaderboard fetch error:', error);
      }
    };

    fetchLeaderboard();
  }, [endpoint]);

  return (
    <section>
      <h2 className="mb-3">Leaderboard</h2>
      <ul className="list-group">
        {leaderboard.map((entry) => (
          <li className="list-group-item" key={entry.id ?? `${entry.user_email}-${entry.points}`}>
            {entry.user_email ?? 'Unknown user'}
            {entry.points !== undefined ? ` - ${entry.points} pts` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Leaderboard;
