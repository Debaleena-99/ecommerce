import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const DeleteCity = ({ activeModal, onClose, onDelete }) => {
  return (
    <Modal
      title="Delete City"
      activeModal={activeModal}
      onClose={onClose}
    >
      <p>Are you sure you want to delete this city?</p>
      <div className="flex justify-end">
        <Button
          onClick={onDelete}
          text="Delete"
          className="btn btn-danger mr-2"
        />
        <Button
          onClick={onClose}
          text="Cancel"
          className="btn btn-outline-dark"
        />
      </div>
    </Modal>
  );
};

export default DeleteCity;
