import React from 'react'

import './style.css'

import { Button, Col, Container, Row, Card } from 'react-bootstrap'

import { MdLockOutline } from "react-icons/md";
import { FaRegClock } from 'react-icons/fa';
import { PiCubeBold } from 'react-icons/pi';

import { Link } from 'react-router-dom';

export default function index() {
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
            </Container>
        </>
    )
}
