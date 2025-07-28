import React from 'react'
import { Col, Container, Dropdown, Image, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import DesignerSidebar from '../../components/designer-sidebar/index'

import './style.css'
import { FaUser } from "react-icons/fa";

export default function index() {
    return (
        <>
            <Container fluid className="min-vh-100 d-flex">
                <Row className="flex-grow-1 w-100">
                    <Col xs={3} className="border-end p-4">
                        <DesignerSidebar />
                    </Col>
                    <Col className="p-0">
                        <div className="bg-white border-bottom p-3 fs-5 fw-semibold sticky-top">
                            <div className="d-flex justify-content-between">
                                <div>
                                    Desginer Dashboard
                                </div>
                                <div>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle bsPrefix="custom-toggle" className="logout">
                                            {/* <Image src='/userphoto/user.jpg' /> */}
                                            <FaUser />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
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
