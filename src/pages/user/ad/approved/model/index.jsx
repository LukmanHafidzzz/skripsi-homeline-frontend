import React, { useState, useEffect } from 'react'
import { Col, Container, Row  } from 'react-bootstrap'

import ThreeDViewer from './ThreeDViewer';

import './style.css'

import '@splidejs/react-splide/css';

import Skeleton from 'react-loading-skeleton';

export default function index() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Container className='fluid'>
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
            </Container >
        </>
    )
}
