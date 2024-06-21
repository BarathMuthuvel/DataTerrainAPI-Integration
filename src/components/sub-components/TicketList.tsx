import React, { useEffect, useState } from "react";
import Search from "./Search";
import IconComponent from "../container/IconComponent";

type Ticket = {
  id: number;
  ticket_subject: string;
  ticket_description: string;
  created_date: string;
  status: string;
  issue_image: string | null;
  expanded: boolean;
};

type ApiResponse = {
  success: boolean;
  data: Ticket[];
};

type TicketListProps = {
  refresh: boolean;
};

const TicketList: React.FC<TicketListProps> = ({ refresh }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ticketsPerPage: number = 10;

  useEffect(() => {
    fetchTickets();
  }, [refresh, currentPage]);

  const fetchTickets = () => {
    fetch(`http://52.35.66.255:8000/ticket_list/`)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log("Fetched data:", data);
        if (data.success && Array.isArray(data.data)) {
          const ticketsWithExpanded = data.data.map((ticket) => ({
            ...ticket,
            expanded: false,
          }));
          setTickets(ticketsWithExpanded);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleDetails = (index: number) => {
    const updatedTickets = [...tickets];
    updatedTickets[index].expanded = !updatedTickets[index].expanded;
    setTickets(updatedTickets);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="bg-white w-full shadow-md rounded my-5 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Ticket List</h1>
        <div className="flex items-center gap-5">
          <IconComponent
            icon="ri:share-box-fill"
            className="w-5 cursor-pointer h-9"
          />
          <IconComponent
            icon="mdi:calendar-minus-outline"
            className="w-5 cursor-pointer h-9"
          />
          <Search />
          <button className="px-2 shadow-md flex items-center gap-2">
            <IconComponent
              icon="hugeicons:menu-08"
              className="w-5 cursor-pointer text-blue-500 bg-white h-9"
            />
            Filters
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left border-b-2 text-sm text-slate-600">
              <th className="px-4 py-2">Ticket ID</th>
              <th className="px-4 py-2">Ticket Subject</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Creation Date</th>
              <th className="px-4 py-2">Cleared By</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Tracking</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <React.Fragment key={ticket.id}>
                  <tr className="border-b text-xs">
                    <td className="px-4 py-2">{ticket.id}</td>
                    <td className="px-4 py-2 w-32">{ticket.ticket_subject}</td>
                    <td className="px-4 py-2">{ticket.ticket_description}</td>
                    <td className="px-4 py-2">
                      {formatDate(ticket.created_date)}
                    </td>
                    <td className="px-4 py-2">John Doe</td>
                    <td className="px-4 py-2">
                      <span className="bg-green-100 py-1 px-2 rounded-md">
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative inline-block text-left">
                        <IconComponent
                          icon={
                            ticket.expanded
                              ? "icon-park-solid:up-c"
                              : "icon-park-solid:down-c"
                          }
                          className="w-5 cursor-pointer text-blue-500 bg-white h-9"
                          onClick={() => toggleDetails(index)}
                        />
                      </div>
                    </td>
                  </tr>
                  {ticket.expanded && (
                    <tr className="border-b">
                      <td colSpan={7} className="px-4 py-2">
                        <div className="flex justify-between items-center gap-4 h-52">
                          <div className="">
                            <p className="text-2xl font-semibold">
                              {ticket.ticket_subject}
                            </p>
                            <p className="text-lg">
                              {ticket.ticket_description}
                            </p>
                          </div>

                          <div className=" w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div
                              className="py-1"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <p className="block px-4 py-2 text-sm text-gray-700">
                                Created Date: {formatDate(ticket.created_date)}
                              </p>
                              <p className="block px-4 py-2 text-sm text-gray-700">
                                Cleared By: John Doe
                              </p>
                              <p className="block px-4 py-2 text-sm text-gray-700">
                                Status:{" "}
                                <span className="bg-green-100 py-1 px-2 rounded-md">
                                  {ticket.status}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        {ticket.issue_image ? (
                          <img
                            src={`http://52.35.66.255:8000${ticket.issue_image}`}
                            alt={ticket.ticket_subject}
                            className="w-full h-auto rounded-md"
                          />
                        ) : (
                          <p className="text-gray-500">No image attached</p>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-2">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-500 font-semibold">
            Showing{" "}
            <span className="rounded border-2 p-1">{tickets.length}</span>{" "}
            Entries
          </p>
        </div>
        <div className="space-x-2">
          <button
            type="button"
            className={`px-4 py-2 bg-white text-blue-500 border rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={nextPage}
          >
            Next Page
          </button>
        </div>
        <div>
          <p className="text-gray-500">
            Page {currentPage} of {Math.ceil(tickets.length / ticketsPerPage)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
