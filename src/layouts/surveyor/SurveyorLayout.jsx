import React, { lazy, Suspense } from 'react';
import axios from 'axios';
import { Col, Container, Dropdown, Image, Row } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
const SurveyorSidebar = lazy(() => import('../../components/surveyor-sidebar/SurveyorSidebar.jsx'));
import './style.css'
import { FaUser } from "react-icons/fa";

export default function SurveyorLayout() {

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
            <Container fluid className="min-vh-100 d-flex">
                <Row className="flex-grow-1 w-100">
                    <Col xs={3} className="border-end p-4">
                        <Suspense fallback={<div>Loading Sidebar...</div>}>
                            <SurveyorSidebar />
                        </Suspense>
                    </Col>
                    <Col className="p-0">
                        <div className="bg-white border-bottom p-3 fs-5 fw-semibold sticky-top">
                            <div className="d-flex justify-content-between">
                                <div>
                                    Surveyor Dashboard
                                </div>
                                <div>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle bsPrefix="custom-toggle" className="logout">
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
