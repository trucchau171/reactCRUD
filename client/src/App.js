import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddIndustry from "./components/AddIndustry";
import Industry from "./components/Industry";
import IndustryList from "./components/IndustryList";
import AddCompany from "./components/AddCompany";
import Company from "./components/Company";
import CompanyList from "./components/CompanyList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand">
          Admin
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/adminIndustry"} className="nav-link">
              Layoffs by Industry
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addIndustry"} className="nav-link">
              Add Industry Data
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adminCompany"} className="nav-link">
              Layoffs by Company
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addCompany"} className="nav-link">
              Add Company Data
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<IndustryList/>} />
          <Route path="/adminIndustry" element={<IndustryList/>} />
          <Route path="/addIndustry" element={<AddIndustry/>} />
          <Route path="/adminIndustry/:id" element={<Industry/>} />
          <Route path="/adminCompany" element={<CompanyList/>} />
          <Route path="/addCompany" element={<AddCompany/>} />
          <Route path="/adminCompany/:id" element={<Company/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
