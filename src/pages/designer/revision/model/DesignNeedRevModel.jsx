import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds, PointerLockControls } from '@react-three/drei';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as THREE from 'three';
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
        if (keys.current['KeyW'] || keys.current['ArrowUp']) dir[2] -= speed
        if (keys.current['KeyS'] || keys.current['ArrowDown']) dir[2] += speed
        if (keys.current['KeyA'] || keys.current['ArrowLeft']) dir[0] -= speed
        if (keys.current['KeyD'] || keys.current['ArrowRight']) dir[0] += speed

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

export default function DesignNeedRevModel() {
    const { id } = useParams();
    const [house, setHouse] = useState(null);

    useEffect(() => {
        const fetchHouseDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5773/api/designer/house-detail/model/${id}`, {
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
                    <span>- Gunakan tombol <strong>WASD</strong> atau <strong>Arrow (↑ ↓ ← →)</strong> untuk bergerak</span>
                </Col>
                <Col className='p-0'>
                    <span>- Tekan tombol Esc untuk keluar dari mode 3D</span>
                </Col>
            </Row>
        </Container>
    );
}
