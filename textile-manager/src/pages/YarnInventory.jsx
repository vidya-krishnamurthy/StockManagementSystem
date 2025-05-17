import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/YarnInventory.css";

const YarnInventory = () => {
  const [formData, setFormData] = useState({
    yarnType: "",
    quantity: "",
    supplier: ""
  });
  const [yarns, setYarns] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { yarnType, quantity, supplier } = formData;

  // Fetch yarns on component mount
  useEffect(() => {
    fetchYarns();
  }, []);

  const fetchYarns = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/yarns");
      setYarns(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch yarns");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!yarnType || !quantity || !supplier) {
      setError("All fields are required.");
      return;
    }
  
    try {
      setIsLoading(true);
      
      if (editingId) {
        // Update existing yarn - ensure this matches your backend route
        await axios.put(`http://localhost:5000/api/yarns/${editingId}`, {
          yarnType,
          quantity: Number(quantity),
          supplier
        });
        setSuccess("Yarn updated successfully!");
      } else {
        // Add new yarn
        await axios.post("http://localhost:5000/api/yarns", {
          yarnType,
          quantity: Number(quantity),
          supplier
        });
        setSuccess("Yarn added successfully!");
      }
  
      resetForm();
      fetchYarns();
    } catch (err) {
      setError(err.response?.data?.message || 
        (editingId ? "Failed to update yarn" : "Failed to add yarn"));
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (yarn) => {
    setFormData({
      yarnType: yarn.yarnType,
      quantity: yarn.quantity,
      supplier: yarn.supplier
    });
    setEditingId(yarn._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this yarn?")) {
      return;
    }

    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:5000/api/yarns/${id}`);
      setSuccess("Yarn deleted successfully!");
      fetchYarns();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete yarn");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      yarnType: "",
      quantity: "",
      supplier: ""
    });
    setEditingId(null);
  };

  return (
    <div className="yarn-container">
      <h2>{editingId ? "Edit Yarn" : "Add Yarn"}</h2>
      <form onSubmit={handleSubmit} className="yarn-form">
        <input
          type="text"
          name="yarnType"
          placeholder="Yarn Type"
          value={yarnType}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (kg)"
          value={quantity}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          type="text"
          name="supplier"
          placeholder="Supplier Name"
          value={supplier}
          onChange={handleChange}
          required
        />
        <div className="form-actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : (editingId ? "Update Yarn" : "Add Yarn")}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} disabled={isLoading}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <h3>Yarn Inventory</h3>
      {isLoading && !yarns.length ? (
        <p>Loading yarns...</p>
      ) : (
        <table className="yarn-table">
          <thead>
            <tr>
              <th>Yarn Type</th>
              <th>Quantity (kg)</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {yarns.map((yarn) => (
              <tr key={yarn._id}>
                <td>{yarn.yarnType}</td>
                <td>{yarn.quantity}</td>
                <td>{yarn.supplier}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(yarn)}
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(yarn._id)}
                    disabled={isLoading}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default YarnInventory;