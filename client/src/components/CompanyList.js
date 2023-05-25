import React, { useState, useEffect } from "react";
import CompanyDataService from "../services/CompanyService";
import { Link } from "react-router-dom";

const CompanysList = () => {
  const [companys, setCompanys] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveCompanys();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveCompanys = () => {
    CompanyDataService.getAll()
      .then(response => {
        setCompanys(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCompanys();
    setCurrentCompany(null);
    setCurrentIndex(-1);
  };

  const setActiveCompany = (company, index) => {
    console.log(company);
    setCurrentCompany(company);
    setCurrentIndex(index);
  };

  const handleClick = () => {
    console.log('Button was clicked!');
  }

  const removeAllCompanys = () => {
    CompanyDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    console.log(searchTitle);
    CompanyDataService.findByTitle(searchTitle)
      .then(response => {
        setCompanys(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Company"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Numbers of layoffs by Company</h4>
        
        <ul className="list-group">
          {companys &&
            companys.map((Company, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCompany(Company, index)}
                key={index}
              >
                {Company.Company} {Company.Time}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCompanys}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6">
        {currentCompany ? (
          <div>
            <h4>Detail</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentCompany.id}
            </div>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentCompany.Company}
            </div>
            <div>
              <label>
                <strong>Time:</strong>
              </label>{" "}
              {currentCompany.Time}
            </div>
            <div>
              <label>
                <strong>Number of Layoffs:</strong>
              </label>{" "}
              {currentCompany.NumberOfLayOff}
            </div>

            <Link
              to={"/adminCompany/" + currentCompany.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a row for more detail...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanysList;
