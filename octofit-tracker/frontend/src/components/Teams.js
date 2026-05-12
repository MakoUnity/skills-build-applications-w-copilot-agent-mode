import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = (() => {
    if (typeof window !== 'undefined') {
      const codespacesMatch = window.location.hostname.match(/^(.*)-3000\.app\.github\.dev$/);
      if (codespacesMatch) {
        return `https://${codespacesMatch[1]}-8000.app.github.dev/api/teams/`;
      }
    }
    return `${getApiBaseUrl()}/teams/`;
  })();

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setTeams(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div>
      <div className="octofit-page-header">
        <h2>👥 Teams</h2>
      </div>

      <div className="card octofit-card">
        <div className="card-header">All Teams</div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : teams.length === 0 ? (
            <p className="text-muted text-center py-4">No teams found.</p>
          ) : (
            <table className="table table-hover table-striped octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{idx + 1}</td>
                    <td><strong>{team.name || '—'}</strong></td>
                    <td><span className="text-muted">{team.id ?? '—'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="card-footer text-muted">
          Total: <strong>{teams.length}</strong> team(s)
        </div>
      </div>
    </div>
  );
};

export default Teams;
