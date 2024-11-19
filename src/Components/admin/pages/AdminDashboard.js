// Dashboard.js
import React, { useState, useEffect } from "react";
import ReusableCard from "./DashboardCard"; // Import the reusable card component
import PieChartComponent from "./PieChartComponent"; // Import the pie chart component
import api from "../../../api";

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState({ totalUsers: 0 });
  const [chapterStats, setChapterStats] = useState({ totalChapters: 0 });
  const [orderStats, setOrderStats] = useState({});
  const [messageStats, setMessageStats] = useState({});

  useEffect(() => {
    // Function to fetch data for users, orders, and messages
    const fetchData = async () => {
      try {
        const [
          usersResponse,
          chapterResponse,
          //ordersResponse,
          //messagesResponse,
        ] = await Promise.all([
          api.get("/admins/customers"), // Example endpoint for users
          api.get("/admins/chapter/"), // Example endpoint for users
          // api.get("/admins/orders"), // Example endpoint for orders
          //api.get("/admins/messages"), // Example endpoint for messages
        ]);

        const chapterData = chapterResponse.data.length;
        const usersData = usersResponse.data.length;
        // const ordersData = ordersResponse.data.length;
        // const messagesData = messagesResponse.data.length;
        const students = usersResponse.data.filter(
          (user) => user.customerType === "STUDENT"
        ).length;
        const homeoDoctors = usersResponse.data.filter(
          (user) => user.customerType === "HOMEOPATHICDOCTORENTITY"
        ).length;
        const nriDoctors = usersResponse.data.filter(
          (user) => user.customerType === "NRIDOCTORENTITY"
        ).length;

        setChapterStats((prevStats) => ({
          ...prevStats,
          totalChapters: chapterData,
        }));
        setUserStats((prevStats) => ({
          ...prevStats,
          totalUsers: usersData,
          studentsCount: students,
          homeoDoctorsCount: homeoDoctors,
          nriDoctorsCount: nriDoctors,
        }));
        console.log("my Users Data", userStats.totalUsers);
        // setOrderStats(ordersData);
        // setMessageStats(messagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure API is only called once on component mount

  return (
    <div className="container mt-5 ml-5">
      <div className="row">
        {/* Cards */}
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <ReusableCard
            title="Users"
            icon="👤"
            count={userStats.totalUsers || 0}
            description="Total Users"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <ReusableCard
            title="Chapters"
            icon="📚"
            count={chapterStats.totalChapters || 0}
            description="Total Chapters"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <ReusableCard
            title="Orders"
            icon="🛒"
            count={orderStats.totalOrders || 0}
            description="Total Orders"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <ReusableCard
            title="Messages"
            icon="✉️"
            count={messageStats.totalMessages || 0}
            description="Total Messages"
          />
        </div>
      </div>

      {/* Pie Charts for users, orders, and messages */}

      <div className="row mt-5">
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
          <PieChartComponent
            title="Users Breakdown"
            data={[
              { name: "student", value: userStats.studentsCount || 0 },
              { name: "homeo doctor", value: userStats.homeoDoctorsCount || 0 },
              { name: "nri doctor", value: userStats.nriDoctorsCount || 0 },
            ]}
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
          <PieChartComponent
            title="Order Status"
            data={[
              { name: "Pending", value: orderStats.pending || 2 },
              { name: "Succeeded", value: orderStats.succeeded || 4 },
              { name: "Failed", value: orderStats.failed || 1 },
            ]}
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
          <PieChartComponent
            title="Messages Status"
            data={[
              { name: "Replied", value: messageStats.replied || 5 },
              { name: "Pending Reply", value: messageStats.pendingReply || 6 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
