import Dashboard from "./Components/Administrator/Dashboard";
import AdminLogin from "./Components/Administrator/AdminLogin";
import Home from "./Components/UserInterface/Home";
import BannerImages from "./Components/Administrator/BannerImages";
import SearchBar from "./Components/UserInterface/UserComponents/SearchBar";
import FilterCompomnent from "./Components/UserInterface/UserComponents/FilterComponent";
import SetProductDetails from "./Components/UserInterface/UserComponents/SetProductDetails";





import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Components/UserInterface/UserComponents/ProductList";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<Home />} path="/home" />
          <Route element={<ProductList/>} path="/productlist/:id/:icon" />
          <Route element={<FilterCompomnent/>} path="/filter" />
          <Route element={<SetProductDetails/>} path="/setproduct" />
          
        
          
          
       
    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
