import React from 'react'

import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import LoginLandingpage from '../btn-login-landingpage/index';

export default function index() {
    return (
        <>
            <Navbar expand="lg" className="border-bottom">
                <Container fluid className="px-4">
                    <Navbar.Brand href="#home">
                        {/* <img src="/assets/logo.png" alt="logo" width={120} /> */}
                        <div className='fw-bold fs-4'><span className='clr-primary'>H</span>omeline</div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="d-flex flex-column flex-lg-row w-100 align-items-start align-items-lg-center justify-content-between mt-3 mt-lg-0">
                            <Nav className="mx-auto gap-4 text-center">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#about">About Us</Nav.Link>
                                <Nav.Link href="#contact">Contact Us</Nav.Link>
                            </Nav>
                        </div>
                        <div className="mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end">
                            <LoginLandingpage />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
