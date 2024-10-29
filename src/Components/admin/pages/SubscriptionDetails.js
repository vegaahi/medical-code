import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
function SubscriptionDetails() {
    const { customerId } = useParams();
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(true); // To track subscription status

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/subscription-details/get/${customerId}`);
                const data = {
                    purchasedDate: '2024-01-01',
                    packageName: `Package ${response.data.id}`,
                    amount: '100.00',
                    actualAmount: '90.00',
                    totalAmount: '100.00',
                    noOfDays: 30,
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                    status: 'Active'
                };
                setSubscription(data);
                setIsActive(true); // Set active state on fetch
                setError(null);
            } catch (error) {
                console.error("Error fetching subscription details:", error);
                setError("Failed to fetch subscription details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [customerId]);

    const handleDeactivate = () => {
        const confirmDeactivate = window.confirm('Are you sure you want to deactivate the plan?');
        if (confirmDeactivate) {
            // Logic for deactivating the plan
            setIsActive(false); // Set subscription status to inactive
            // Optionally: make a request to your backend to deactivate the plan
        }
    };

    const handleActivate = () => {
        const confirmActivate = window.confirm('Are you sure you want to activate the plan?');
        if (confirmActivate) {
            // Logic for activating the plan
            setIsActive(true); // Set subscription status to active
            // Optionally: make a request to your backend to activate the plan
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!subscription) return <div>No subscription details found.</div>;

    return (
        <div className="container mt-5">
            <h2>Subscription Details</h2>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Purchased Date</th>
                        <td>{subscription.purchasedDate}</td>
                    </tr>
                    <tr>
                        <th>Package Name</th>
                        <td>{subscription.packageName}</td>
                    </tr>
                    <tr>
                        <th>Amount</th>
                        <td>{subscription.amount}</td>
                    </tr>
                    <tr>
                        <th>Actual Amount</th>
                        <td>{subscription.actualAmount}</td>
                    </tr>
                    <tr>
                        <th>Total Amount</th>
                        <td>{subscription.totalAmount}</td>
                    </tr>
                    <tr>
                        <th>No of Days</th>
                        <td>{subscription.noOfDays}</td>
                    </tr>
                    <tr>
                        <th>Start Date</th>
                        <td>{subscription.startDate}</td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td>{subscription.endDate}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{isActive ? 'Active' : 'Deactivated'}</td>
                    </tr>
                    <tr>
                        <th>Action</th>
                        <td>
                            {isActive ? (
                                <button className="btn btn-danger" onClick={handleDeactivate}>
                                    Deactivate Plan
                                </button>
                            ) : (
                                <button className="btn btn-success" onClick={handleActivate}>
                                    Activate Plan
                                </button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SubscriptionDetails;
