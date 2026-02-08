import { useState, useEffect, lazy, Suspense } from 'react'

import { Routes, Route } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Protect
import ProtectedRoute from "./components/protected-route/ProtectedRoute.jsx";

// Layouts
import MainLayout from "./layouts/user/main/MainLayout";
import SecondaryLayout from "./layouts/user/secondary/SecondaryLayout";
import AdvertisementLayout from "./layouts/user/ad/AdvertisementLayout.jsx";
import AdminLayout from './layouts/admin/AdminLayout.jsx';
import SurveyorLayout from './layouts/surveyor/SurveyorLayout.jsx';
import DesignerLayout from './layouts/designer/DesignerLayout.jsx';

// Lazy loader
const Loadable = (Component) => (props) => (
    <Suspense fallback={<div className='vh-100 d-flex justify-content-center align-items-center'>Loading...</div>}>
        <Component {...props} />
    </Suspense>
);

// Pages
const Unauthorize = Loadable(lazy(() => import("./pages/unauthorized/Unauthorize.jsx")));
const Searchpage = Loadable(lazy(() => import("./pages/user/searchpage/Searchpage.jsx")));
const Landingpage = Loadable(lazy(() => import("./pages/user/landingpage/Landingpage.jsx")));
const DetailHousePage = Loadable(lazy(() => import("./pages/user/detailhousepage/DetailHousePage.jsx")));
const User3dModel = Loadable(lazy(() => import("./pages/user/3dmodel/User3dModel.jsx")));

const AdvertisementHome = Loadable(lazy(() => import("./pages/user/ad/home/AdvertisementHome.jsx")));
const AdWaiting = Loadable(lazy(() => import("./pages/user/ad/waiting/AdWaiting.jsx")));
const AdWaitingDetail = Loadable(lazy(() => import("./pages/user/ad/waiting/detail/AdWaitingDetail.jsx")));
const AdWaitingPayment = Loadable(lazy(() => import("./pages/user/ad/waiting-payment/AdWaitingPayment.jsx")));
const AdWaitingPaymentDetail = Loadable(lazy(() => import("./pages/user/ad/waiting-payment/detail/AdWaitingPaymentDetail.jsx")));
const AdProcess = Loadable(lazy(() => import("./pages/user/ad/processing/AdProcess.jsx")));
const AdProcessDetail = Loadable(lazy(() => import("./pages/user/ad/processing/detail/AdProcessDetail.jsx")));
const AdProcessDetailModel = Loadable(lazy(() => import("./pages/user/ad/processing/model/AdProcessDetailModel.jsx")));
const AdRejected = Loadable(lazy(() => import("./pages/user/ad/rejected/AdRejected.jsx")));
const AdRejectedDetail = Loadable(lazy(() => import("./pages/user/ad/rejected/detail/AdRejectedDetail.jsx")));
const AdApproved = Loadable(lazy(() => import("./pages/user/ad/approved/AdApproved.jsx")));
const AdApprovedDetail = Loadable(lazy(() => import("./pages/user/ad/approved/detail/AdApprovedDetail.jsx")));
const AdApprovedDetailModel = Loadable(lazy(() => import("./pages/user/ad/approved/model/AdApprovedDetailModel.jsx")));
const AdDelete = Loadable(lazy(() => import("./pages/user/ad/delete/AdDelete.jsx")));
const AdDeleteDetail = Loadable(lazy(() => import("./pages/user/ad/delete/detail/AdDeleteDetail.jsx")));
const AdDeleteDetailModel = Loadable(lazy(() => import("./pages/user/ad/delete/model/AdDeleteDetailModel.jsx")));
const AdAdd = Loadable(lazy(() => import("./pages/user/ad/add/AdAdd.jsx")));

