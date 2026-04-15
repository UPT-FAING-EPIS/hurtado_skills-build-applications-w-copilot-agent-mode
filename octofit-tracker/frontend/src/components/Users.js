import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Users endpoint:', endpoint);
        const response = await fetch(endpoint);
        const payload = await response.json();
        console.log('Users fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        setUsers(normalized);
      } catch (error) {
        console.error('Users fetch error:', error);
      }
    };

    fetchUsers();
  }, [endpoint]);

  return (
    <section>
      <h2 className="mb-3">Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user.id ?? user.email ?? user.username}>
            {user.username ?? user.name ?? 'Unknown user'}
            {user.email ? ` (${user.email})` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
