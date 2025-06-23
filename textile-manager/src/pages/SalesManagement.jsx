import { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/SalesManagement.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const YARN_PRICES = {
  "Cotton Dothi": 150,
  "Silk Dothi": 250,
  "Towels": 160,
  "Tissue Dothi": 120,
  "Velcro Dothi": 120,
  "silk Saree": 820,
  "cotton Saree": 750,
};

const SalesManagement = () => {
  const [sales, setSales] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [isInvoiceView, setIsInvoiceView] = useState(false);
  const [newSale, setNewSale] = useState({
    customer: '',
    pieces: '',
    yarnType: '',
    amount: '',
    date: '',
    address: '',
    status: 'Pending',
    phone: '',
    gstin: ''
  });

  const billRef = useRef();

  const handleDownloadPDF = async () => {
    if (!showDetails) {
      alert('Please select an invoice to download.');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    try {
      const input = billRef.current;
      if (!input) {
        alert('Error: Invoice content not found.');
        return;
      }

      // Temporarily adjust styles for PDF rendering
      input.style.width = `${pdfWidth - 2 * margin}mm`;
      input.style.padding = '10mm';

      const canvas = await html2canvas(input, { 
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        windowWidth: input.scrollWidth,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const imgHeight = (canvas.height * (pdfWidth - 2 * margin)) / canvas.width;

      // Reset styles after capturing
      input.style.width = '';
      input.style.padding = '';

      // Add header with branding
      pdf.setFillColor(255, 147, 0); // Orange background for header
      pdf.rect(0, 0, pdfWidth, 20, 'F');
      pdf.setFont('Inter', 'bold');
      pdf.setFontSize(18);
      pdf.setTextColor(255, 255, 255); // White text for header
      pdf.text('Orange Textiles', pdfWidth / 2, 15, { align: 'center' });

      // Add invoice title and date
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Invoice', pdfWidth / 2, 30, { align: 'center' });
      pdf.setFontSize(10);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin, 35);

      // Add the captured invoice content
      if (imgHeight > (pdfHeight - 40 - 2 * margin)) {
        const scaleFactor = (pdfHeight - 40 - 2 * margin) / imgHeight;
        const scaledWidth = (pdfWidth - 2 * margin) * scaleFactor;
        const scaledHeight = imgHeight * scaleFactor;
        pdf.addImage(imgData, 'JPEG', margin, 40, scaledWidth, scaledHeight, undefined, 'FAST');
      } else {
        pdf.addImage(imgData, 'JPEG', margin, 40, pdfWidth - 2 * margin, imgHeight, undefined, 'FAST');
      }

      // Add footer
      pdf.setFillColor(255, 147, 0);
      pdf.rect(0, pdfHeight - 10, pdfWidth, 10, 'F');
      pdf.setFontSize(8);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Orange Textiles | 69/1-24A, Mariamman Kovil Street, Ponnampet, Salem, Tamilnadu – 636001', pdfWidth / 2, pdfHeight - 5, { align: 'center' });

      pdf.save(`Invoice_${showDetails.customer}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    pageStyle: `
      @page { size: A4; margin: 15mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .bill { 
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          box-shadow: none;
          border: none;
          padding: 15mm;
          background: #ffffff;
        }
        .bill-actions { display: none !important; }
      }
    `,
    documentTitle: `OrangeTextiles_Invoice_${showDetails?.customer || ''}`,
    removeAfterPrint: true
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/sales`)
      .then(res => setSales(res.data))
      .catch(err => console.error("Error fetching sales:", err));
  }, []);

  useEffect(() => {
    if (newSale.yarnType && newSale.pieces) {
      const calculatedAmount = YARN_PRICES[newSale.yarnType] * parseFloat(newSale.pieces);
      setNewSale(prev => ({
        ...prev,
        amount: calculatedAmount.toFixed(2)
      }));
    }
  }, [newSale.yarnType, newSale.pieces]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSale(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSale = async () => {
    if (!newSale.customer || !newSale.pieces || !newSale.date || !newSale.yarnType) {
      alert('Please fill in all required fields');
      return;
    }

    const newEntry = {
      ...newSale,
      pieces: parseFloat(newSale.pieces),
      amount: parseFloat(newSale.amount),
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/sales`, newEntry);
      setSales([...sales, res.data]);
      setNewSale({
        customer: '',
        pieces: '',
        yarnType: '',
        amount: '',
        date: '',
        address: '',
        status: 'Pending',
        phone: '',
        gstin: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding sale:", error);
      alert("Failed to add sale. Try again.");
    }
  };

  const handleViewInvoice = (sale) => {
    setShowDetails(sale);
    setIsInvoiceView(true);
  };

  const handleCloseInvoice = () => {
    setShowDetails(null);
    setIsInvoiceView(false);
  };

  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Sales (₹)',
      data: Array(12).fill(0).map((_, month) =>
        sales
          .filter(sale => new Date(sale.date).getMonth() === month)
          .reduce((total, sale) => total + sale.amount, 0)
      ),
      backgroundColor: 'rgba(37, 99, 235, 0.7)',
      borderColor: 'rgba(37, 99, 235, 1)',
      borderWidth: 1,
      borderRadius: 5
    }]
  };

  const yarnTypeSales = Object.keys(YARN_PRICES).map(yarnType => ({
    yarnType,
    total: sales
      .filter(sale => sale.yarnType === yarnType)
      .reduce((total, sale) => total + sale.amount, 0)
  }));

  const pieChartData = {
    labels: yarnTypeSales.map(item => item.yarnType),
    datasets: [{
      label: 'Sales by Yarn Type (₹)',
      data: yarnTypeSales.map(item => item.total),
      backgroundColor: [
        '#2563EB',
        '#7C3AED',
        '#EC4899',
        '#1E40AF',
        '#10B981',
        '#F59E0B',
        '#059669'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Sales Overview' }
    },
    maintainAspectRatio: false
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Sales by Yarn Type' }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="sales-management container mx-auto p-6 bg-gray-50 min-h-screen">
      {!isInvoiceView && (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sales Management</h2>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {showForm ? 'Cancel' : 'Add Sale'}
            </button>
            <button
              onClick={() => setShowGraph(!showGraph)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              {showGraph ? 'Hide Analytics' : 'Show Analytics'}
            </button>
          </div>
          {showForm && (
            <div className="form bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="customer"
                  value={newSale.customer}
                  placeholder="Customer"
                  onChange={handleChange}
                  type="text"
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="pieces"
                  value={newSale.pieces}
                  placeholder="Pieces"
                  onChange={handleChange}
                  type="number"
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="yarnType"
                  value={newSale.yarnType}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Yarn Type</option>
                  {Object.keys(YARN_PRICES).map(yarn => (
                    <option key={yarn} value={yarn}>{yarn}</option>
                  ))}
                </select>
                <input
                  name="amount"
                  value={newSale.amount}
                  placeholder="Amount"
                  type="number"
                  readOnly
                  className="border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
                <input
                  name="date"
                  value={newSale.date}
                  placeholder="Date"
                  onChange={handleChange}
                  type="date"
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="address"
                  value={newSale.address}
                  placeholder="Address"
                  onChange={handleChange}
                  type="text"
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="status"
                  value={newSale.status}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <input
                  name="phone"
                  value={newSale.phone}
                  placeholder="Phone"
                  onChange={handleChange}
                  type="text"
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="gstin"
                  value={newSale.gstin}
                  placeholder="GSTIN"
                  onChange={handleChange}
                  type="text"
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleAddSale}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add Sale
              </button>
            </div>
          )}

          {showGraph && (
            <div className="charts bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="chart-container" style={{ height: '400px' }}>
                  <Bar data={monthlySalesData} options={chartOptions} />
                </div>
                <div className="chart-container" style={{ height: '400px' }}>
                  <Pie data={pieChartData} options={pieChartOptions} />
                </div>
              </div>
            </div>
          )}
          <div id="sales-pdf" className="sales-table bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Customer</th>
                  <th className="px-6 py-3 text-left text-gray-600">Pieces</th>
                  <th className="px-6 py-3 text-left text-gray-600">Yarn Type</th>
                  <th className="px-6 py-3 text-left text-gray-600">Amount (₹)</th>
                  <th className="px-6 py-3 text-left text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{sale.customer}</td>
                    <td className="px-6 py-4">{sale.pieces}</td>
                    <td className="px-6 py-4">{sale.yarnType}</td>
                    <td className="px-6 py-4">₹{sale.amount}</td>
                    <td className="px-6 py-4">{sale.date}</td>
                    <td className="px-6 py-4">{sale.status}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewInvoice(sale)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-200"
                      >
                        VIEW
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showDetails && isInvoiceView && (
        <div ref={billRef} className="bill bg-white p-8 mt-6 rounded-lg shadow-md">
          <div className="bill-header flex justify-between mb-8">
            <div className="seller-details">
              <h3 className="text-2xl font-bold text-orange-600 mb-3">Orange Textiles</h3>
              <p className="text-sm">69/1-24A, Mariamman Kovil Street</p>
              <p className="text-sm">Ponnampet, Salem, Tamilnadu – 636001</p>
              <p className="text-sm">GST IN: 33BWGPN9931C1ZJ</p>
              <p className="text-sm">Mobile: +91 88833 88012</p>
            </div>
            <div className="invoice-details text-right">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Invoice #: INV-{sales.indexOf(showDetails) + 1}</h3>
              <p className="text-sm"><strong>Date:</strong> {showDetails.date}</p>
              <p className="text-sm"><strong>Status:</strong> {showDetails.status}</p>
            </div>
          </div>
          <div className="buyer-details mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Bill To:</h4>
            <p className="text-sm">{showDetails.customer}</p>
            <p className="text-sm">{showDetails.address}</p>
            <p className="text-sm">Phone: {showDetails.phone}</p>
            <p className="text-sm">GSTIN: {showDetails.gstin}</p>
          </div>
          <table className="items-table w-full mb-8">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 bg-orange-50 text-orange-600">Item</th>
                <th className="text-left py-3 px-4 bg-orange-50 text-orange-600">Quantity</th>
                <th className="text-left py-3 px-4 bg-orange-50 text-orange-600">Rate (₹)</th>
                <th className="text-left py-3 px-4 bg-orange-50 text-orange-600">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">{showDetails.yarnType}</td>
                <td className="py-3 px-4 border-b">{showDetails.pieces}</td>
                <td className="py-3 px-4 border-b">{YARN_PRICES[showDetails.yarnType] || 'N/A'}</td>
                <td className="py-3 px-4 border-b">{showDetails.amount}</td>
              </tr>
              <tr>
                <td colSpan="3" className="py-3 px-4 font-semibold text-right">Total:</td>
                <td className="py-3 px-4 font-semibold">₹{showDetails.amount}</td>
              </tr>
            </tbody>
          </table>
          <div className="bill-footer flex justify-between mb-6">
            <div className="payment-info">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Information:</h4>
              <p className="text-sm">Bank: HDFC Bank</p>
              <p className="text-sm">Account: 12345678901234</p>
              <p className="text-sm">IFSC: HDFC0001234</p>
              <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Terms & Conditions:</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>Payment due within 30 days.</li>
                <li>Goods once sold cannot be returned.</li>
                <li>Subject to Coimbatore jurisdiction.</li>
              </ul>
            </div>
            <div className="total-amount text-right">
              <h4 className="text-lg font-semibold text-gray-800">Amount (₹)</h4>
              <p className="text-2xl font-bold text-orange-600">₹{showDetails.amount}</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600">For Orange Textiles</p>
          <div className="bill-actions mt-8 flex space-x-4 justify-center">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Print
            </button>
            <button
              onClick={handleCloseInvoice}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesManagement;