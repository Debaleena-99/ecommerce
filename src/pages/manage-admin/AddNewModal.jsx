// AddPatient.jsx

import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import { useHistory } from "react-router-dom";

const AddPatient = () => {
  const history = useHistory();

  // Define state variables for form fields
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [branchID, setBranchID] = useState(""); // Assuming you have a branch selection field
  const [patientGender, setPatientGender] = useState("");
  const [patientReferringDoctor, setPatientReferringDoctor] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API to add the patient
      const response = await axios.post("your-api-endpoint-here", {
        patientName,
        patientAge,
        branchID,
        patientGender,
        patientReferringDoctor,
        // Add other fields here based on your table schema
      });

      // Handle success
      console.log("Patient added successfully:", response.data);

      // Redirect to the patient list page after adding the patient
      history.push("/patient-list");
    } catch (error) {
      // Handle error
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div>
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="patientAge">Patient Age:</label>
          <input
            type="number"
            id="patientAge"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
          />
        </div>
        {/* Add input fields for other columns */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
