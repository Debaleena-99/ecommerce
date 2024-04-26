import React from "react";


const DeleteAdmin = ({ title, onConfirm, onCancel, children }) => { 

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative bg-white w-96 mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-950">{title}</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18.364 5.636c.78.78.78 2.048 0 2.828L14.828 12l3.536 3.536c.78.78.78 2.048 0 2.828-.78.78-2.048.78-2.828 0L12 14.828l-3.536 3.536c-.78.78-2.048.78-2.828 0-.78-.78-.78-2.048 0-2.828L9.172 12 5.636 8.464c-.78-.78-.78-2.048 0-2.828.78-.78 2.048-.78 2.828 0L12 9.172l3.536-3.536c.78-.78 2.048-.78 2.828 0z" />
            </svg>
          </button>
        </div>
        <div className="">{children}</div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-800 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdmin;
