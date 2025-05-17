import { useState, useEffect } from "react";
import "../styles/suppliers.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { FiArrowLeft, FiPlus, FiTrash2, FiEdit2, FiSave, FiEye } from "react-icons/fi";
import { FaIndustry, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const supplierData = [ {
    id: 1,
    type: "Cotton",
    name: "Ravi Textiles",
    company: "Ravi Cotton Mills",
    ownerImage: "https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg?semt=ais_hybrid&w=740",
    phone: "9867543440",
    email: "hema@cottenweave.com",
    address: "123 Cotton Street, Erode, Tamil Nadu 638001",
    established: "2005",
    rating: 4.5,
    certifications: ["ISO 9001", "OEKO-TEX"],
    capacity: "5000 kg/month",
    paymentTerms: "30 days credit",
    leadTime: "2 weeks",
    reports: [
      { id: 1, date: "2025-04-01", weight: 150, quality: "A+", price: 320 },
      { id: 2, date: "2025-04-20", weight: 180, quality: "A", price: 310 },
      { id: 3, date: "2025-03-03", weight: 140, quality: "A+", price: 325 },
      { id: 4, date: "2025-03-27", weight: 160, quality: "A", price: 315 },
    ],
  },
  {
    id: 2,
    type: "Silk",
    name: "Silken Threads",
    company: "SilkWeave Pvt Ltd",
    ownerImage: "https://www.shutterstock.com/image-photo/smiling-confident-latin-hispanic-mature-260nw-2451982365.jpg",
    phone: "9867543210",
    email: "contact@silkweave.com",
    address: "45 Silk Road, Kanchipuram, Tamil Nadu 631501",
    established: "1998",
    rating: 4.8,
    certifications: ["ISO 9001", "GOTS"],
    capacity: "3000 kg/month",
    paymentTerms: "50% advance, 50% on delivery",
    leadTime: "3 weeks",
    reports: [
      { id: 1, date: "2025-04-02", weight: 120, quality: "Premium", price: 520 },
      { id: 2, date: "2025-04-21", weight: 135, quality: "Premium", price: 520 },
      { id: 3, date: "2025-03-04", weight: 125, quality: "Standard", price: 480 },
      { id: 4, date: "2025-03-25", weight: 145, quality: "Premium", price: 520 },
    ],
  },
  {
    id: 3,
    type: "Nylon",
    name: "NylonWorks",
    company: "Nylon World Ltd",
    ownerImage: "https://media.istockphoto.com/id/1363118407/photo/portrait-of-young-businessman.jpg?s=612x612&w=0&k=20&c=e9xjo1AdlIbr7ttZe3iBG3CBWKUBwdTMLkPus9DxA_s=",
    phone: "9845123456",
    email: "info@nylonworld.com",
    address: "88 Nylon Ave, Surat, Gujarat 395003",
    established: "2010",
    rating: 4.2,
    certifications: ["ISO 14001"],
    capacity: "8000 kg/month",
    paymentTerms: "100% advance",
    leadTime: "1 week",
    reports: [
      { id: 1, date: "2025-04-01", weight: 100, quality: "Industrial", price: 360 },
      { id: 2, date: "2025-04-18", weight: 110, quality: "Commercial", price: 380 },
      { id: 3, date: "2025-03-07", weight: 115, quality: "Industrial", price: 360 },
      { id: 4, date: "2025-03-29", weight: 120, quality: "Commercial", price: 380 },
    ],
  },
  {
    id: 4,
    type: "Polyester",
    name: "PolyTex",
    company: "Polyester India Ltd",
    ownerImage: "https://media.istockphoto.com/id/1256109557/photo/south-indian-handsome-man-stock-photo.jpg?s=612x612&w=0&k=20&c=eNguT4SNQI1-JhtQa_JnbPstLhHDKGA7tt1PI-qf2hM=",
    phone: "9823456789",
    email: "support@polytex.in",
    address: "59 Polyester Blvd, Mumbai, Maharashtra 400001",
    established: "2008",
    rating: 4.3,
    certifications: ["ISO 9001", "REACH"],
    capacity: "10000 kg/month",
    paymentTerms: "LC at sight",
    leadTime: "10 days",
    reports: [
      { id: 1, date: "2025-04-05", weight: 130, quality: "Recycled", price: 270 },
      { id: 2, date: "2025-04-25", weight: 140, quality: "Virgin", price: 290 },
      { id: 3, date: "2025-03-09", weight: 135, quality: "Recycled", price: 270 },
      { id: 4, date: "2025-03-23", weight: 145, quality: "Virgin", price: 290 },
    ],
  },
  {
    id: 5,
    type: "Wool",
    name: "Warm Woolens",
    company: "Woolen Co. Ltd",
    ownerImage: "https://media.istockphoto.com/id/1489669316/photo/attractive-young-businessman-using-a-digital-tablet-while-standing-in-front-of-office.jpg?s=612x612&w=0&k=20&c=yDjFD-qEogN-G7Ei7jmw8TpCJPdpzdqyznfG4eyJOq0=",
    phone: "9812345678",
    email: "contact@warmwoolens.com",
    address: "12 Winter Lane, Ludhiana, Punjab 141001",
    established: "1995",
    rating: 4.7,
    certifications: ["ISO 9001", "Woolmark"],
    capacity: "4000 kg/month",
    paymentTerms: "30% advance, 70% on delivery",
    leadTime: "4 weeks",
    reports: [
      { id: 1, date: "2025-04-06", weight: 160, quality: "Merino", price: 420 },
      { id: 2, date: "2025-04-24", weight: 170, quality: "Merino", price: 420 },
      { id: 3, date: "2025-03-10", weight: 155, quality: "Regular", price: 380 },
      { id: 4, date: "2025-03-22", weight: 165, quality: "Regular", price: 380 },
    ],
  },
  {
    id: 6,
    type: "Linen",
    name: "LinenLux",
    company: "Linen India Ltd",
    ownerImage: "https://in.images.search.yahoo.com/images/view;_ylt=Awr1TjIj.vlng7g1fGK9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzY3MjQwMGEwZDMzMzE5ZDQxYjVmMzRmNzRkZGZjYjNlBGdwb3MDOARpdANiaW5n?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dbusiness%2Bman%26type%3DE210IN714G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D8&w=474&h=316&imgurl=as2.ftcdn.net%2Fv2%2Fjpg%2F05%2F45%2F89%2F41%2F1000_F_545894172_fLINXPGJs19SgFvA3P6vTvXN59iScZJ0.jpg&rurl=https%3A%2F%2Fstock.adobe.com%2Fde%2Fimages%2Fsuccessful-mature-businessman-looking-at-camera-with-confidence%2F545894172&size=183KB&p=business+man&oid=672400a0d33319d41b5f34f74ddfcb3e&fr2=piv-web&fr=mcafee&tt=Successful+mature+businessman+looking+at+camera+with+confidence+Stock+...&b=0&ni=21&no=8&ts=&tab=organic&sigr=taERyv_G_WWv&sigb=wJSz0RRfxgIf&sigi=BslxPV9L8g1W&sigt=M6cuQctOwIsi&.crumb=uOJ7Nn8sjoK&fr=mcafee&fr2=piv-web&type=E210IN714G0",
    phone: "9834567890",
    email: "hello@linenlux.com",
    address: "23 Linen Street, Coimbatore, Tamil Nadu 641001",
    established: "2012",
    rating: 4.4,
    certifications: ["GOTS", "OEKO-TEX"],
    capacity: "3500 kg/month",
    paymentTerms: "50% advance, 50% COD",
    leadTime: "2 weeks",
    reports: [
      { id: 1, date: "2025-04-08", weight: 110, quality: "European", price: 450 },
      { id: 2, date: "2025-04-22", weight: 115, quality: "Domestic", price: 380 },
      { id: 3, date: "2025-03-12", weight: 105, quality: "European", price: 450 },
      { id: 4, date: "2025-03-26", weight: 120, quality: "Domestic", price: 380 },
    ],
  },
  {
    id: 7,
    type: "Bamboo",
    name: "EcoFiber",
    company: "Green Textiles Inc",
    ownerImage: "https://images.yourstory.com/cs/wordpress/2016/03/Yourstory-Sindhjuja-Rajamaran.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75",
    phone: "9856789012",
    email: "info@ecofiber.com",
    address: "45 Green Park, Bengaluru, Karnataka 560001",
    established: "2018",
    rating: 4.9,
    certifications: ["GOTS", "OCS", "FSC"],
    capacity: "2500 kg/month",
    paymentTerms: "100% advance",
    leadTime: "3 weeks",
    reports: [
      { id: 1, date: "2025-04-10", weight: 90, quality: "Organic", price: 520 },
      { id: 2, date: "2025-04-28", weight: 95, quality: "Organic", price: 520 },
      { id: 3, date: "2025-03-15", weight: 85, quality: "Regular", price: 480 },
      { id: 4, date: "2025-03-30", weight: 100, quality: "Regular", price: 480 },
    ],
  },
  {
    id: 8,
    type: "Hemp",
    name: "HempHorizons",
    company: "Sustainable Fibers Co",
    ownerImage: "https://pbs.twimg.com/media/GMQmqFcXgAAODn9.jpg:large",
    phone: "9878901234",
    email: "contact@hemphorizons.com",
    address: "78 Eco Road, Pune, Maharashtra 411001",
    established: "2015",
    rating: 4.6,
    certifications: ["GOTS", "OCS"],
    capacity: "2000 kg/month",
    paymentTerms: "50% advance, 50% on delivery",
    leadTime: "4 weeks",
    reports: [
      { id: 1, date: "2025-04-12", weight: 80, quality: "Industrial", price: 380 },
      { id: 2, date: "2025-04-30", weight: 85, quality: "Textile", price: 420 },
      { id: 3, date: "2025-03-18", weight: 75, quality: "Industrial", price: 380 },
      { id: 4, date: "2025-03-31", weight: 90, quality: "Textile", price: 420 },
    ],
  },
];


function formatReportsByMonth(reports) {
  const filtered = [];
  const seen = {};

  reports.forEach((report) => {
    const [year, month] = report.date.split("-").slice(0, 2);
    const key = `${year}-${month}`;
    if (!seen[key]) seen[key] = [];
    if (seen[key].length < 2) {
      seen[key].push(report);
      filtered.push(report);
    }
  });

  return filtered;
}

  

function SupplierDetails() {
  const [selected, setSelected] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [newReport, setNewReport] = useState({
    date: "",
    weight: "",
    quality: "A",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("details");
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const filteredSuppliers = supplierData.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || supplier.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleRazorpayPayment = () => {
    if (!newReport.date || !newReport.weight || !newReport.price) {
      alert("Please fill all fields");
      return;
    }

    const amount = parseFloat(newReport.weight) * parseFloat(newReport.price);
    
    const options = {
      key: 'rzp_test_cmLeqKg61pFBgh', // Your test key
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'Supplier Payment',
      description: `Payment for ${newReport.weight}kg of ${selected.type}`,
      handler: function(response) {
        setShowPaymentSuccess(true);
        setTimeout(() => setShowPaymentSuccess(false), 3000);
        
        // Add the report after successful payment
        if (editingId) {
          updateReport();
        } else {
          addReport();
        }
      },
      prefill: {
        name: selected.name,
        email: selected.email,
        contact: selected.phone,
      },
      theme: {
        color: '#4361ee', // Matching your primary color
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const addReport = () => {
    if (newReport.date && newReport.weight) {
      const [year, month] = newReport.date.split("-").slice(0, 2);
      const monthKey = `${year}-${month}`;
      const monthReports = selected.reports.filter((r) =>
        r.date.startsWith(monthKey)
      );

      if (monthReports.length >= 2) {
        alert("Only 2 reports allowed per month.");
        return;
      }

      const updated = [
        ...selected.reports,
        {
          id: selected.reports.length + 1,
          date: newReport.date,
          weight: parseFloat(newReport.weight),
          quality: newReport.quality,
          price: parseFloat(newReport.price),
        },
      ];
      selected.reports = updated;
      setNewReport({ date: "", weight: "", quality: "A", price: "" });
    }
  };

  const updateReport = () => {
    if (newReport.date && newReport.weight) {
      const updated = selected.reports.map((report) =>
        report.id === editingId
          ? {
              ...report,
              date: newReport.date,
              weight: parseFloat(newReport.weight),
              quality: newReport.quality,
              price: parseFloat(newReport.price),
            }
          : report
      );
      selected.reports = updated;
      setNewReport({ date: "", weight: "", quality: "A", price: "" });
      setEditingId(null);
    }
  };
  const deleteReport = (id) => {
    const updated = selected.reports.filter((report) => report.id !== id);
    selected.reports = updated;
  };

  const editReport = (report) => {
    setNewReport({
      date: report.date,
      weight: report.weight.toString(),
      quality: report.quality,
      price: report.price.toString(),
    });
    setEditingId(report.id);
  };

  const generateGraphData = (reports) => {
    return reports.map(({ date, weight }) => ({
      date,
      kg: weight,
    }));
  };

  const generateQualityData = (reports) => {
    const qualityCount = {};
    reports.forEach((report) => {
      qualityCount[report.quality] = (qualityCount[report.quality] || 0) + 1;
    });
    return Object.keys(qualityCount).map((quality) => ({
      name: quality,
      value: qualityCount[quality],
    }));
  };

  const calculateStats = (reports) => {
    if (reports.length === 0) return {};
    
    const totalWeight = reports.reduce((sum, report) => sum + report.weight, 0);
    const totalCost = reports.reduce((sum, report) => sum + (report.weight * report.price), 0);
    const avgPrice = totalCost / totalWeight;
    
    return {
      totalWeight,
      totalCost,
      avgPrice,
      lastDelivery: reports[reports.length - 1].date
    };
  };

  const stats = selected ? calculateStats(selected.reports) : {};

  useEffect(() => {
    if (selected) {
      document.title = `${selected.name} - Supplier Details`;
    } else {
      document.title = "Supplier Management";
    }
  }, [selected]);

return (
    <div className="supplier-container">
      {!selected ? (
        <div className="supplier-list">
          <h1 className="header">
            <FaIndustry /> Supplier Management
          </h1>
          
          <div className="filter-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="type-filter">
              <label>Filter by Type:</label> 
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                {[...new Set(supplierData.map(s => s.type))].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="supplier-grid">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="supplier-card"
              >
                <div className="supplier-image-container">
                  <div className="supplier-image">
                    <img 
                      src={supplier.ownerImage} 
                      alt="Owner" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x180?text=No+Image";
                      }}
                    />
                    <span className={`rating-badge rating-${Math.floor(supplier.rating)}`}>
                      {supplier.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="supplier-info">
                  <h3>{supplier.name}</h3>
                  <p className="company">{supplier.company}</p>
                  <div className="type-tag">{supplier.type}</div>
                  <div className="supplier-meta">
                    <span><FaPhone /> {supplier.phone}</span>
                    <span><FaMapMarkerAlt /> {supplier.address.split(",")[0]}</span>
                  </div>
                  <button 
                    className="view-button"
                    onClick={() => setSelected(supplier)}
                  >
                    <FiEye /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        // ... (keep your supplier list JSX unchanged)
      ) : (
        <div className="supplier-detail">
            <button className="back-button" onClick={() => setSelected(null)}>
            <FiArrowLeft /> Back to Suppliers
          </button>
          
          <div className="supplier-header">
            <div className="supplier-profile">
              <img 
                src={selected.ownerImage} 
                alt="Owner" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/100?text=No+Image";
                }}
              />
              <div>
                <h2>{selected.name}</h2>
                <p className="company">{selected.company}</p>
                <div className={`type-tag large ${selected.type.toLowerCase()}`}>
                  {selected.type}
                </div>
                <div className={`rating-stars rating-${Math.floor(selected.rating)}`}>
                  {"★".repeat(Math.floor(selected.rating))}
                  {"☆".repeat(5 - Math.floor(selected.rating))}
                  <span>({selected.rating.toFixed(1)})</span>
                </div>
              </div>
            </div>
            
            <div className="supplier-actions">
              <button onClick={() => setShowReport(!showReport)}>
                {showReport ? (
                  "Hide Reports"
                ) : (
                  <>
                    <FiPlus /> Add Report
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="tabs">
            <button
              className={activeTab === "details" ? "active" : ""}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => {
                setActiveTab("reports");
                setShowReport(true);
              }}
            >
              Reports
            </button>
            <button
              className={activeTab === "stats" ? "active" : ""}
              onClick={() => setActiveTab("stats")}
            >
              Statistics
            </button>
          </div>

          {activeTab === "details" && (
            <div className="details-section">
              <div className="detail-card">
                <h3>Contact Information</h3>
                <div className="detail-item">
                  <FaPhone />
                  <span>{selected.phone}</span>
                </div>
                <div className="detail-item">
                  <FaEnvelope />
                  <span>{selected.email}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>{selected.address}</span>
                </div>
              </div>

              <div className="detail-card">
                <h3>Business Information</h3>
                <div className="detail-item">
                  <span>Established:</span>
                  <span>{selected.established}</span>
                </div>
                <div className="detail-item">
                  <span>Capacity:</span>
                  <span>{selected.capacity}</span>
                </div>
                <div className="detail-item">
                  <span>Lead Time:</span>
                  <span>{selected.leadTime}</span>
                </div>
                <div className="detail-item">
                  <span>Payment Terms:</span>
                  <span>{selected.paymentTerms}</span>
                </div>
              </div>

              <div className="detail-card">
                <h3>Certifications</h3>
                <div className="certifications">
                  {selected.certifications.map((cert, index) => (
                    <span key={index} className="cert-badge">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && showReport && (
            <div className="report-section">
              <div className="report-form">
                <h3>{editingId ? "Edit Report" : "Add New Report"}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date:</label>
                    <input
                      type="date"
                      value={newReport.date}
                      onChange={(e) =>
                        setNewReport({ ...newReport, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Weight (kg):</label>
                    <input
                      type="number"
                      placeholder="kg"
                      value={newReport.weight}
                      onChange={(e) =>
                        setNewReport({ ...newReport, weight: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Quality:</label>
                    <select
                      value={newReport.quality}
                      onChange={(e) =>
                        setNewReport({ ...newReport, quality: e.target.value })
                      }
                    >
                      <option value="A+">A+ (Premium)</option>
                      <option value="A">A (Standard)</option>
                      <option value="B">B (Commercial)</option>
                      <option value="C">C (Industrial)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price (₹/kg):</label>
                    <input
                      type="number"
                      placeholder="₹"
                      value={newReport.price}
                      onChange={(e) =>
                        setNewReport({ ...newReport, price: e.target.value })
                      }
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Estimated Total:</label>
                    <div className="estimated-total">
                      ₹{newReport.weight && newReport.price ? 
                        (parseFloat(newReport.weight) * parseFloat(newReport.price)).toFixed(2) : 
                        '0.00'}
                    </div>
                  </div>
                </div>
                
                <div className="payment-actions">
                  <button
                    onClick={handleRazorpayPayment}
                    className="pay-button"
                  >
                    Pay with Razorpay
                  </button>
                  
                  <button
                    onClick={editingId ? updateReport : addReport}
                    className="save-button"
                    disabled={editingId}
                  >
                    <FiSave /> {editingId ? "Update" : "Save Without Payment"}
                  </button>
                  
                  {editingId && (
                    <button
                      onClick={() => {
                        setNewReport({ date: "", weight: "", quality: "A", price: "" });
                        setEditingId(null);
                      }}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  )}
                </div>
                
                {showPaymentSuccess && (
                  <div className="payment-success">
                    Payment successful! Report has been saved.
                  </div>
                )}
              </div>

               <div className="report-list">
                <h3>Recent Reports (Max 2 per month)</h3>
                <div className="report-table">
                  <div className="table-header">
                    <span>Date</span>
                    <span>Weight (kg)</span>
                    <span>Quality</span>
                    <span>Price (₹/kg)</span>
                    <span>Total (₹)</span>
                    <span>Actions</span>
                  </div>
                  {formatReportsByMonth(selected.reports)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((report) => (
                      <div key={report.id} className="table-row">
                        <span>{report.date}</span>
                        <span>{report.weight} kg</span>
                        <span className={`quality-tag ${report.quality}`}>
                          {report.quality}
                        </span>
                        <span>₹{report.price.toFixed(2)}</span>
                        <span>₹{(report.weight * report.price).toFixed(2)}</span>
                        <span className="actions">
                          <button onClick={() => editReport(report)}>
                            <FiEdit2 />
                          </button>
                          <button onClick={() => deleteReport(report.id)}>
                            <FiTrash2 />
                          </button>
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="report-graphs">
                <h3>Delivery Trends</h3>
                <div className="graph-container">
                  <div className="graph">
                    <h4>Weight by Date</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={generateGraphData(selected.reports)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis label={{ value: "kg", angle: -90, position: "insideLeft" }} />
                        <Tooltip formatter={(value) => [`${value} kg`, "Weight"]} />
                        <Bar dataKey="kg" fill="#4a90e2" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="graph">
                    <h4>Quality Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={generateQualityData(selected.reports)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {generateQualityData(selected.reports).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} deliveries`, "Count"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="stats-section">
              <div className="stats-cards">
                <div className="stat-card">
                  <h3>Total Delivered</h3>
                  <p className="stat-value">{stats.totalWeight || 0} kg</p>
                  <p className="stat-label">All time</p>
                </div>
                <div className="stat-card">
                  <h3>Total Spent</h3>
                  <p className="stat-value">₹{(stats.totalCost || 0).toFixed(2)}</p>
                  <p className="stat-label">All time</p>
                </div>
                <div className="stat-card">
                  <h3>Average Price</h3>
                  <p className="stat-value">₹{(stats.avgPrice || 0).toFixed(2)}/kg</p>
                  <p className="stat-label">Weighted average</p>
                </div>
                <div className="stat-card">
                  <h3>Last Delivery</h3>
                  <p className="stat-value">{stats.lastDelivery || "N/A"}</p>
                  <p className="stat-label">Most recent</p>
                </div>
              </div>

              <div className="price-trend">
                <h3>Price Trend Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selected.reports}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: "₹/kg", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`₹${value}`, "Price"]} />
                    <Line type="monotone" dataKey="price" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

  );
}

export default SupplierDetails;