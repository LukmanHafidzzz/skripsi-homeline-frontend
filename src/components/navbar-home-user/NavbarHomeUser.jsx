import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap'
const LoginLandingpage = lazy(() => import('../btn-login-landingpage/BtnLoginLandingpage.jsx'));
import { FaUser } from "react-icons/fa6";
import './style.css'

export default function NavbarHomeUser() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5773/api/auth/me', {
                    withCredentials: true
                });
                setUser(res.data);
            } catch (error) {
                setUser(null);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        fetchUser();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.delete('http://localhost:5773/api/auth/logout', {
                withCredentials: true
            });
            navigate('/');
        } catch (error) {
            console.error('Logout gagal:', error);
        }
    };
    return (
        <>
            <Navbar expand="lg" fixed="top" className={`px-4 py-2 custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <div className={`fw-bold fs-4 scroll-text ${isScrolled ? 'scrolled' : ''}`}><span className='clr-primary'>H</span>omeline</div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="d-flex flex-column flex-lg-row w-100 align-items-start align-items-lg-center justify-content-between mt-3 mt-lg-0">
                            <Nav className="mx-auto gap-4 text-center">
                                <Nav.Link as={Link} to="/" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Beranda</Nav.Link>
                                <Nav.Link as={Link} to="/search" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Pencarian</Nav.Link>
                                <Nav.Link href="#contact" className={`mx-auto gap-4 text-center scroll-text ${isScrolled ? 'scrolled' : ''}`}>Kontak Kami</Nav.Link>
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
                                <Suspense fallback={<div>Loading Sidebar...</div>}>
                                    <LoginLandingpage />
                                </Suspense>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
