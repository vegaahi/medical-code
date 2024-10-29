import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { useNavigate } from 'react-router-dom';

function SubscriptionTable() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/subscriptions/getallsubscriptions`);
                
                // Map API response to expected structure
                const mappedData = response.data.map((item) => ({
                    package: `Package ${item.id}`,          // Dummy package name
                    customerName: `Customer ${item.customerName}`, // Dummy customer name
                    customerId: item.customerId,                     // Using `id` as Customer ID
                    phoneNumber: item.phoneNumber,             // Dummy phone number
                    endDate: item.subscriptionEndDate,                   // Dummy end date
                    status:  item.subscriptionStatus                 // Dummy subscription status
                }));

                setSubscriptions(mappedData);
            } catch (error) {
                console.error("Error fetching subscription data:", error);
            }
        };

        fetchData();
    }, []);

    // Pagination logic
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentSubscriptions = subscriptions.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(subscriptions.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Handle navigation to details page
    const navigateToDetails = (id) => {
        navigate(`/admin/subscriptions/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4"> Customer Subscription list</h2>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Subscription Package</th>
                        <th>Customer Name</th>
                        <th>Customer ID</th>
                        <th>Phone Number</th>
                        <th>Subscription End Date</th>
                        <th>Subscription Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSubscriptions.length > 0 ? (
                        currentSubscriptions.map((sub, index) => (
                            <tr key={index}>
                                <td>
                                    <button
                                        onClick={() => navigateToDetails(sub.id)}
                                        className="btn btn-link"
                                    > 
                                        {sub.package}
                                    </button>
                                </td>
                                <td>{sub.customerName}</td>
                                <td>{sub.customerId}</td>
                                <td>{sub.phoneNumber}</td>
                                <td>{sub.endDate}</td>
                                <td>{sub.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {[...Array(totalPages)].map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default SubscriptionTable;
