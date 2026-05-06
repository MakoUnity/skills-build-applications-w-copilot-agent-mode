import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${getApiBaseUrl()}/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setActivities(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div>
      <div className="octofit-page-header">
        <h2>🏃 Activities</h2>
      </div>

      <div className="card octofit-card">
        <div className="card-header">All Activities</div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <p className="text-muted text-center py-4">No activities found.</p>
          ) : (
            <table className="table table-hover table-striped octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <td>{idx + 1}</td>
                    <td><span className="badge bg-primary">{activity.type || '—'}</span></td>
                    <td>{activity.duration ?? '—'}</td>
                    <td>{activity.user ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="card-footer text-muted">
          Total: <strong>{activities.length}</strong> record(s)
        </div>
      </div>
    </div>
  );
};

export default Activities;
