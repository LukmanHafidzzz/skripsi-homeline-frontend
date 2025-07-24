import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';

import { Container, Nav, Navbar, Row, Col, Image, Dropdown, DropdownButton } from 'react-bootstrap'
import LoginLandingpage from '../btn-login-landingpage/index';

import { FaRegUser } from "react-icons/fa6";

import './style.css'

export default function index() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Navbar expand="lg" fixed="top" className={`px-4 py-2 custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
                <Container fluid>
                    <Navbar.Brand href="#home">
                        {/* <div className='fw-bold fs-4'><span className='clr-primary'>H</span>omeline</div> */}
                        <div className={`fw-bold fs-4 scroll-text ${isScrolled ? 'scrolled' : ''}`}><span className='clr-primary'>H</span>omeline</div>
                        {/* <img src="/assets/logo.png" alt="logo" width={120} /> */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="d-flex flex-column flex-lg-row w-100 align-items-start align-items-lg-center justify-content-between mt-3 mt-lg-0">
                            <Nav className="mx-auto gap-4 text-center">
                                <Nav.Link as={Link} to="/" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Beranda</Nav.Link>
                                <Nav.Link as={Link} to="/search" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Pencarian</Nav.Link>
                                <Nav.Link href="#contact" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Kontak Kami</Nav.Link>
                                <Nav.Link as={Link} to="/advertisement" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Pasang Iklan</Nav.Link>
                            </Nav>
                        </div>
                        {/* <div className="mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end">
                            <LoginLandingpage />
                        </div> */}
                        <div className="mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end">
                            <Dropdown align="end">
                                <Dropdown.Toggle bsPrefix="custom-toggle" className={`profile ${isScrolled ? 'scrolled' : ''}`}>
                                    <Image src='/userphoto/user.jpg' />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
