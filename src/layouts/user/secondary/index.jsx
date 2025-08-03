import React, {useState} from 'react'
import NavbarHomeUser from '../../../components/navbar-home-user/index'
import FooterGeneral from '../../../components/footer-general/index'
import { Outlet } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import './style.css'

export default function index() {
    return (
        <>
            <NavbarHomeUser />
            <Container fluid className="mt-21 px-4">
                <Outlet />
            </Container>
            
            <FooterGeneral />
        </>
    )
}
