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
                const response = await api.get(`/admins/subscriptions/getAll`);
                
               
                const mappedData = response.data.map((item) => ({
                    package: `Package ${item.id}`, 
                    id:item.id,         
                    customerName: `Customer ${item.customerName}`, 
                    customerId: item.customerId,                     
                    phoneNumber: item.phoneNumber,             
                    endDate: item.endDate,                  
                    status:  item.status,
                    purchasedDate:item.purchasedDate,
                    packageName:item.packageName,
                    amount:item.amount,
                    noOfDays:item.noOfDays,
                    startDate:item.startDate
                                    
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


    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

 
    const navigateToDetails = (sub) => {
        navigate(`/admin/subscriptiondetails`,{state:sub});
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
                                        onClick={() => navigateToDetails(sub)}
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
