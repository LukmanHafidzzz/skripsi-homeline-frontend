import React from 'react'

import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import LoginLandingpage from '../btn-login-landingpage/index';

export default function index() {
    return (
        <>
            <Navbar expand="lg" className="border-bottom">
                <Container className=''>
                    <Navbar.Brand href="#home">
                        {/* <img src="/assets/logo.png" alt="" width={100} /> */}
                        <div className='fw-bold fs-4'><span className='clr-primary'>H</span>omeline</div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Container>
                            <Row className="w-100 align-items-center">
                                <Col xs={4}></Col>
                                <Col xs={4} className="d-flex justify-content-center">
                                    <Nav className="justify-content-center gap-3">
                                        <Nav.Link href="">Home</Nav.Link>
                                        <Nav.Link href="">About Us</Nav.Link>
                                        <Nav.Link href="">Contact Us</Nav.Link>
                                    </Nav>
                                </Col>
                                <Col xs={4} className="d-flex justify-content-end align-items-center">
                                    <LoginLandingpage />
                                </Col>
                            </Row>
                        </Container>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
