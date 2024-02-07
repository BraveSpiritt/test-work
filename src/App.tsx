import "./App.css";
import Pages from "./components/pages/Pages";
import PricePlans from "./components/pricePlans/PricePlans";
import Products from "./components/products/Products";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="parentDiv">
      <Router>
        <div className="childDiv">
          <Link to="/pages" style={{ color: "white" }}>
            Pages
          </Link>
          <Link to="/price-plans" style={{ color: "white" }}>
            Price Plans
          </Link>
          <Link to="/products" style={{ color: "white" }}>
            Products
          </Link>
        </div>

        <Routes>
          <Route path="/pages" element={<Pages />} />
          <Route path="/price-plans" element={<PricePlans />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
