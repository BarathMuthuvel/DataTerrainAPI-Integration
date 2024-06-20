import React, { useState } from "react";

type CreateTicketProps = {
  onCancel: () => void;
  onTicketCreated: () => void;
};

const CreateTicket: React.FC<CreateTicketProps> = ({ onCancel, onTicketCreated }) => {
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticketCategory || !ticketType || !ticketSubject || !projectName || !description) {
      setValidationMessage("Please fill out all fields.");
      return;
    }

    const ticketData = {
      ticket_description: description,
      ticket_category: ticketCategory,
      ticket_type: ticketType,
      resolved_description: description,
      ticket_subject: ticketSubject
    };

    fetch("http://52.35.66.255:8000/ticket_list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticketData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Ticket created:", data);
        onTicketCreated();
      })
      .catch((error) => console.error("Error creating ticket:", error));
  };

  return (
    <div className="bg-white w-full shadow-md rounded my-5 p-4">
      <div className="border-b-2 p-4">
        <h1 className="text-xl font-semibold">Create Ticket</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mt-6 mx-10">
          {validationMessage && <p className="text-red-500">{validationMessage}</p>}
          <div className="flex space-x-4">
            <input
              type="text"
              className="w-1/2 p-2 bg-gray-50 rounded focus:outline-none"
              placeholder="Ticket Category"
              value={ticketCategory}
              onChange={(e) => setTicketCategory(e.target.value)}
            />
            <input
              type="text"
              className="w-1/2 p-2 bg-gray-50 rounded focus:outline-none"
              placeholder="Ticket Type"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full p-2 bg-gray-50 rounded focus:outline-none"
              placeholder="Enter Subject"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full p-2 bg-gray-50 rounded focus:outline-none"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div>
            <textarea
              className="w-full h-32 p-2 bg-gray-50 rounded focus:outline-none"
              placeholder="Enter Your Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer">
            <p className="text-gray-500 text-center">Choose or drag and drop files here</p>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            type="button"
            className="px-6 py-2 bg-white text-blue border rounded-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-sm">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
