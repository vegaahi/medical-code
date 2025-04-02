import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ReusableCard from "./DashboardCard";
import PieChartComponent from "./PieChartComponent";
import api from "../../../api";

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState({ totalUsers: 0 });
  const [chapterStats, setChapterStats] = useState({ totalChapters: 0 });
  const [orderStats, setOrderStats] = useState(0);
  const [messageStats, setMessageStats] = useState({ totalMessages: 0 });

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, chapterResponse, messagesResponse] =
          await Promise.all([
            api.get("/admins/customers"),
            api.get("/admins/chapter/"),
            api.get("/admins/tickets/get/all"),
          ]);

        const chapterData = chapterResponse.data.length;
        const usersData = usersResponse.data.length;
        const messagesData = messagesResponse.data.length;
        const students = usersResponse.data.filter(
          (user) => user.customerType === "STUDENT"
        ).length;
        const homeoDoctors = usersResponse.data.filter(
          (user) => user.customerType === "HOMEOPATHICDOCTORENTITY"
        ).length;
        const nriDoctors = usersResponse.data.filter(
          (user) => user.customerType === "NRIDOCTORENTITY"
        ).length;

        const openTickets = messagesResponse.data.filter(
          (message) => message.status === "Open"
        ).length;

        const closedTickets = messagesResponse.data.filter(
          (message) => message.status === "Closed"
        ).length;

        setMessageStats((prevStats) => ({
          ...prevStats,
          totalMessages: messagesData,
          openTickets,
          closedTickets,
        }));

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5 ml-5">
      <div className="row">
        {/* Cards with navigation */}
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <div
            onClick={() => navigate("/admin/getallcustomers")}
            style={{ cursor: "pointer" }}
          >
            <ReusableCard
              title="Users"
              icon="👤"
              count={userStats.totalUsers || 0}
              description="Total Users"
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <div
            onClick={() => navigate("/admin/getallchapters")}
            style={{ cursor: "pointer" }}
          >
            <ReusableCard
              title="Chapters"
              icon="📚"
              count={chapterStats.totalChapters || 0}
              description="Total Chapters"
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <div
            onClick={() => navigate("/admin/order")}
            style={{ cursor: "pointer" }}
          >
            <ReusableCard
              title="Orders"
              icon="🛒"
              count={orderStats.totalOrders || 0}
              description="Total Orders"
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <div
            onClick={() => navigate("/admin/tickets")}
            style={{ cursor: "pointer" }}
          >
            <ReusableCard
              title="Messages"
              icon="✉️"
              count={messageStats.totalMessages || 0}
              description="Total Messages"
            />
          </div>
        </div>
      </div>

      {/* Pie Charts */}
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
              { name: "open", value: messageStats.openTickets || 0 },
              { name: "closed", value: messageStats.closedTickets || 0 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
