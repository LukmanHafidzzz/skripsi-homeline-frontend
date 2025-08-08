import React, { useState, useEffect, lazy, Suspense } from 'react'
const NavbarHomeUser = lazy(() => import('../../../components/navbar-home-user/NavbarHomeUser.jsx'));
const FooterGeneral = lazy(() => import('../../../components/footer-general/FooterGeneral.jsx'));
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './style.css'
import axios from 'axios';

export default function SecondaryLayout() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Suspense fallback={<div>Loading navbar...</div>}>
                    <NavbarHomeUser />
                </Suspense>
            </Suspense>
            <Container fluid className="mt-21 px-4">
                <Outlet />
            </Container>

            <Suspense fallback={<div>Loading...</div>}>
                <FooterGeneral />
            </Suspense>
        </>
    )
}
