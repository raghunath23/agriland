import React, { useState } from 'react';
import axios from 'axios';
import './yield.css';

const Prediction = () => {
  const [formData, setFormData] = useState({
    statename: '',
    districtname: '',
    season: '',
    crop: '',
    area: '',
  });

  const [apiResponse, setApiResponse] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/production',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Data sent to Flask:', response.data);
      setApiResponse(response.data);
      setShowResult(true);
    } catch (error) {
      console.error('Error sending data to Flask:', error);
    }
  };

  const refresh = () => window.location.reload(true);

  return (
    <div>
      <div className="login-box" style={{ background: 'linear-gradient(#141e30, #243b55)' }}>
        <h2>Crop Yield Prediction</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="statename"
              required
              placeholder="State Name"
              value={formData.statename}
              onChange={handleChange}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="districtname"
              required
              placeholder="District Name"
              value={formData.districtname}
              onChange={handleChange}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="season"
              required
              placeholder="Season"
              value={formData.season}
              onChange={handleChange}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="crop"
              required
              placeholder="Crop"
              value={formData.crop}
              onChange={handleChange}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="area"
              required
              placeholder="Area"
              value={formData.area}
              onChange={handleChange}
            />
          </div>
          <button className="btn" type="submit">Predict</button>
        </form>
      </div>

      {showResult && (
        <div className="reply-box" style={{ background: 'linear-gradient(#141e30, #243b55)' }}>
          <h6>You will get a Yield of {apiResponse.output || 'N/A'} quintals.</h6>
          <h6>Estimated cost per acre is {apiResponse.costofprodperacre || 'N/A'} rupees.</h6>
          <h6>Total estimated cost for the selected area will be {apiResponse.totalcost || 'N/A'} rupees.</h6>
          <h6>Suitable temperature is {apiResponse.suitabletemp || 'N/A'}.</h6>
          <h6>Required Rainfall is {apiResponse.rainfallrqrd || 'N/A'} mm.</h6>
          <h6>Nitrogen, Phosphorus, and Potassium requirements: {apiResponse.NPK || 'N/A'}.</h6>
          <h6>Required fertilizers: {apiResponse.fertilizersrqrd || 'N/A'}.</h6>
          <h6>Water intensity: {apiResponse.waterintensity || 'N/A'}.</h6>
          <button className="btn" onClick={refresh}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Prediction;
