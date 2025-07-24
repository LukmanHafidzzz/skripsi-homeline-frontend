import { useState, useEffect } from 'react'

import { Routes, Route } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Layouts
import MainLayout from "./layouts/user/main/index";
import SecondaryLayout from "./layouts/user/secondary/index";
import Advertisement from "./layouts/user/ad/index"

// Pages
import Searchpage from "./pages/user/searchpage/index";
import Landingpage from "./pages/user/landingpage/index";
import DetailHousePage from "./pages/user/detailhousepage/index";
import Model from "./pages/user/3dmodel/index";

import AdvertisementHome from "./pages/user/ad/home/index"

import AdWaiting from "./pages/user/ad/waiting/index"
import AdWaitingDetail from "./pages/user/ad/waiting/detail/index"

import AdWaitingPayment from "./pages/user/ad/waiting-payment/index"
import AdWaitingPaymentDetail from "./pages/user/ad/waiting-payment/detail/index"

import AdNeedApproval from "./pages/user/ad/need-approval/index"
import AdNeedApprovalDetail from "./pages/user/ad/need-approval/detail/index"

import AdProcess from "./pages/user/ad/processing/index"
import AdProcessDetail from "./pages/user/ad/processing/detail/index"

import AdRejected from "./pages/user/ad/rejected/index"
import AdRejectedDetail from "./pages/user/ad/rejected/detail/index"

import AdApproved from "./pages/user/ad/approved/index"
import AdApprovedDetail from "./pages/user/ad/approved/detail/index"
import AdApprovedDetailModel from "./pages/user/ad/approved/model/index"

import AdDelete from "./pages/user/ad/delete/index"
import AdDeleteDetail from "./pages/user/ad/delete/detail/index"

import AdAdd from "./pages/user/ad/add/index"


import Login from "./pages/auth/login/index";
import Register from "./pages/auth/register/index";

function App() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/search" element={<Searchpage />} />
            </Route>

            <Route element={<SecondaryLayout />}>
                <Route path="/" element={<Landingpage />} />
                <Route path="/detail" element={<DetailHousePage />} />
                <Route path="/detail/model" element={<Model />} />
            </Route>

            <Route path="/advertisement" element={<Advertisement />}>
                <Route index element={<AdvertisementHome />} />
                <Route path="waiting" element={<AdWaiting />} />
                <Route path="waiting/detail" element={<AdWaitingDetail />} />
                <Route path="waiting-payment" element={<AdWaitingPayment />} />
                <Route path="waiting-payment/detail" element={<AdWaitingPaymentDetail />} />
                <Route path="need-approval" element={<AdNeedApproval />} />
                <Route path="need-approval/detail" element={<AdNeedApprovalDetail />} />
                <Route path="processing" element={<AdProcess />} />
                <Route path="processing/detail" element={<AdProcessDetail />} />
                <Route path="rejected" element={<AdRejected />} />
                <Route path="rejected/detail" element={<AdRejectedDetail />} />
                <Route path="approved" element={<AdApproved />} />
                <Route path="approved/detail" element={<AdApprovedDetail />} />
                <Route path="approved/detail/model" element={<AdApprovedDetailModel />} />
                <Route path="delete" element={<AdDelete />} />
                <Route path="delete/detail" element={<AdDeleteDetail />} />
                <Route path="add" element={<AdAdd />} />
            </Route>

            <Route path="/auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default App;
