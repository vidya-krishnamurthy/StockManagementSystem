import { useState, useEffect } from 'react';
import { FaTrash, FaUserPlus } from 'react-icons/fa';
import '../styles/EmployeeManagement.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', contact: '', shift: 'Day' });
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Error fetching employees:', err));
  }, []);


  const addActivity = (message) => {
    setActivityLog((prev) => [
      { id: prev.length + 1, message, timestamp: new Date().toLocaleString() },
      ...prev,
    ].slice(0, 5)); 
    
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.role || !newEmployee.contact) return;

    try {
      const res = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      const addedEmployee = await res.json();
      setEmployees([...employees, addedEmployee]);
      setNewEmployee({ name: '', role: '', contact: '', shift: 'Day' });
      addActivity(`Added employee: ${addedEmployee.name} (${addedEmployee.role})`);
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  // Handle deleting an employee
  const handleDeleteEmployee = async (id, name, role) => {
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
      });
      setEmployees(employees.filter(employee => employee._id !== id));
      addActivity(`Deleted employee: ${name} (${role})`);
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  return (
    <div className="employee-management">
      {/* Header Section */}
      <div className="employee-header">
        <h1>👥 Employee Management</h1>
      </div>

      {/* Form to Add New Employee */}
      <div className="employee-form">
        <h2>Add New Employee</h2>
        <form onSubmit={handleAddEmployee}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                placeholder="e.g., John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={newEmployee.role}
                onChange={handleInputChange}
                placeholder="e.g., Production Worker"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="email"
                id="contact"
                name="contact"
                value={newEmployee.contact}
                onChange={handleInputChange}
                placeholder="e.g., john@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="shift">Shift</label>
              <select
                id="shift"
                name="shift"
                value={newEmployee.shift}
                onChange={handleInputChange}
              >
                <option value="Day">Day</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>
          <button type="submit">
            <FaUserPlus /> Add Employee
          </button>
        </form>
      </div>

      {/* Employee List */}
      <div className="employee-list">
        {employees.length ? (
          employees.map((employee) => (
            <div key={employee._id} className="employee-card">
              <div className="card-content">
                <h3>{employee.name}</h3>
                <p>Role: {employee.role}</p>
                <p>Contact: {employee.contact}</p>
                <p>Shift: {employee.shift}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteEmployee(employee._id, employee.name, employee.role)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-employees">No employees found.</p>
        )}
      </div>

      {/* Recent Activity Log */}
      <div className="employee-activity">
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

export default EmployeeManagement;