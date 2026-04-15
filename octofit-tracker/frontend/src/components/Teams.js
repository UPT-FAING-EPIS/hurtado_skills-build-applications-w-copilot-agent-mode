import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Teams endpoint:', endpoint);
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Teams fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        setTeams(normalized);
      } catch (error) {
        console.error('Teams fetch error:', error);
      }
    };

    fetchTeams();
  }, [endpoint]);

  return (
    <section>
      <h2 className="mb-3">Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team.id ?? team.name}>
            {team.name ?? 'Unnamed team'}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
