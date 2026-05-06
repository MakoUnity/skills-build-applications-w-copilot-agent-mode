import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${getApiBaseUrl()}/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setUsers(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div>
      <div className="octofit-page-header">
        <h2>👤 Users</h2>
      </div>

      <div className="card octofit-card">
        <div className="card-header">Registered Users</div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : users.length === 0 ? (
            <p className="text-muted text-center py-4">No users found.</p>
          ) : (
            <table className="table table-hover table-striped octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{idx + 1}</td>
                    <td><strong>{user.username || '—'}</strong></td>
                    <td>{user.email || '—'}</td>
                    <td>
                      {user.team
                        ? <span className="badge bg-success">{user.team}</span>
                        : <span className="text-muted">No team</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="card-footer text-muted">
          Total: <strong>{users.length}</strong> user(s)
        </div>
      </div>
    </div>
  );
};

export default Users;
