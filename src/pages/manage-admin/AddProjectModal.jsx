import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const AddProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ projectName, projectDescription });
    // Close the modal after submission
    onClose();
  };

  const handleCancel = () => {
    // Close the modal without saving
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Add Project</h2>
        <div className="mb-4">
          <label htmlFor="projectName" className="block mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            className="form-input w-full"
            value={projectName}
            onChange={handleProjectNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectDescription" className="block mb-1">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            className="form-textarea w-full"
            rows="4"
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCancel} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
