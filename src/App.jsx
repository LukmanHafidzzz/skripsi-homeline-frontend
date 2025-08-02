import { useState, useEffect } from 'react'

import { Routes, Route } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Protect
import ProtectedRoute from "./components/protected-route/index";
import ProtectedRouteWithRoles from "./components/protected-route-roles/index"

// Layouts
import MainLayout from "./layouts/user/main/index";
import SecondaryLayout from "./layouts/user/secondary/index";
import Advertisement from "./layouts/user/ad/index"
import Adminlayout from './layouts/admin/index';
import SurveyorLayout from './layouts/surveyor/index'
import DesignerLayout from './layouts/designer/index'

// Pages
import Unauthorize from "./pages/unauthorized/index"
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
import AdProcessDetailModel from "./pages/user/ad/processing/model/index"

import AdRejected from "./pages/user/ad/rejected/index"
import AdRejectedDetail from "./pages/user/ad/rejected/detail/index"

import AdApproved from "./pages/user/ad/approved/index"
import AdApprovedDetail from "./pages/user/ad/approved/detail/index"
import AdApprovedDetailModel from "./pages/user/ad/approved/model/index"

import AdDelete from "./pages/user/ad/delete/index"
import AdDeleteDetail from "./pages/user/ad/delete/detail/index"
import AdDeleteDetailModel from "./pages/user/ad/delete/model/index"

import AdAdd from "./pages/user/ad/add/index"

import AdminHome from "./pages/admin/home/index"

import HouseList from './pages/admin/house-list/index'
import HouseListDetail from './pages/admin/house-list/detail/index'
import HouseListModel from './pages/admin/house-list/model/index'

import CheckingAwal from './pages/admin/checking-awal/index'
import CheckingAwalDetail from './pages/admin/checking-awal/detail/index'

import PaymentConfirm from './pages/admin/payment-confirm/index'
import PaymentConfirmDetail from './pages/admin/payment-confirm/detail/index'

import QrInput from './pages/admin/input-qr/index'
import QrInputDetail from './pages/admin/input-qr/detail/index'

import EmbedMap from './pages/admin/embed-map/index'
import EmbedMapDetail from './pages/admin/embed-map/detail/index'

import ReqDesignApproval from './pages/admin/request-desain-approval/index'
import ReqDesignApprovalDetail from './pages/admin/request-desain-approval/detail/index'

import ReqSurveyApproval from './pages/admin/request-survey-approval/index'
import ReqSurveyApprovalDetail from './pages/admin/request-survey-approval/detail/index'

import SurveyListHouse from './pages/admin/survey-list-house/index'
import SurveyListHouseDetail from './pages/admin/survey-list-house/detail/index'

import SurveyInput from './pages/admin/survey-input/index'
import SurveyInputDetail from './pages/admin/survey-input/detail/index'

import DesignListHouse from './pages/admin/design-list-house/index'
import DesignListHouseDetail from './pages/admin/design-list-house/detail/index'

import DesignInput from './pages/admin/design-input/index'
import DesignInputDetail from './pages/admin/design-input/detail/index'
import DesignInputModel from './pages/admin/design-input/model/index'

import SurveyorHome from "./pages/surveyor/home/index"

import SurveyorHouseList from './pages/surveyor/house-list/index'
import SurveyorHouseListDetail from './pages/surveyor/house-list/detail/index'

import SurveyorResultInput from './pages/surveyor/input/index'
import SurveyorResultInputDetail from './pages/surveyor/input/detail/index'

import SurveyorMakeReq from './pages/surveyor/make-request/index'
import SurveyorMakeReqDetail from './pages/surveyor/make-request/detail/index'

import DesignerHome from "./pages/designer/home/index"

import DesignerHouseList from './pages/designer/house-list/index'
import DesignerHouseListDetail from './pages/designer/house-list/detail/index'
import DesignerHouseListModel from './pages/designer/house-list/model/index'

import DesignerResultInput from './pages/designer/input/index'
import DesignerResultInputDetail from './pages/designer/input/detail/index'

import DesignerMakeReq from './pages/designer/make-request/index'
import DesignerMakeReqDetail from './pages/designer/make-request/detail/index'


import Login from "./pages/auth/login/index";
import Register from "./pages/auth/register/index";

