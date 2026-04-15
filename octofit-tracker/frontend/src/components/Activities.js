import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Activities endpoint:', endpoint);
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Activities fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        setActivities(normalized);
      } catch (error) {
        console.error('Activities fetch error:', error);
      }
    };

    fetchActivities();
  }, [endpoint]);

  return (
    <section>
      <h2 className="mb-3">Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity.id ?? `${activity.name}-${activity.user_email}`}>
            {activity.name ?? 'Unnamed activity'}
            {activity.user_email ? ` - ${activity.user_email}` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
