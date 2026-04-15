import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Workouts fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        setWorkouts(normalized);
      } catch (error) {
        console.error('Workouts fetch error:', error);
      }
    };

    fetchWorkouts();
  }, [endpoint]);

  return (
    <section>
      <h2 className="mb-3">Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout.id ?? `${workout.name}-${workout.user_email}`}>
            {workout.name ?? 'Unnamed workout'}
            {workout.description ? ` - ${workout.description}` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
