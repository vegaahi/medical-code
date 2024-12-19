import React, { useState, useEffect } from "react";
import api from "../../../api";

const Tickets = (props) => {
  const { customerData } = props;
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    customerName: customerData.fullName,
    email: customerData.email,
    issueDescription: "",
    priority: "Low",
    status: "Open",
  });
  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log("id: ", customerData.id);
        console.log("customerData: ", customerData);
        const response = await api.get(
          `/customers/tickets/get/${customerData.id}`
        );
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, [customerData.id]);

  const fetchTickets = async () => {
    try {
      console.log("id: ", customerData.id);
      console.log("customerData: ", customerData);
      const response = await api.get(
        `/customers/tickets/get/${customerData.id}`
      );
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketData = {
      ...formData,
      customerId: {
        id: customerData.id,
        customerType: customerData.customerType,
      },
    };

    try {
      await api.post("/customers/tickets/post", ticketData);
      // setFormData({
      //   customerName: "",
      //   email: "",
      //   issueDescription: "",
      //   priority: "Low",
      //   status: "Open",
      // });
      setFormData({
        customerName: customerData.fullName,
        email: customerData.email,
        issueDescription: "",
        priority: "Low",
        status: "Open",
      });

      fetchTickets();
    } catch (error) {
      console.error("Error saving ticket:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Raise a Ticket</h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            name="customerName"
            value={customerData.fullName}
            onChange={handleInputChange}
            readOnly
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={customerData.email}
            onChange={handleInputChange}
            readOnly
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issueDescription" className="form-label">
            Issue Description
          </label>
          <textarea
            className="form-control"
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Ticket
        </button>
      </form>
      {/* Tickets Table */}
      <h2 className="my-4">Your Tickets</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Issue Description</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.customerName}</td>
              <td>{ticket.email}</td>
              <td>{ticket.issueDescription}</td>
              <td>{ticket.createdAt}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Tickets;