const AdminHome = Loadable(lazy(() => import("./pages/admin/home/AdminHome.jsx")));
const HouseList = Loadable(lazy(() => import('./pages/admin/house-list/HouseList')));
const HouseListDetail = Loadable(lazy(() => import('./pages/admin/house-list/detail/HouseListDetail')));
const HouseListModel = Loadable(lazy(() => import('./pages/admin/house-list/model/HouseListModel')));
const CheckingAwal = Loadable(lazy(() => import('./pages/admin/checking-awal/CheckingAwal')));
const CheckingAwalDetail = Loadable(lazy(() => import('./pages/admin/checking-awal/detail/CheckingAwalDetail')));
const PaymentConfirm = Loadable(lazy(() => import('./pages/admin/payment-confirm/PaymentConfirm')));
const PaymentConfirmDetail = Loadable(lazy(() => import('./pages/admin/payment-confirm/detail/PaymentConfirmDetail')));
const QrInput = Loadable(lazy(() => import('./pages/admin/input-qr/QrInput')));
const QrInputDetail = Loadable(lazy(() => import('./pages/admin/input-qr/detail/QrInputDetail')));
const GeoCoordinate = Loadable(lazy(() => import('./pages/admin/geo-coordinate/GeoCoordinate')));
const GeoCoordinateDetail = Loadable(lazy(() => import('./pages/admin/geo-coordinate/detail/GeoCoordinateDetail')));
const ReqDesignApproval = Loadable(lazy(() => import('./pages/admin/request-desain-approval/ReqDesignApproval')));
const ReqDesignApprovalDetail = Loadable(lazy(() => import('./pages/admin/request-desain-approval/detail/ReqDesignApprovalDetail')));
const ReqSurveyApproval = Loadable(lazy(() => import('./pages/admin/request-survey-approval/ReqSurveyApproval')));
const ReqSurveyApprovalDetail = Loadable(lazy(() => import('./pages/admin/request-survey-approval/detail/ReqSurveyApprovalDetail')));
const SurveyListHouse = Loadable(lazy(() => import('./pages/admin/survey-list-house/SurveyListHouse')));
const SurveyListHouseDetail = Loadable(lazy(() => import('./pages/admin/survey-list-house/detail/SurveyListHouseDetail')));
const SurveyInput = Loadable(lazy(() => import('./pages/admin/survey-input/SurveyInput')));
const SurveyInputDetail = Loadable(lazy(() => import('./pages/admin/survey-input/detail/SurveyInputDetail')));
const SurveyRev = Loadable(lazy(() => import('./pages/admin/survey-rev/SurveyRev')));
const SurveyRevDetail = Loadable(lazy(() => import('./pages/admin/survey-rev/detail/SurveyRevDetail')));
const DesignListHouse = Loadable(lazy(() => import('./pages/admin/design-list-house/DesignListHouse')));
const DesignListHouseDetail = Loadable(lazy(() => import('./pages/admin/design-list-house/detail/DesignListHouseDetail')));
const DesignInput = Loadable(lazy(() => import('./pages/admin/design-input/DesignInput')));
const DesignInputDetail = Loadable(lazy(() => import('./pages/admin/design-input/detail/DesignInputDetail')));
const DesignInputModel = Loadable(lazy(() => import('./pages/admin/design-input/model/DesignInputModel')));

const SurveyorHome = Loadable(lazy(() => import("./pages/surveyor/home/SurveyorHome.jsx")));
const SurveyorHouseList = Loadable(lazy(() => import('./pages/surveyor/house-list/SurveyorHouseList')));
const SurveyorHouseListDetail = Loadable(lazy(() => import('./pages/surveyor/house-list/detail/SurveyorHouseListDetail')));
const SurveyorResultInput = Loadable(lazy(() => import('./pages/surveyor/input/SurveyorResultInput')));
const SurveyorResultInputDetail = Loadable(lazy(() => import('./pages/surveyor/input/detail/SurveyorResultInputDetail')));
const SurveyorNeedSurvey = Loadable(lazy(() => import('./pages/surveyor/need-survey/SurveyorNeedSurvey')));
const SurveyorNeedRevision = Loadable(lazy(() => import('./pages/surveyor/revision/SurveyNeedRev')));
const SurveyNeedRevDetail = Loadable(lazy(() => import('./pages/surveyor/revision/detail/SurveyNeedRevDetail')));
const SurveyorMakeReq = Loadable(lazy(() => import('./pages/surveyor/make-request/SurveyorMakeReq')));
const SurveyorMakeReqDetail = Loadable(lazy(() => import('./pages/surveyor/make-request/detail/SurveyorMakeReqDetail')));

