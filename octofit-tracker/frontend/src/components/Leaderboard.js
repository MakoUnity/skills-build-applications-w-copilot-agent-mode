import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../api';

const medalEmoji = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${getApiBaseUrl()}/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const sorted = (data.results || data).slice().sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
        setLeaders(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div>
      <div className="octofit-page-header">
        <h2>🏆 Leaderboard</h2>
      </div>

      <div className="card octofit-card">
        <div className="card-header">Rankings</div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : leaders.length === 0 ? (
            <p className="text-muted text-center py-4">No rankings yet.</p>
          ) : (
            <table className="table table-hover table-striped octofit-table mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx} className={idx < 3 ? 'table-warning' : ''}>
                    <td className="fw-bold">{medalEmoji(idx + 1)}</td>
                    <td>{leader.user ?? '—'}</td>
                    <td><span className="badge octofit-badge">{leader.points ?? 0}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="card-footer text-muted">
          Total participants: <strong>{leaders.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
