import React, { useState, useEffect } from 'react'
import { Col, Container, Image, Row, Breadcrumb, Card, Button, Modal } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';

import { Link } from 'react-router-dom';

import { FaRegFile, FaWhatsapp } from 'react-icons/fa6';

import Skeleton from 'react-loading-skeleton';

import { Splide, SplideSlide } from '@splidejs/react-splide';

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
        <>
            <Container className='fluid'>
                <Row>
                    <Col className="p-0 fs-7">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to='/search' className='breadcrumb-link'>Pencarian</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Detail (Judul Rumah)</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row className="h-100 gap-3">
                    <Col xs={7} className="p-0">
                        {loading ? (
                            <Skeleton height='100%' width='100%' />
                        ) : (
                            <Image src="/housephotos/example.jpg" className="w-100 h-100 object-fit-cover rounded-2" alt="img1" />
                        )}
                    </Col>

                    <Col className="p-0 d-flex flex-column">
                        <Row className="g-0 gap-3 mb-3">
                            <Col className="p-0">
                                {loading ? (
                                    <Skeleton height='100%' width='100%' />
                                ) : (
                                    <Image src="/housephotos/example.jpg" className="w-100 h-100 object-fit-cover rounded-2" alt="img2" />
                                )}
                            </Col>
                            <Col className="p-0">
                                {loading ? (
                                    <Skeleton height={144} width='100%' />
                                ) : (
                                    <Card className="bg-dark text-white border-0 frame" onClick={handleShow}>
                                        <Card.Img src="/housephotos/example-2.jpg" alt="img-bottom" className="w-100 h-100 object-fit-cover rounded-2" />
                                        <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
                                            <Card.Title>Lihat Semua</Card.Title>
                                        </Card.ImgOverlay>
                                    </Card>
                                )}
                            </Col>
                        </Row>
                        <div className="flex-grow-1 rounded-2">
                            {loading ? (
                                <Skeleton height={300} width='100%' />
                            ) : (
                                <Link to='./model'><Card className="bg-dark text-white border-0 frame">
                                    <Card.Img src="/housephotos/example.jpg" alt="img-bottom" className="w-100 h-100 object-fit-cover rounded-2" />
                                    <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
                                        <Card.Title>Lihat 3D Model</Card.Title>
                                    </Card.ImgOverlay>
                                </Card></Link>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row className='mt-4' data-aos="fade-up" data-aos-duration="800">
                    <Col className='p-0'>
                        <div className='fs-4'>
                            Rumah daerah Jakarta Selatan
                        </div>
                        <div className='fs-3 mt-2 fw-semibold'>
                            Rp 550.000.000
                        </div>
                        <div className='fs-7 mt-2'>
                            Cianjur, Jakarta Selatan
                        </div>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <div className="fw-bold mb-2 fs-5 p-0" data-aos="fade-up" data-aos-duration="800">
                        DESKRIPSI
                    </div>
                    <Col xs={8} className="p-0" data-aos="fade-up" data-aos-duration="800">
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod, erat eu ultricies faucibus, mauris lacus tincidunt velit, in accumsan ligula erat id lorem. Mauris elementum purus nulla. Suspendisse in velit egestas, auctor augue a, scelerisque justo. Duis ligula dui, molestie vitae lacus sit amet, pellentesque laoreet quam. Mauris aliquet sapien placerat vehicula tempor. Donec posuere lectus neque, at tristique velit posuere in. Etiam faucibus suscipit augue ac rhoncus. Suspendisse hendrerit, elit et fringilla ultrices, velit risus blandit tortor, ut hendrerit nisi elit vitae nisi. Nulla eu sem bibendum, venenatis ipsum quis, condimentum urna. Sed rutrum nisl sit amet interdum dictum. Integer vestibulum nulla a nunc cursus, nec fringilla tellus ornare. Donec ut placerat ipsum. Integer ut ante maximus nisl commodo sodales. Vestibulum vel libero tincidunt, feugiat arcu et, ultrices neque. Curabitur rhoncus, dui a faucibus cursus, odio magna iaculis justo, a dictum sem odio id dolor. Etiam bibendum sem a justo consectetur, nec blandit sem egestas. Morbi ultrices sollicitudin sapien sollicitudin tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam eget dolor nec accumsan. Sed ultricies ut tellus eu consequat. Phasellus massa leo, dictum condimentum nisi id, maximus feugiat enim. Phasellus placerat augue non leo convallis, in maximus massa laoreet. Suspendisse eget ornare massa. Curabitur fringilla sem eget nisi hendrerit pellentesque. Etiam dapibus neque sit amet gravida faucibus. Cras sem felis, ullamcorper sit amet libero facilisis, vehicula lacinia tortor.
                        </div>
                        <Row className='mt-4'>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <div className="fw-bold mb-2 fs-5">
                                    INFORMASI LAINNYA
                                </div>
                                <div>
                                    <Row className='mb-2'>
                                        <Col className=''>Kamar Tidur</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>2</Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>Kamar Mandi</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>2</Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>Garasi</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>1</Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>Luas Bangunan</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>200 m<sup>2</sup></Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>Luas Tanah</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>160 m<sup>2</sup></Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <div className="fw-bold mb-2 fs-5">
                                    INFORMASI HASIL SURVEY
                                </div>
                                <div>
                                    <Link to='' className='text-decoration-none text-black'><FaRegFile /></Link> <Link to='' className='text-decoration-none text-black ms-2'>Survey_01072025_aDs23Fsa.pdf</Link>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-4 d-flex align-items-center mb-2" data-aos="fade-up" data-aos-duration="800">
                            <Col>
                                <div className="fw-bold fs-5">
                                    Lokasi
                                </div>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <Link className='fs-7 btn-visit fw-semibold'>Kunjungi</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <iframe className='rounded-2'
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1588.0198612413365!2d110.34478164863316!3d-7.782823520586071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1752954829611!5m2!1sid!2sid"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4} className="px-4" data-aos="fade-up" data-aos-duration="800">
                        <Card className='card-contact p-4 d-flex align-items-center'>
                            <div className='mb-1 profile-contact'>
                                {/* <FaRegUser /> */}
                                <Image src='userphoto/user.jpg' />
                            </div>
                            <div className='mb-1'>John Doe</div>
                            <div className='mb-4'>johndoe@gmail.com</div>
                            <Button className='btn-wa fs-4 fw-semibold'>
                                <FaWhatsapp />
                            </Button>
                        </Card>
                    </Col>
                </Row>

                <Modal
                    show={show}
                    size="lg"
                    onHide={handleClose}
                    centered
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className='p-0'>
                        <Splide
                            options={{
                                type: 'loop',
                            }}
                            className="h-100"
                        >
                            <SplideSlide className="h-100">
                                <Image src="/housephotos/example.jpg" className="w-100" alt="img1" />
                            </SplideSlide>
                            <SplideSlide className="h-100">
                                <Image src="/housephotos/example-2.jpg" className="w-100" alt="img2" />
                            </SplideSlide>
                        </Splide>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    )
}
