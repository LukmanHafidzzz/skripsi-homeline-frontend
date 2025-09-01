import React, { useCallback, useState, useEffect } from 'react'
import './style.css'
import { Button, Col, Container, Row, Card } from 'react-bootstrap'
import { MdLockOutline } from "react-icons/md";
import { FaRegClock } from 'react-icons/fa';
import { PiCubeBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet.awesome-markers";
import L, { map } from 'leaflet';

const center = {
    lat: -6.421152113648593,
    lng: 106.77021142436178,
    maps: "https://maps.app.goo.gl/c1qByJcvzJJE96tV9"
};

const schools = [
    {
        id: 1,
        name: "SMP Negeri 25 Kota Depok",
        maps: "https://maps.app.goo.gl/d2L7uajkJJArA735A",
        position: {
            lat: -6.412595878316234,
            lng: 106.76881422448695,
        }
    },
];

const healthFacilities = [
    { id: 1, name: "Klinik Widis Medica", maps: "https://maps.app.goo.gl/JbstrM1mrDXiKF7J9", position: { lat: -6.411944267429344, lng: 106.77038208511823 } },
]

const homeIcon = L.AwesomeMarkers.icon({
    icon: 'house',
    markerColor: 'red',
    prefix: 'fa',
});

const schoolIcon = L.AwesomeMarkers.icon({
    icon: 'graduation-cap',
    markerColor: 'blue',
    prefix: 'fa',
});

const healthFacilitiesIcon = L.AwesomeMarkers.icon({
    icon: 'hospital',
    markerColor: 'green',
    prefix: 'fa',
});

export default function Landingpage() {
    return (
        <>
            <Container className=''>
                <div className='' data-aos="fade-up" data-aos-duration="800">
                    <Row className='d-flex align-items-center'>
                        <Col className=''>
                            <div className='fs-1 fw-bold lh-sm mb-4'>Temukan <span className='clr-primary'>Rumah</span> Impian Anda Dengan <span className='clr-primary'>Mudah</span></div>
                            <div className='mb-4'>Homeline hadir untuk membantu Anda menjual, membeli, atau mencari rumah dengan fitur lengkap termasuk visualisasi model 3D.</div>
                            <Link to='/search'>
                                <Button className='btn-explore fw-semibold'>Jelajahi Sekarang</Button>
                            </Link>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <img src="/assets/about-photo-2.png" alt="about-photo-1" className='photo-about' />
                        </Col>
                    </Row>
                </div>
                <div className='section-gap' data-aos="fade-up" data-aos-duration="800">
                    <Row className='d-flex align-items-center'>
                        <Col className=''>
                            <div className='fs-1 fw-bold'>Pilih Lokasi Idaman Anda</div>
                            <div className=''>Telusuri rumah di berbagai kota dan area favorit Anda.</div>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Link to='/search'>
                                <Button className='btn-explore-2 rounded-5 fw-semibold'>Telusuri</Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <div className='mt-4' data-aos="fade-up" data-aos-duration="800">
                    <Row className=''>
                        <Col style={{ flex: "0 0 29.166%" }} className='d-flex justify-content-start' >
                            <Card className="text-white frame">
                                <Card.Img src="/assets/loc-1.png" alt="Card image" height='100%' />
                                <Card.ImgOverlay className='d-flex align-items-end ms-3'>
                                    <Card.Title>Jakarta</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                        <Col style={{ flex: "0 0 41.666%" }} className='d-flex justify-content-center'>
                            <Row className='h-100 d-grid gap-4 g-3'>
                                <Col>
                                    <Card className="text-white frame">
                                        <Card.Img src="/assets/loc-2.png" alt="Card image" height='100%' />
                                        <Card.ImgOverlay className='d-flex align-items-end ms-3'>
                                            <Card.Title>Tanggerang</Card.Title>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Col>
                                <Col className='d-flex align-items-end'>
                                    <Card className="text-white frame">
                                        <Card.Img src="/assets/loc-3.png" alt="Card image" height='100%' />
                                        <Card.ImgOverlay className='d-flex align-items-end ms-3'>
                                            <Card.Title>Yogyakarta</Card.Title>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{ flex: "0 0 29.166%" }} className='d-flex justify-content-start'>
                            <Card className="text-white frame">
                                <Card.Img src="/assets/loc-4.png" alt="Card image" height='100%' />
                                <Card.ImgOverlay className='d-flex align-items-end ms-3'>
                                    <Card.Title>Bandung</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className='section-gap text-center' data-aos="fade-up" data-aos-duration="800">
                    <div className='fs-1 fw-bold'>Kenali Lebih Dekat Homeline</div>
                    <div className=''>Pelajari bagaimana Homeline membantu Anda mewujudkan hunian impian dengan fitur-fitur unggulan kami.</div>
                    <Row className='mt-4'>
                        <Col xs={4} className=''>
                            <Card className='card-intro p-5 d-flex align-items-center h-100'>
                                <div className='intro-icon fs-2 mb-3'>
                                    <MdLockOutline />
                                </div>
                                <div className="fw-bold fs-5 mb-3">
                                    Aman & Terpercaya
                                </div>
                                <div>
                                    Homeline memastikan semua rumah terverifikasi agar transaksi Anda aman tanpa risiko.
                                </div>
                            </Card>
                        </Col>
                        <Col xs={4} className=''>
                            <Card className='card-intro p-5 d-flex align-items-center h-100'>
                                <div className='intro-icon fs-2 mb-3'>
                                    <FaRegClock />
                                </div>
                                <div className="fw-bold fs-5 mb-3">
                                    Cepat & Mudah
                                </div>
                                <div>
                                    Temukan dan pasang iklan rumah dengan proses yang sederhana dan efisien.
                                </div>
                            </Card>
                        </Col>
                        <Col xs={4} className=''>
                            <Card className='card-intro p-5 d-flex align-items-center h-100'>
                                <div className='intro-icon fs-2 mb-3'>
                                    <PiCubeBold />
                                </div>
                                <div className="fw-bold fs-5 mb-3">
                                    Visualisasi 3D Rumah
                                </div>
                                <div>
                                    Lihat desain rumah secara 3D untuk membantu Anda mengambil keputusan lebih tepat.
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center mt-5">
                        <Link to='/advertisement'>
                            <Button className='btn-explore fw-semibold'>Mulai</Button>
                        </Link>
                    </div>
                </div>
                <div className='section-gap text-center border' data-aos="fade-up" data-aos-duration="800">
                    <MapContainer
                        center={center}
                        zoom={15}
                        style={{ height: "500px", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Circle center={center} radius={2000} color="blue" />
                        <Marker position={center} icon={homeIcon}>
                            <Popup>
                                <div>Rumah Ini</div>
                                <a href={center.maps} target="_blank" rel="noopener noreferrer">
                                    Lihat di Google Maps
                                </a>
                            </Popup>
                        </Marker>

                        {schools.map((school) => (
                            <Marker key={school.id} position={school.position} icon={schoolIcon}>
                                <Popup>
                                    <div>{school.name}</div>
                                    <a href={school.maps} target="_blank" rel="noopener noreferrer">
                                        Lihat di Google Maps
                                    </a>
                                </Popup>
                            </Marker>
                        ))}

                        {healthFacilities.map((facility) => (
                            <Marker key={facility.id} position={facility.position} icon={healthFacilitiesIcon}>
                                <Popup>
                                    <div>{facility.name}</div>
                                    <a href={facility.maps} target="_blank" rel="noopener noreferrer">
                                        Lihat di Google Maps
                                    </a>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </Container>
        </>
    )
}