import React, { useEffect, useState } from "react";
import api from "../../../api";

const GetAllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const ticketsPerPage = 10; // Number of tickets per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/admins/tickets/get/all");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Pagination Logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const formatDateFromArray = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 6)
      return "Invalid Date"; // Safety check

    let year = dateArray[0]; // First index is year
    let month = String(dateArray[1]).padStart(2, "0"); // Second index is month (add leading zero)
    let day = String(dateArray[2]).padStart(2, "0"); // Third index is day (add leading zero)
    let hour = String(dateArray[3]).padStart(2, "0"); // Fourth index is hours
    let minute = String(dateArray[4]).padStart(2, "0"); // Fifth index is minutes

    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tickets List</h1>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Issue Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket) => {
            return (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.customerName}</td>
                <td>{ticket.email}</td>
                <td>{ticket.issueDescription}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>{formatDateFromArray(ticket.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default GetAllTickets;
