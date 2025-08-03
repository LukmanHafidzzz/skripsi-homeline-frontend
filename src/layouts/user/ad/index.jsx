import React, { useState } from 'react'
import NavbarHomeUser from '../../../components/navbar-home-user/index'
import Landingpage from '../../../pages/user/landingpage/index'
import FooterGeneral from '../../../components/footer-general/index'
import UserSidebar from '../../../components/user-sidebar/index'
import { Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css'

export default function index() {

    return (
        <>
            <NavbarHomeUser />
            <Container fluid className="mt-21 px-4">
                <Row className=''>
                    <Col xs={3} className="">
                        <UserSidebar />
                    </Col>
                    <Col className="p-0">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
            <FooterGeneral />
        </>
    )
}