import React, { useState, useEffect } from 'react'
import { Col, Container, Image, Row, Breadcrumb, Card, Modal } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';
import { Link, useParams } from 'react-router-dom';
import { FaRegFile, FaRegUser, FaWhatsapp } from 'react-icons/fa6';
import Skeleton from 'react-loading-skeleton';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from 'axios';

export default function DetailHousePage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();
    const [house, setHouse] = useState(null);

    useEffect(() => {
        const fetchHouseDetail = async () => {
            try {
                const res = await axios.get(`https://skripsi-homeline-backend.vercel.app/api/user/search/detail/${id}`, {
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
        <>
            <Container className='fluid'>
                <Row>
                    <Col className="p-0 fs-7">
                        <Breadcrumb>
                            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/search' }} className='breadcrumb-link'>
                                Pencarian
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>{house.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row className="h-100 gap-3">
                    <Col xs={7} className="p-0">
                        {loading ? (
                            <Skeleton height='100%' width='100%' />
                        ) : (
                            <Image src={house.house_photos[0].photo} className="w-100 h-100 object-fit-cover rounded-2" alt="img1" />
                        )}
                    </Col>

                    <Col className="p-0 d-flex flex-column">
                        <Row className="g-0 gap-3 mb-3">
                            <Col className="p-0">
                                {loading ? (
                                    <Skeleton height='100%' width='100%' />
                                ) : (
                                    <Image src={house.house_photos[1].photo} className="w-100 h-100 object-fit-cover rounded-2" alt="img2" />
                                )}
                            </Col>
                            <Col className="p-0">
                                {loading ? (
                                    <Skeleton height={144} width='100%' />
                                ) : (
                                    <Card className="bg-dark text-white border-0 frame h-100" onClick={handleShow}>
                                        <Card.Img src={house.house_photos[2].photo} alt="img-bottom" className="w-100 h-100 object-fit-cover rounded-2" />
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
                                <Link to={`./model/${house.id}`}><Card className="bg-dark text-white border-0 frame">
                                    <Card.Img src={house.house_photos[0].photo} alt="img-bottom" className="w-100 h-100 object-fit-cover rounded-2" />
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
                            {house.title}
                        </div>
                        <div className='fs-3 mt-2 fw-semibold'>
                            Rp {Number(house.price).toLocaleString('id-ID')}
                        </div>
                        <div className='fs-7 mt-2'>
                            {house.address.subdistrict}, {house.address.city}
                        </div>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <div className="fw-bold mb-2 fs-5 p-0" data-aos="fade-up" data-aos-duration="800">
                        DESKRIPSI
                    </div>
                    <Col xs={8} className="p-0" data-aos="fade-up" data-aos-duration="800">
                        <div>
                            {house.description}
                        </div>
                        <Row className='mt-4'>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <div className="fw-bold mb-2 fs-5">
                                    INFORMASI LAINNYA
                                </div>
                                <div>
                                    {house.house_facilities.map((item, index) => (
                                        <Row className='mb-2' key={index}>
                                            <Col className=''>{item.facility.name}</Col>
                                            <Col className='' xs={1}>:</Col>
                                            <Col className='p-0'>{item.quantity}</Col>
                                        </Row>
                                    ))}
                                    <Row className='mb-2'>
                                        <Col className=''>Luas Bangunan</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>{house.building_area} m<sup>2</sup></Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>Luas Tanah</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>{house.land_area} m<sup>2</sup></Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <div className="fw-bold mb-2 fs-5">
                                    SERTIFIKAT HAK ATAS TANAH
                                </div>
                                <div>
                                    <div className="mb-2">
                                        Jenis Sertifikat: <span>{house.certificate.certificate_type.type}</span>
                                    </div>
                                </div>
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    INFORMASI HASIL SURVEY
                                </div>
                                <div>
                                    <Link target='_blank' to={house.house_survey.notes_file} className='text-decoration-none text-black'><FaRegFile /> <span className='ms-2'>{house.house_survey.notes_file}</span></Link>
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
                                <Link target='_blank' to={house.link_maps} className='fs-7 btn-visit fw-semibold'>Kunjungi</Link>
                                {house.embed_maps}
                            </Col>
                        </Row>
                        <Row>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <iframe className='rounded-2'
                                    src={house.embed_maps}
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
                                <FaRegUser />
                                {/* <Image src='/userphoto/user.jpg' /> */}
                            </div>
                            <div className='mb-1'>{house.user.username}</div>
                            <div className='mb-4'>{house.user.email}</div>
                            <Link
                                className='btn-wa fs-4 fw-semibold text-decoration-none'
                                to={`https://wa.me/62${house.no_telp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp />
                            </Link>
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
                            {house.house_photos.map((item, index) => (
                                <SplideSlide className="h-100">
                                    <Image src={item.photo} className="w-100" alt="img1" />
                                </SplideSlide>
                            ))}
                        </Splide>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    )
}
