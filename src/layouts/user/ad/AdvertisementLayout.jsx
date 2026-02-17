import React, { useState, useEffect, lazy, Suspense } from 'react';
const NavbarHomeUser = lazy(() => import('../../../components/navbar-home-user/NavbarHomeUser.jsx'));
const FooterGeneral = lazy(() => import('../../../components/footer-general/FooterGeneral.jsx'));
const UserSidebar = lazy(() => import('../../../components/user-sidebar/UserSidebar.jsx'));
import { useAuth } from '../../../context/AuthProvider.jsx';
import { Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css'
import axios from 'axios';

export default function AdvertisementLayout() {
    const { loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) setLoading(false);
    }, [authLoading]);
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <NavbarHomeUser />
            </Suspense>
            <Container fluid className="mt-21 px-4">
                <Row className=''>
                    <Col xs={3} className="">
                        <Suspense fallback={<div>Loading...</div>}>
                            <UserSidebar />
                        </Suspense>
                    </Col>
                    <Col className="p-0">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
            <Suspense fallback={<div>Loading...</div>}>
                <FooterGeneral />
            </Suspense>
        </>
    )
}