import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FaUser } from "react-icons/fa6";
import { useAuth } from '../../context/AuthProvider.jsx';
import './style.css';
import axios from 'axios';

const LoginLandingpage = lazy(() => import('../btn-login-landingpage/BtnLoginLandingpage.jsx'));

export default function NavbarHomeUser() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.delete('https://skripsi-homeline-backend.vercel.app/api/auth/logout', {
                withCredentials: true
            });
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout gagal:', error);
        }
    };

    return (
        <Navbar expand="lg" fixed="top" className={`px-4 py-2 custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
            <Container fluid>
                <Navbar.Brand href="/">
                    <div className={`fw-bold fs-4 scroll-text ${isScrolled ? 'scrolled' : ''}`}>
                        <span className='clr-primary'>H</span>omeline
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="d-flex flex-column flex-lg-row w-100 align-items-start align-items-lg-center justify-content-between mt-3 mt-lg-0">
                        <Nav className="mx-auto gap-4 text-center">
                            <Nav.Link as={Link} to="/" className={`scroll-text ${isScrolled ? 'scrolled' : ''}`}>Beranda</Nav.Link>
                            <Nav.Link as={Link} to="/search" className={`scroll-text ${isScrolled ? 'scrolled' : ''}`}>Pencarian</Nav.Link>
                            <Nav.Link href="#contact" className={`scroll-text ${isScrolled ? 'scrolled' : ''}`}>Kontak Kami</Nav.Link>
                            {user && (
                                <Nav.Link as={Link} to="/advertisement" className={`scroll-text ${isScrolled ? 'scrolled' : ''}`}>Pasang Iklan</Nav.Link>
                            )}
                        </Nav>
                    </div>
                    <div className="mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end">
                        {user ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle bsPrefix="custom-toggle" className={`profile ${isScrolled ? 'scrolled' : ''}`}>
                                    <FaUser className='fs-5' />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Suspense fallback={<div>Loading...</div>}>
                                <LoginLandingpage />
                            </Suspense>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
