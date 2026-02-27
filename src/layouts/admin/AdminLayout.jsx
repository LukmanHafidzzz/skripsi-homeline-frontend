import React, { lazy, Suspense } from 'react'
import { Col, Container, Dropdown, Image, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
const AdminSidebar = lazy(() => import('../../components/admin-sidebar/AdminSidebar.jsx'));
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider.jsx';
import axios from 'axios';
import './style.css'
import { FaUser } from "react-icons/fa";

export default function AdminLayout() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const handleLogout = async () => {
        try {
            await axios.delete('https://skripsi-homeline-backend.vercel.app/api/auth/logout', {
                withCredentials: true
            });
            setUser(null);
            navigate('/auth/login');
        } catch (error) {
            console.error('Logout gagal:', error);
        }
    };
    return (
        <>
            <Container fluid className="min-vh-100 d-flex">
                <Row className="flex-grow-1 w-100">
                    <Col xs={3} className="border-end p-4">
                        <Suspense fallback={<div>Loading...</div>}>
                            <AdminSidebar />
                        </Suspense>
                    </Col>
                    <Col className="p-0">
                        <div className="bg-white border-bottom p-3 fs-5 fw-semibold sticky-top">
                            <div className="d-flex justify-content-between">
                                <div>
                                    Admin Dashboard
                                </div>
                                <div>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle bsPrefix="custom-toggle" className="logout">
                                            {/* <Image src='/userphoto/user.jpg' /> */}
                                            <FaUser />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
