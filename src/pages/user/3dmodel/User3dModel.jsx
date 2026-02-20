import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds, PointerLockControls } from '@react-three/drei';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as THREE from 'three';
import Skeleton from 'react-loading-skeleton';
import './style.css';
import '@splidejs/react-splide/css';
import axios from 'axios';

function Model({ fileName }) {
    const { scene } = useGLTF(fileName)
    return <primitive object={scene} />
}

function PlayerControls() {
    const ref = useRef();
    const speed = 0.03;
    const keys = useRef({});

    useState(() => {
        const down = (e) => (keys.current[e.code] = true)
        const up = (e) => (keys.current[e.code] = false)
        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)
        return () => {
            window.removeEventListener('keydown', down)
            window.removeEventListener('keyup', up)
        }
    }, [])

    useFrame(() => {
        if (!ref.current) return
        const dir = [0, 0, 0]
        if (keys.current['KeyW']) dir[2] -= speed
        if (keys.current['KeyS']) dir[2] += speed
        if (keys.current['KeyA']) dir[0] -= speed
        if (keys.current['KeyD']) dir[0] += speed

        ref.current.moveRight(dir[0])
        ref.current.moveForward(-dir[2])
    })

    return <PointerLockControls ref={ref} selector="#canvas-wrapper" />
}

function ThreeDViewer({ fileName }) {
    const cameraPosition = [0, 1.6, 7]
    return (
        <div id="canvas-wrapper" style={{ height: '500px', background: '#BDDDE4' }}>
            <Canvas
                shadows
                camera={{ position: cameraPosition, fov: 75 }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
                <spotLight position={[0, 5, 5]} angle={Math.PI / 6} intensity={2} castShadow />
                <Suspense fallback={null}>
                    <Model fileName={fileName} />
                </Suspense>
                <PlayerControls />
            </Canvas>
        </div>
    )
}

export default function User3dModel() {
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
                const res = await axios.get(`http://localhost:5773/api/user/search/detail/model/${id}`, {
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
            <Row>
                <Col className="p-0 fs-7">
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} to='/search' className='breadcrumb-link'>
                            Pencarian
                        </Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} to={`../search/detail/${house.id}`} className='breadcrumb-link'>
                            {house.title}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{house.house_design.design_file}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className='mb-5'>
                <div className="fw-semibold fs-5 p-0">
                    Denah Rumah
                </div>
                <img src={house.house_design.floor_plan} alt="" className='img-fluid w-50' />
            </Row>
            <Row>
                <div className="fw-semibold fs-5 p-0 mb-2">
                    3D Model
                </div>
            </Row>
            <Row className="h-100 mb-4">
                <Col className='p-0'>
                    {loading && <Skeleton height={500} width='100%' />}
                    <ThreeDViewer fileName={house.house_design.design_file} />
                </Col>
            </Row>
            <Row className='d-grid'>
                <Col className='p-0'>
                    <span className="fw-semibold fs-5">Catatan:</span>
                </Col>
                <Col className='p-0'>
                    <span>- Klik tombol kiri pada mouse untuk interaksi</span>
                </Col>
                <Col className='p-0'>
                    <span>- Tekan tombol Esc untuk keluar dari mode 3D</span>
                </Col>
            </Row>
        </Container>
    );
}
