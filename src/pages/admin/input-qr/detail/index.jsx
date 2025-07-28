import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';

import { Link } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import Skeleton from 'react-loading-skeleton';
import { FaRegFile } from 'react-icons/fa6';
import { FaRegMap } from 'react-icons/fa';

import Swal from 'sweetalert2';

export default function index() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Container>
                <Row className="gap-3">
                    <Col className="p-0 rounded-2 photos-frame">
                        {loading ? (
                            <Skeleton width="100%" height="100%" />
                        ) : (
                            <Splide
                                aria-label="My Favorite Images"
                                options={{
                                    type: 'loop',
                                    pagination: false,
                                }}
                                className="h-100"
                            >
                                <SplideSlide className="h-100">
                                    <Image src="/housephotos/example.jpg" className="img-fill rounded-2" alt="img1" />
                                </SplideSlide>
                                <SplideSlide className="h-100">
                                    <Image src="/housephotos/example-2.jpg" className="img-fill rounded-2" alt="img2" />
                                </SplideSlide>
                            </Splide>
                        )}
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
                    <Col className="p-0" data-aos="fade-up" data-aos-duration="800">
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod, erat eu ultricies faucibus, mauris lacus tincidunt velit, in accumsan ligula erat id lorem. Mauris elementum purus nulla. Suspendisse in velit egestas, auctor augue a, scelerisque justo. Duis ligula dui, molestie vitae lacus sit amet, pellentesque laoreet quam. Mauris aliquet sapien placerat vehicula tempor. Donec posuere lectus neque, at tristique velit posuere in. Etiam faucibus suscipit augue ac rhoncus. Suspendisse hendrerit, elit et fringilla ultrices, velit risus blandit tortor, ut hendrerit nisi elit vitae nisi. Nulla eu sem bibendum, venenatis ipsum quis, condimentum urna. Sed rutrum nisl sit amet interdum dictum. Integer vestibulum nulla a nunc cursus, nec fringilla tellus ornare. Donec ut placerat ipsum. Integer ut ante maximus nisl commodo sodales. Vestibulum vel libero tincidunt, feugiat arcu et, ultrices neque. Curabitur rhoncus, dui a faucibus cursus, odio magna iaculis justo, a dictum sem odio id dolor. Etiam bibendum sem a justo consectetur, nec blandit sem egestas. Morbi ultrices sollicitudin sapien sollicitudin tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam eget dolor nec accumsan. Sed ultricies ut tellus eu consequat. Phasellus massa leo, dictum condimentum nisi id, maximus feugiat enim. Phasellus placerat augue non leo convallis, in maximus massa laoreet. Suspendisse eget ornare massa. Curabitur fringilla sem eget nisi hendrerit pellentesque. Etiam dapibus neque sit amet gravida faucibus. Cras sem felis, ullamcorper sit amet libero facilisis, vehicula lacinia tortor.
                        </div>
                        <Row className='mt-4'>
                            <Col xs={5} data-aos="fade-up" data-aos-duration="800">
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
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    Alamat Lengkap
                                </div>
                                <div>
                                    Jalan Lor Karangwaru, Tegalrejo, Yogyakarta City, Special Region of Yogyakarta
                                </div>
                            </Col>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <div className="fw-bold mb-2 fs-5">
                                    Sertifikat Hak Atas Tanah
                                </div>
                                <div>
                                    <div className="mb-2">
                                        Jenis Sertifikat: <span>SHM</span>
                                    </div>
                                    <div className="mb-2">
                                        <Link to='' className='text-decoration-none text-black'><FaRegFile /></Link> <Link to='' className='text-decoration-none text-black ms-2'>sertifikat_03072025_aDs23Fsa.pdf</Link>
                                    </div>
                                </div>
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    Lokasi
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <Link to='' className='text-decoration-none text-black'><FaRegMap /></Link> <Link to='' className='text-decoration-none text-black ms-2'>https://maps.app.goo.gl/79XSrN3Nyr8QVKuV8</Link>
                                    </div>
                                </div>
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    Profil
                                </div>
                                <div>
                                    <Row className='mb-2'>
                                        <Col className=''>Nama</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>Lukman Hafidz</Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>Email</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>lukman@gmail.com</Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>No. Whatsapp</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>+628xxxxxxx</Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5 mb-4">
                    <Col className='p-0'>
                        <div className=''>
                            <div className="fw-bold mb-2 fs-5 p-0">
                                INPUT QR
                            </div>
                            <Form>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" />
                                </Form.Group>
                                <div className="d-flex justify-content-end align-items-center">
                                    <Button variant="success" className='fw-semibold px-5 py-2'>
                                        Input
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container >
        </>
    )
}
