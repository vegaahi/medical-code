import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import ViewContent from "../ViewContent";
import AddSubChapter from "./pages/AddSubChapter";
import AddChapter from "./pages/AddChapter";
import AddImage from "./pages/AddImage";
import Order from "./pages/Order";
import Setting from "./pages/Setting";
import SideBar from "./SideBar";
import UpdateSubChapter from "./pages/UpdateSubChapter";
import UpdateChapter from "./pages/UpdateChapter";
import DeleteChapter from "./pages/DeleteChapter";
import DeleteSubChapter from "./pages/DeleteSubChapter";
import DeleteImg from "./pages/DeleteImg";
import UpdateImage from "./pages/UpdateImage";
import GetAllChapters from "../GetAllChapters";

import "../../css/Admin.css";
import Fonts from "./pages/Fonts";
import Subscription from "./pages/Subscription";

import ViewPackageList from "./pages/ViewPackageList";
import AddPackage from "./pages/AddPackage";
import EditPackage from "./pages/EditPackage";
import SubscriptionDetails from "./pages/SubscriptionDetails";
import ActivityTracker from "./pages/ActivityTracker";
import CoinManager from "./pages/CoinManager";

import GetAllTickets from "./pages/GetAllTickets";

import GetAllCustomers from "../customer/pages/GetAllCustomers";

function Admin() {
  return (
    <SideBar>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/addchapter" element={<AddChapter />} />
        <Route path="/viewContent/:chapterNumber" element={<ViewContent />} />
        <Route path="/getallchapters" element={<GetAllChapters />} />
        <Route path="/getallcustomers" element={<GetAllCustomers />} />
        <Route path="/addsubchapter" element={<AddSubChapter />} />
        <Route path="/addimage" element={<AddImage />} />
        <Route path="/updateimage" element={<UpdateImage />} />
        <Route path="/updatesubchapter" element={<UpdateSubChapter />} />
        <Route path="/updatechapter" element={<UpdateChapter />} />
        <Route path="/updatechapter/:chapterNum" element={<UpdateChapter />} />
        <Route path="/deletechapter" element={<DeleteChapter />} />
        <Route path="/deletesubchapter" element={<DeleteSubChapter />} />
        <Route path="/deleteimage" element={<DeleteImg />} />
        <Route path="/tickets" element={<GetAllTickets />} />
        <Route path="/order" element={<Order />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/fonts" element={<Fonts />} />
        <Route path="/subscriptions" element={<Subscription />} />
        <Route path="/subscriptiondetails" element={<SubscriptionDetails />} />
        <Route path="/packagelist" element={<ViewPackageList />} />
        <Route path="/addpackage" element={<AddPackage />} />
        <Route path="/editpackage/:packageId" element={<EditPackage />} />
        <Route path="/activitytracker" element={<ActivityTracker />} />
        <Route path="/coinmanager" element={<CoinManager />} />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </SideBar>
  );
}

export default Admin;
