import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns'; // For date handling in Chart.js
import { FaTrash, FaDownload, FaInfoCircle, FaSearch } from 'react-icons/fa';
import '../styles/DhotiProduction.css';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

const DhotiProduction = () => {
  // State for records
  const [records, setRecords] = useState([
    { id: 1, date: '2025-05-01', units: 100 },
    { id: 2, date: '2025-05-02', units: 90 },
    { id: 3, date: '2025-05-03', units: 120 },
    { id: 4, date: '2025-05-04', units: 150 },
    { id: 5, date: '2025-05-05', units: 100 },
    { id: 6, date: '2025-05-06', units: 130 },
    { id: 7, date: '2025-05-07', units: 120 },
    { id: 8, date: '2025-05-08', units: 145 },
    { id: 9, date: '2025-05-09', units: 135 },
    { id: 10, date: '2025-05-10', units: 115 },
    { id: 11, date: '2025-05-11', units: 95 },
    { id: 12, date: '2025-05-12', units: 110 },
    { id: 13, date: '2025-05-13', units: 105 },
  ]);

  // State for form, sorting, filtering, and activity log
  const [newRecord, setNewRecord] = useState({ date: '', units: '' });
  const [sortOrder, setSortOrder] = useState('desc');
  const [unitFilter, setUnitFilter] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const [activityLog, setActivityLog] = useState([]);

  // Calculate statistics
  const totalUnits = records.reduce((sum, record) => sum + record.units, 0);
  const averageUnits = records.length ? (totalUnits / records.length).toFixed(2) : 0;
  const highestProduction = records.length
    ? records.reduce((max, record) => (record.units > max.units ? record : max), records[0])
    : null;

  // Add activity to log
  const addActivity = (message) => {
    setActivityLog((prev) => [
      { id: prev.length + 1, message, timestamp: new Date().toLocaleString() },
      ...prev,
    ].slice(0, 5)); // Keep only the last 5 activities
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new record
  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!newRecord.date || !newRecord.units) return;
    const newId = records.length ? records[records.length - 1].id + 1 : 1;
    const newEntry = {
      id: newId,
      date: newRecord.date,
      units: parseInt(newRecord.units),
    };
    setRecords([...records, newEntry]);
    setNewRecord({ date: '', units: '' });
    addActivity(`Added record: ${newEntry.units} units on ${newEntry.date}`);
  };

  // Handle deleting a record
  const handleDeleteRecord = (id, date, units) => {
    setRecords(records.filter((record) => record.id !== id));
    addActivity(`Deleted record: ${units} units on ${date}`);
  };

  // Handle sorting by date
  const handleSort = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newOrder);
    setRecords((prev) =>
      [...prev].sort((a, b) =>
        newOrder === 'desc'
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      )
    );
  };

  // Filter records based on units and date
  const filteredRecords = records
    .filter((record) => (unitFilter ? record.units >= parseInt(unitFilter) : true))
    .filter((record) => (dateSearch ? record.date.includes(dateSearch) : true));

  // Export records as CSV
  const exportToCSV = () => {
    const headers = 'ID,Date,Units Produced\n';
    const rows = filteredRecords
      .map((record) => `${record.id},${record.date},${record.units}`)
      .join('\n');
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dhoti-production-records.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    addActivity('Exported production records to CSV');
  };

  // Chart data for production trend
  const chartData = {
    labels: records.map((record) => new Date(record.date)), // Parse dates as Date objects
    datasets: [
      {
        label: 'Units Produced',
        data: records.map((record) => record.units),
        borderColor: '#2980b9',
        backgroundColor: 'rgba(41, 128, 185, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          parser: 'yyyy-MM-dd', // Explicitly define the date format
          displayFormats: {
            day: 'MMM dd, yyyy', // Format for display on the axis
          },
          tooltipFormat: 'MMM dd, yyyy', // Format for tooltips
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          source: 'auto',
          autoSkip: true,
          maxTicksLimit: 10, // Limit the number of ticks to avoid clutter
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Units Produced',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          stepSize: 20, // Adjust step size for better readability
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    maintainAspectRatio: false, // Allow the chart to be responsive
  };

  return (
    <div className="dhoti-production">
      {/* Header Section */}
      <div className="dhoti-header">
        <h1>🧶 Dhoti Production Dashboard</h1>
        <div className="dhoti-summary">
          <p>Total Units: <strong>{totalUnits}</strong></p>
          <p>Average Units/Day: <strong>{averageUnits}</strong></p>
          {highestProduction && (
            <p>
              Highest Production: <strong>{highestProduction.units}</strong> on{' '}
              {highestProduction.date}
            </p>
          )}
        </div>
      </div>

      {/* Production Trend Chart */}
      <div className="dhoti-chart">
        <h2>Production Trend</h2>
        <div className="chart-container" style={{ height: '400px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Form to Add New Record */}
      <div className="dhoti-form">
        <h2>Add Production Record</h2>
        <form onSubmit={handleAddRecord}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newRecord.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="units">Units Produced</label>
              <input
                type="number"
                id="units"
                name="units"
                value={newRecord.units}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>
          <button type="submit">Add Record</button>
        </form>
      </div>

      {/* Sorting, Filtering, and Export Controls */}
      <div className="dhoti-controls">
        <div className="sort-control">
          <button onClick={handleSort}>
            Sort by Date ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
          </button>
        </div>
        <div className="filter-controls">
          <div className="filter-control">
            <label htmlFor="unitFilter">
              <FaInfoCircle className="info-icon" title="Filter by minimum units" />
              Min Units:
            </label>
            <input
              type="number"
              id="unitFilter"
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
              placeholder="e.g., 50"
              min="0"
            />
          </div>
          <div className="filter-control">
            <label htmlFor="dateSearch">
              <FaSearch className="info-icon" title="Search by date (YYYY-MM-DD)" />
              Search Date:
            </label>
            <input
              type="text"
              id="dateSearch"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
              placeholder="YYYY-MM-DD"
            />
          </div>
          <button className="export-button" onClick={exportToCSV}>
            <FaDownload /> Export to CSV
          </button>
        </div>
      </div>

      {/* Production Records List */}
      <div className="dhoti-list">
        {filteredRecords.length ? (
          filteredRecords.map((item) => (
            <div key={item.id} className="dhoti-card">
              <div className="card-content">
                <h3>Date: {item.date}</h3>
                <p>Units Produced: {item.units}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteRecord(item.id, item.date, item.units)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-records">No records match the filter criteria.</p>
        )}
      </div>

      {/* Recent Activity Log */}
      <div className="dhoti-activity">
        <h2>Recent Activity</h2>
        {activityLog.length ? (
          <ul>
            {activityLog.map((activity) => (
              <li key={activity.id}>
                <span>{activity.timestamp}</span>: {activity.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity.</p>
        )}
      </div>
    </div>
  );
};

export default DhotiProduction;