function App() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <Routes>
            <Route
                path='/unauthorized'
                element={<Unauthorize />}
            />

            <Route element={<MainLayout />}>
                <Route path="/search" element={<Searchpage />} />
            </Route>

            <Route element={<SecondaryLayout />}>
                <Route path="/" element={<Landingpage />} />
            </Route>

            <Route
                element={
                    <ProtectedRoute allowedLevels={[4]}>
                        <SecondaryLayout />
                    </ProtectedRoute>
                }>
                <Route path="search/detail/:id" element={<DetailHousePage />} />
                <Route path="search/detail/:id/model/:id" element={<Model />} />
            </Route>

            <Route
                path="/advertisement"
                element={
                    <ProtectedRoute allowedLevels={[4]}>
                        <Advertisement />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdvertisementHome />} />
                <Route path="waiting" element={<AdWaiting />} />
                <Route path="waiting/detail/:id" element={<AdWaitingDetail />} />
                <Route path="waiting-payment" element={<AdWaitingPayment />} />
                <Route path="waiting-payment/detail/:id" element={<AdWaitingPaymentDetail />} />
                <Route path="need-approval" element={<AdNeedApproval />} />
                <Route path="need-approval/detail/:id" element={<AdNeedApprovalDetail />} />
                <Route path="processing" element={<AdProcess />} />
                <Route path="processing/detail/:id" element={<AdProcessDetail />} />
                <Route path="processing/detail/:id/model/:id" element={<AdProcessDetailModel />} />
                <Route path="rejected" element={<AdRejected />} />
                <Route path="rejected/detail/:id" element={<AdRejectedDetail />} />
                <Route path="approved" element={<AdApproved />} />
                <Route path="approved/detail/:id" element={<AdApprovedDetail />} />
                <Route path="approved/detail/:id/model/:id" element={<AdApprovedDetailModel />} />
                <Route path="delete" element={<AdDelete />} />
                <Route path="delete/detail/:id" element={<AdDeleteDetail />} />
                <Route path="delete/detail/:id/model/:id" element={<AdDeleteDetailModel />} />
                <Route path="add" element={<AdAdd />} />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedLevels={[1]}>
                        <Adminlayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminHome />} />
                <Route path='house-list' element={<HouseList />} />
                <Route path='house-list/detail/:id' element={<HouseListDetail />} />
                <Route path='house-list/detail/:id/model/:id' element={<HouseListModel />} />
                <Route path='checking' element={<CheckingAwal />} />
                <Route path='checking/detail/:id' element={<CheckingAwalDetail />} />
                <Route path='payment-confirm' element={<PaymentConfirm />} />
                <Route path='payment-confirm/detail/:id' element={<PaymentConfirmDetail />} />
                <Route path='input-qr' element={<QrInput />} />
                <Route path='input-qr/detail/:id' element={<QrInputDetail />} />
                <Route path='embed-map' element={<EmbedMap />} />
                <Route path='embed-map/detail/:id' element={<EmbedMapDetail />} />
                <Route path='request-desain-approval' element={<ReqDesignApproval />} />
                <Route path='request-desain-approval/detail/:id' element={<ReqDesignApprovalDetail />} />
                <Route path='request-survey-approval' element={<ReqSurveyApproval />} />
                <Route path='request-survey-approval/detail/:id' element={<ReqSurveyApprovalDetail />} />
                <Route path='survey-list-house' element={<SurveyListHouse />} />
                <Route path='survey-list-house/detail/:id' element={<SurveyListHouseDetail />} />
                <Route path='survey-input' element={<SurveyInput />} />
                <Route path='survey-input/detail/:id' element={<SurveyInputDetail />} />
                <Route path='design-list-house' element={<DesignListHouse />} />
                <Route path='design-list-house/detail/:id' element={<DesignListHouseDetail />} />
                <Route path='design-input' element={<DesignInput />} />
                <Route path='design-input/detail/:id' element={<DesignInputDetail />} />
                <Route path='design-input/detail/:id/model/:id' element={<DesignInputModel />} />
            </Route>

            <Route
                path='/surveyor'
                element={
                    <ProtectedRoute allowedLevels={[2]}>
                        <SurveyorLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<SurveyorHome />} />
                <Route path='house-list' element={<SurveyorHouseList />} />
                <Route path='house-list/detail/:id' element={<SurveyorHouseListDetail />} />
                <Route path='input-house-survey' element={<SurveyorResultInput />} />
                <Route path='input-house-survey/detail/:id' element={<SurveyorResultInputDetail />} />
                <Route path='make-request' element={<SurveyorMakeReq />} />
                <Route path='make-request/detail/:id' element={<SurveyorMakeReqDetail />} />
            </Route>

            <Route
                path='/designer'
                element={
                    <ProtectedRoute allowedLevels={[3]}>
                        <DesignerLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DesignerHome />} />
                <Route path='house-list' element={<DesignerHouseList />} />
                <Route path='house-list/detail/:id' element={<DesignerHouseListDetail />} />
                <Route path='house-list/detail/:id/model/:id' element={<DesignerHouseListModel />} />
                <Route path='input-house-model' element={<DesignerResultInput />} />
                <Route path='input-house-model/detail/:id' element={<DesignerResultInputDetail />} />
                <Route path='make-request' element={<DesignerMakeReq />} />
                <Route path='make-request/detail/:id' element={<DesignerMakeReqDetail />} />
            </Route>

            <Route path="/auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default App;
