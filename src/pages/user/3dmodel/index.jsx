import React, { useState, useEffect } from 'react';
import './style.css'
import ThreeDViewer from './ThreeDViewer';
import '@splidejs/react-splide/css';

import { Breadcrumb, Col, Container, Row, Modal } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';

export default function index() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className='fluid'>
            <Row>
                <Col className="p-0 fs-7">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/search' className='breadcrumb-link'>Pencarian</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='/detail' className='breadcrumb-link'>Detail (Judul Rumah)</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Detail (nama model)</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="h-100 mb-4">
                <Col className='p-0'>
                    {loading ? (
                        <Skeleton height={500} width='100%' />
                    ) : (
                        <ThreeDViewer />
                    )}
                </Col>
            </Row>
            <Row className='d-grid'>
                <Col className='p-0'>
                    <span className="fw-semibold fs-5">Catatan:</span>
                </Col>
                <Col className='p-0'>
                    <span className="">- Scroll mouse untuk zoom in / zoom out</span>
                </Col>
                <Col className='p-0'>
                    <span className="">- Tekan tombol kiri pada mouse untuk interaksi</span>
                </Col>
                <Col className='p-0'>
                    <span className="">- Tekan Shift + tombol kiri pada mouse untuk memindahkan object</span>
                </Col>
            </Row>
        </Container>
    )
}
