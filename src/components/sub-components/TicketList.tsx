import React, { useEffect, useState } from "react";
import Search from "./Search";
import IconComponent from "../container/IconComponent";

type Ticket = {
  id: number;
  ticket_subject: string;
  ticket_description: string;
  created_date: string;
  status: string;
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
    fetch(
      `http://52.35.66.255:8000/ticket_list/`
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log("Fetched data:", data); 
        if (data.success && Array.isArray(data.data)) {
          setTickets(data.data);
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

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="bg-white w-full shadow-md rounded my-5 p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <h1 className="text-lg font-semibold">Ticket List</h1>
          <IconComponent
            icon="ri:share-box-fill"
            className="w-5 cursor-pointer h-9"
          />
          <IconComponent
            icon="mdi:calendar-minus-outline"
            className="w-5 cursor-pointer h-9"
          />
        </div>
        <div className="flex gap-8">
          <Search />
          <button className="px-2 shadow-md flex items-center gap-4">
            <IconComponent
              icon="hugeicons:menu-08"
              className="w-5 cursor-pointer text-blue-500 bg-white h-9"
            />
            Filters
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white mt-6">
        <thead>
          <tr className="w-full bg-gray-100 text-left border-b-2 text-sm text-slate-600">
            <th className="p-2 w-14">Ticket ID</th>
            <th className="p-2 w-24">Ticket Subject</th>
            <th className="p-2 w-24">Description</th>
            <th className="p-2 w-20">Creation Date</th>
            <th className="p-2 w-24">Cleared By</th>
            <th className="p-2 w-24">Status</th>
            <th className="p-2 w-24">Tracking</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b text-xs">
                <td className="p-4">{ticket.id}</td>
                <td className="p-4">{ticket.ticket_subject}</td>
                <td className="p-4">{ticket.ticket_description}</td>
                <td className="p-4">{formatDate(ticket.created_date)}</td>
                <td className="p-4">John Doe</td>
                <td className="p-4 "><span className="bg-green-100 p-2 rounded-md">{ticket.status}</span></td>
                <td className="p-4">
                  <IconComponent
                    icon="icon-park-solid:down-c"
                    className="w-5 cursor-pointer text-blue-500 bg-white h-9"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-2">
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center space-x-4 mt-4">
        <div>
          <p className="text-gray-500 font-semibold text-sm">
            Showing <span className="rounded border-2 p-1">{tickets.length}</span> Entries
          </p>
        </div>
        <div className="space-x-2">
          <button
            type="button"
            className="px-6 py-2 bg-white text-blue border rounded-sm"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-blue-500 text-white rounded-sm"
            onClick={nextPage}
          >
            Next Page
          </button>
        </div>
        <div>
          <p className="text-gray-500 text-xs">
            Page {currentPage} of {Math.ceil(tickets.length / ticketsPerPage)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
