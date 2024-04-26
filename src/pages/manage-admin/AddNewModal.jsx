import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';

const AddNewModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    branchID: '',
    patientGender: '',
    patientReferringDoctor: '',
    patientUploadedDoc: '',
    status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to API endpoint with formData
      await onSubmit(formData);
      onClose(); // Close the modal upon successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Patient">
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Patient Age:
          <input type="number" name="patientAge" value={formData.patientAge} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Branch ID:
          <input type="number" name="branchID" value={formData.branchID} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Patient Gender:
          <input type="text" name="patientGender" value={formData.patientGender} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Referring Doctor:
          <input type="text" name="patientReferringDoctor" value={formData.patientReferringDoctor} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Patient Uploaded Doc:
          <input type="text" name="patientUploadedDoc" value={formData.patientUploadedDoc} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default AddNewModal;
