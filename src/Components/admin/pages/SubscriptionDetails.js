import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../../api';

function SubscriptionDetails() {
    const location = useLocation();
    const sub = location.state;
    const [subscription, setSubscription] = useState(sub); 
    const [error, setError] = useState(null);

    const handleActivate = async () => {
        const confirmActivate = window.confirm('Are you sure you want to activate the plan?');
        if (confirmActivate) {
            try {
                const updatedSub = { ...subscription, status: "Active" }; 
                const response = await api.put(`/admins/subscriptions/put/${subscription.id}`, updatedSub);
                if (response.status === 200) {
                    setSubscription(updatedSub);
                    alert("Plan activated successfully");
                } else {
                    console.error('Failed to activate the plan:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred while activating the plan:', error);
            }
        }
    };

    const handleDeactivate = async () => {
        const confirmDeactivate = window.confirm('Are you sure you want to deactivate the plan?');
        if (confirmDeactivate) {
            try {
                const updatedSub = { ...subscription, status: "Inactive" };
                const response = await api.put(`/subscriptions/put/${subscription.id}`, updatedSub);
                if (response.status === 200) {
                    setSubscription(updatedSub);
                    alert("Plan deactivated successfully");
                } else {
                    console.error('Failed to deactivate the plan:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred while deactivating the plan:', error);
            }
        }
    };

    if (error) return <div>{error}</div>;

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
                        <td>{subscription.status}</td>
                    </tr>
                    <tr>
                        <th>Action</th>
                        <td>
                            {subscription.status === "Active" ? (
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
