import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import IconComponent from "../container/IconComponent";

type CreateTicketProps = {
  onCancel: () => void;
  onTicketCreated: () => void;
};

const CreateTicket: React.FC<CreateTicketProps> = ({
  onCancel,
  onTicketCreated,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCategoryIconClick = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowTypeDropdown(false); // Hide type dropdown if open
  };

  const handleTypeIconClick = () => {
    setShowTypeDropdown(!showTypeDropdown);
    setShowCategoryDropdown(false); // Hide category dropdown if open
  };

  const handleCategorySelect = (category: string) => {
    setTicketCategory(category);
    setShowCategoryDropdown(false); // Hide dropdown after selection
  };

  const handleTypeSelect = (type: string) => {
    setTicketType(type);
    setShowTypeDropdown(false); // Hide dropdown after selection
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !ticketCategory ||
      !ticketType ||
      !ticketSubject ||
      !projectName ||
      !description
    ) {
      setValidationMessage("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("ticket_description", description);
    formData.append("ticket_category", ticketCategory);
    formData.append("ticket_type", ticketType);
    formData.append("resolved_description", description);
    formData.append("ticket_subject", ticketSubject);
    if (image) {
      formData.append("issue_image", image);
    }

    fetch("http://52.35.66.255:8000/ticket_list/", {
      method: "POST",
      body: formData,
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
          {validationMessage && (
            <p className="text-red-500">{validationMessage}</p>
          )}
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <input
                type="text"
                className="w-full p-2 pl-2 bg-gray-50 rounded focus:outline-none"
                placeholder="Select Ticket Category"
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
              />
              <IconComponent
                icon="icon-park-outline:down"
                className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 cursor-pointer text-blue-500"
                onClick={handleCategoryIconClick}
              />
              {showCategoryDropdown && (
                <div className="absolute mt-1 w-full bg-white border rounded shadow-lg">
                  <div className="p-2">
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleCategorySelect("Bug")}
                    >
                      Bug
                    </p>
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleCategorySelect("Feature Request")}
                    >
                      Feature Request
                    </p>
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleCategorySelect("Support")}
                    >
                      Support
                    </p>
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleCategorySelect("Documentation")}
                    >
                      Documentation
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="relative w-1/2">
              <input
                type="text"
                className="w-full p-2 pl-2 bg-gray-50 rounded focus:outline-none"
                placeholder="Select Ticket Types"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
              />
              <IconComponent
                icon="icon-park-outline:down"
                className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 cursor-pointer text-blue-500"
                onClick={handleTypeIconClick}
              />
              {showTypeDropdown && (
                <div className="absolute mt-1 w-full bg-white border rounded shadow-lg">
                  <div className="p-2">
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleTypeSelect("Technical")}
                    >
                      Technical
                    </p>
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleTypeSelect("UI/UX")}
                    >
                      UI/UX
                    </p>
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleTypeSelect("Performance")}
                    >
                      Performance
                    </p>
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleTypeSelect("Security")}
                    >
                      Security
                    </p>
                  </div>
                </div>
              )}
            </div>
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
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-500 text-center">
                Drop the image here ...
              </p>
            ) : (
              <p className="text-gray-500 text-center">
                {image
                  ? `Image selected: ${image.name}`
                  : "Choose or drag and drop an image here"}
              </p>
            )}
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
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
