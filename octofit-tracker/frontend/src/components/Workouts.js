import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = (() => {
    if (typeof window !== 'undefined') {
      const codespacesMatch = window.location.hostname.match(/^(.*)-3000\.app\.github\.dev$/);
      if (codespacesMatch) {
        return `https://${codespacesMatch[1]}-8000.app.github.dev/api/workouts/`;
      }
    }
    return `${getApiBaseUrl()}/workouts/`;
  })();

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setWorkouts(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div>
      <div className="octofit-page-header">
        <h2>💪 Workouts</h2>
      </div>

      <div className="card octofit-card">
        <div className="card-header">Workout Plans</div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : workouts.length === 0 ? (
            <p className="text-muted text-center py-4">No workouts found.</p>
          ) : (
            <table className="table table-hover table-striped octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <td>{idx + 1}</td>
                    <td><strong>{workout.name || '—'}</strong></td>
                    <td className="text-muted">{workout.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="card-footer text-muted">
          Total: <strong>{workouts.length}</strong> workout(s)
        </div>
      </div>
    </div>
  );
};

export default Workouts;
