import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom';

import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import LoginLandingpage from '../btn-login-landingpage/index';

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
                        <div className={`fw-bold fs-4 scroll-text ${isScrolled ? 'scrolled' : ''}`}>Homeline</div>
                        {/* <img src="/assets/logo.png" alt="logo" width={120} /> */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="d-flex flex-column flex-lg-row w-100 align-items-start align-items-lg-center justify-content-between mt-3 mt-lg-0">
                            <Nav className="mx-auto gap-4 text-center">
                                <Nav.Link as={Link} to="/" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Home</Nav.Link>
                                <Nav.Link as={Link} to="/about" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>About Us</Nav.Link>
                                <Nav.Link href="#contact" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Contact Us</Nav.Link>
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
