import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CompanyDataService from "../services/CompanyService";

const Company = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialCompanyState = {
    id: null,
    Time: "",
    Company: "",
    NumberOfLayOff: -1,
  };
  const [currentCompany, setCurrentCompany] = useState(initialCompanyState);
  const [message, setMessage] = useState("");

  const getCompany = id => {
    CompanyDataService.get(id)
      .then(response => {
        setCurrentCompany(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getCompany(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCompany({ ...currentCompany, [name]: value });
  };


  const updateCompany = () => {
    CompanyDataService.update(currentCompany.id, currentCompany)
      .then(response => {
        console.log(response.data);
        setMessage("The data was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCompany = () => {
    CompanyDataService.remove(currentCompany.id)
      .then(response => {
        console.log(response.data);
        navigate("/adminCompany");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCompany ? (
        <div className="edit-form">
          <h4>Edit</h4>
          <form>
            
            <div className="form-group">
              <label>
                <strong>Title:  </strong>
              </label>
              {currentCompany.Company}
            </div>

            <div className="form-group">
              <label>
                <strong>Time:  </strong>
              </label>
              {currentCompany.Time}
            </div>
            <div className="form-group">
              <label htmlFor="NumberOfLayOff">Number of layoffs</label>
              <input
                type="text"
                className="form-control"
                id="NumberOfLayOff"
                name="NumberOfLayOff"
                value={currentCompany.NumberOfLayOff}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            className="badge badge-primary mr-2"
            onClick={() => navigate("/adminCompany")}
          >
            Back
          </button>

          <button className="badge badge-danger mr-2" onClick={deleteCompany}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCompany}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a company...</p>
        </div>
      )}
    </div>
  );
};

export default Company;
