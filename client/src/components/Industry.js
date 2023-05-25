import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import IndustryDataService from "../services/IndustryService";

const Industry = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialIndustryState = {
    id: null,
    Time: "",
    Industry: "",
    NumberOfLayOff: -1,
  };
  const [currentIndustry, setCurrentIndustry] = useState(initialIndustryState);
  const [message, setMessage] = useState("");

  const getIndustry = id => {
    IndustryDataService.get(id)
      .then(response => {
        setCurrentIndustry(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getIndustry(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentIndustry({ ...currentIndustry, [name]: value });
  };


  const updateIndustry = () => {
    IndustryDataService.update(currentIndustry.id, currentIndustry)
      .then(response => {
        console.log(response.data);
        setMessage("The data was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteIndustry = () => {
    IndustryDataService.remove(currentIndustry.id)
      .then(response => {
        console.log(response.data);
        navigate("/adminIndustry");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentIndustry ? (
        <div className="edit-form">
          <h4>Edit</h4>
          <form>
            
            <div className="form-group">
              <label>
                <strong>Title: </strong>
              </label>
              {currentIndustry.Industry}
            </div>

            <div className="form-group">
              <label>
                <strong>Time: </strong>
              </label>
              {currentIndustry.Time}
            </div>
            <div className="form-group">
              <label htmlFor="NumberOfLayOff">Number of layoffs</label>
              <input
                type="text"
                className="form-control"
                id="NumberOfLayOff"
                name="NumberOfLayOff"
                value={currentIndustry.NumberOfLayOff}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            className="badge badge-primary mr-2"
            onClick={() => navigate("/adminIndustry")}
          >
            Back
          </button>

          <button className="badge badge-danger mr-2" onClick={deleteIndustry}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateIndustry}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Industry...</p>
        </div>
      )}
    </div>
  );
};

export default Industry;
