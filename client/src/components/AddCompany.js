import React, { useState } from "react";
import CompanyDataService from "../services/CompanyService";

const AddCompany = () => {
  const initialCompanyState = {
    id: null,
    Time: "",
    Company: "",
    NumberOfLayOff: null,
  };
  const [company, setCompany] = useState(initialCompanyState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };

  const saveCompany = () => {
    var data = {
      Company: company.Company,
      Time: company.Time,
      NumberOfLayOff: company.NumberOfLayOff
    };

    CompanyDataService.create(data)
      .then(response => {
        setCompany({
          id: response.data.id,
          Time: response.data.Time,
          Company: response.data.Company,
          NumberOfLayOff: response.data.NumberOfLayOff
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCompany = () => {
    setCompany(initialCompanyState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCompany}>
            Add more
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="Company">Company</label>
            <input
              type="text"
              className="form-control"
              id="Company"
              required
              value={company.Company}
              onChange={handleInputChange}
              name="Company"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Time">Time</label>
            <input
              type="text"
              className="form-control"
              id="Time"
              required
              value={company.Time}
              onChange={handleInputChange}
              name="Time"
            />
          </div>

          <div className="form-group">
            <label htmlFor="NumberOfLayOff">Number of layoffs</label>
            <input
              type="text"
              className="form-control"
              id="NumberOfLayOff"
              required
              value={company.NumberOfLayOff}
              onChange={handleInputChange}
              name="NumberOfLayOff"
            />
          </div>

          <button onClick={saveCompany} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCompany;