const DesignerHome = Loadable(lazy(() => import("./pages/designer/home/DesignerHome.jsx")));
const DesignerHouseList = Loadable(lazy(() => import('./pages/designer/house-list/DesignerHouseList')));
const DesignerHouseListDetail = Loadable(lazy(() => import('./pages/designer/house-list/detail/DesignerHouseListDetail')));
const DesignerHouseListModel = Loadable(lazy(() => import('./pages/designer/house-list/model/DesignerHouseListModel')));
const DesignerResultInput = Loadable(lazy(() => import('./pages/designer/input/DesignerResultInput')));
const DesignerResultInputDetail = Loadable(lazy(() => import('./pages/designer/input/detail/DesignerResultInputDetail')));
const DesignerResultInputDetailModel = Loadable(lazy(() => import('./pages/designer/input/model/DesignerResultInputDetailModel')));

const DesignerMakeReq = Loadable(lazy(() => import('./pages/designer/make-request/DesignerMakeReq')));
const DesignerMakeReqDetail = Loadable(lazy(() => import('./pages/designer/make-request/detail/DesignerMakeReqDetail')));

const Login = Loadable(lazy(() => import("./pages/auth/login/LoginPage.jsx")));
const Register = Loadable(lazy(() => import("./pages/auth/register/Register.jsx")));

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
                <Route path="search/detail/:id/model/:id" element={<User3dModel />} />
            </Route>

            <Route
                path="/advertisement"
                element={
                    <ProtectedRoute allowedLevels={[4]}>
                        <AdvertisementLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdvertisementHome />} />
                <Route path="waiting" element={<AdWaiting />} />
                <Route path="waiting/detail/:id" element={<AdWaitingDetail />} />
                <Route path="waiting-payment" element={<AdWaitingPayment />} />
                <Route path="waiting-payment/detail/:id" element={<AdWaitingPaymentDetail />} />
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
                        <AdminLayout />
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
                <Route path='geo-coordinate' element={<GeoCoordinate />} />
                <Route path='geo-coordinate/detail/:id' element={<GeoCoordinateDetail />} />
                <Route path='request-desain-approval' element={<ReqDesignApproval />} />
                <Route path='request-desain-approval/detail/:id' element={<ReqDesignApprovalDetail />} />
                <Route path='request-survey-approval' element={<ReqSurveyApproval />} />
                <Route path='request-survey-approval/detail/:id' element={<ReqSurveyApprovalDetail />} />
                <Route path='survey-list-house' element={<SurveyListHouse />} />
                <Route path='survey-list-house/detail/:id' element={<SurveyListHouseDetail />} />
                <Route path='survey-input' element={<SurveyInput />} />
                <Route path='survey-input/detail/:id' element={<SurveyInputDetail />} />
                <Route path='survey-revision' element={<SurveyRev />} />
                <Route path='survey-revision/detail/:id' element={<SurveyRevDetail />} />
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
                <Route path='need-survey' element={<SurveyorNeedSurvey />} />
                <Route path='need-revision' element={<SurveyorNeedRevision />} />
                <Route path='need-revision/detail/:id' element={<SurveyNeedRevDetail />} />
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
                <Route path='input-house-model/detail/:id/model/:id' element={<DesignerResultInputDetailModel />} />

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
