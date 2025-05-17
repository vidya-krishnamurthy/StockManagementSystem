import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import YarnInventory from "./pages/YarnInventory";
import DothiProduction from "./pages/DothiProduction";
import SalesManagement from "./pages/SalesManagement";
import SupplierDetails from "./pages/SupplierDetails";
import EmployeeManagement from './pages/EmployeeManagement';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";


const App = () => (
  <BrowserRouter>
     <Routes>
      {/* 👇 Redirect to /login on root load */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/dashboard" element={<MainLayout />}>
        <Route path="yarn" element={<YarnInventory />} />
        <Route path="dothi" element={<DothiProduction />} />
        <Route path="sales" element={<SalesManagement />} />
        <Route path="suppliers" element={<SupplierDetails />} />
        <Route path="employees" element={<EmployeeManagement />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
