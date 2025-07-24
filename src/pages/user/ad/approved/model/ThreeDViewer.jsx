import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei';

function Model() {
    const { scene } = useGLTF('/models/test 10.glb');
    return <primitive object={scene} />;
}

export default function ThreeDViewer() {
    return (
        <Canvas
            style={{ height: '500px', background: '#BDDDE4' }}
            shadows
        >

            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
            <spotLight position={[0, 5, 5]} angle={Math.PI / 6} intensity={2} castShadow />

            <Suspense fallback={null}>
                <Bounds fit clip observe margin={0.9}>
                    <Model />
                </Bounds>
            </Suspense>

            <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
    );
}

useGLTF.preload('/models/test 10.glb');
