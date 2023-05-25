import React, { useState } from "react";
import IndustryDataService from "../services/IndustryService";

const AddIndustry = () => {
  const initialIndustryState = {
    id: null,
    Time: "",
    Industry: "",
    NumberOfLayOff: null,
  };
  const [industry, setIndustry] = useState(initialIndustryState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setIndustry({ ...industry, [name]: value });
  };

  const saveIndustry = () => {
    var data = {
      Industry: industry.Industry,
      Time: industry.Time,
      NumberOfLayOff: industry.NumberOfLayOff
    };

    IndustryDataService.create(data)
      .then(response => {
        setIndustry({
          id: response.data.id,
          Time: response.data.Time,
          Industry: response.data.Industry,
          NumberOfLayOff: response.data.NumberOfLayOff
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newIndustry = () => {
    setIndustry(initialIndustryState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newIndustry}>
            Add more
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="Industry">Industry</label>
            <input
              type="text"
              className="form-control"
              id="Industry"
              required
              value={industry.Industry}
              onChange={handleInputChange}
              name="Industry"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Time">Time</label>
            <input
              type="text"
              className="form-control"
              id="Time"
              required
              value={industry.Time}
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
              value={industry.NumberOfLayOff}
              onChange={handleInputChange}
              name="NumberOfLayOff"
            />
          </div>

          <button onClick={saveIndustry} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddIndustry;
