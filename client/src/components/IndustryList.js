import React, { useState, useEffect } from "react";
import IndustryDataService from "../services/IndustryService";
import { Link } from "react-router-dom";

const IndustrysList = () => {
  const [industrys, setIndustrys] = useState([]);
  const [currentIndustry, setCurrentIndustry] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveIndustrys();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveIndustrys = () => {
    IndustryDataService.getAll()
      .then(response => {
        setIndustrys(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveIndustrys();
    setCurrentIndustry(null);
    setCurrentIndex(-1);
  };

  const setActiveIndustry = (industry, index) => {
    console.log(industry);
    setCurrentIndustry(industry);
    setCurrentIndex(index);
  };


  const findByTitle = () => {
    console.log(searchTitle);
    IndustryDataService.findByTitle(searchTitle)
      .then(response => {
        setIndustrys(response.data);
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
            placeholder="Search by industry"
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
        <h4>Numbers of layoffs by industry</h4>
        
        <ul className="list-group">
          {industrys &&
            industrys.map((industry, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveIndustry(industry, index)}
                key={index}
              >
                {industry.Industry} {industry.Time}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentIndustry ? (
          <div>
            <h4>Detail</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentIndustry.id}
            </div>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentIndustry.Industry}
            </div>
            <div>
              <label>
                <strong>Time:</strong>
              </label>{" "}
              {currentIndustry.Time}
            </div>
            <div>
              <label>
                <strong>Number of Layoffs:</strong>
              </label>{" "}
              {currentIndustry.NumberOfLayOff}
            </div>

            <Link
              to={"/adminIndustry/" + currentIndustry.id}
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

export default IndustrysList;
