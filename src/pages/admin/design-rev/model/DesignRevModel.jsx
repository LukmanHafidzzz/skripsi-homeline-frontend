import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import './style.css';
import '@splidejs/react-splide/css';
import axios from 'axios';

function Model({ fileName }) {
    const { scene } = useGLTF(fileName);
    return <primitive object={scene} />;
}

function ThreeDViewer({ fileName }) {
    return (
        <Canvas style={{ height: '500px', background: '#BDDDE4' }} shadows>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
            <spotLight position={[0, 5, 5]} angle={Math.PI / 6} intensity={2} castShadow />

            <Suspense fallback={null}>
                <Bounds fit clip observe margin={0.9}>
                    <Model fileName={fileName} />
                </Bounds>
            </Suspense>

            <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
    );
}

export default function DesignRevModel() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const { id } = useParams();
    const [house, setHouse] = useState(null);

    useEffect(() => {
        const fetchHouseDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5773/api/admin/house/model/${id}`, {
                    withCredentials: true
                });
                setHouse(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHouseDetail();
    }, [id]);

    if (!house) return <div>Loading...</div>;

    return (
        <Container className='fluid'>
            <Row className="h-100 mb-4">
                <Col className='p-0'>
                    {loading || !house.house_design?.design_file ? (
                        <Skeleton height={500} width='100%' />
                    ) : (
                        <ThreeDViewer fileName={house.house_design.design_file} />
                    )}
                </Col>
            </Row>
            <Row className='d-grid'>
                <Col className='p-0'>
                    <span className="fw-semibold fs-5">Catatan:</span>
                </Col>
                <Col className='p-0'>
                    <span>- Scroll mouse untuk zoom in / zoom out</span>
                </Col>
                <Col className='p-0'>
                    <span>- Tekan tombol kiri pada mouse untuk interaksi</span>
                </Col>
                <Col className='p-0'>
                    <span>- Tekan Shift + tombol kiri pada mouse untuk memindahkan object</span>
                </Col>
            </Row>
        </Container>
    );
}
