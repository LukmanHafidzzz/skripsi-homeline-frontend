import React, { useState, useEffect } from 'react'
import { Col, Container, Image, Row, Breadcrumb, Card, Button } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';
import { Link, useParams } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Skeleton from 'react-loading-skeleton';
import { FaRegFile } from 'react-icons/fa6';
import axios from 'axios';

export default function AdProcessDetail() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const { id } = useParams();
    const [house, setHouse] = useState(null);

    useEffect(() => {
        const fetchHouseDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5773/api/user/advertisement/detail/${id}`, {
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
                                {house.house_photos.map((item, index) => (
                                    <SplideSlide className="h-100" key={index}>
                                        <Image
                                            src={item.photo}
                                            className="img-fill rounded-2"
                                            fetchPriority="high"
                                            decoding="async"
                                        />
                                    </SplideSlide>
                                ))}
                            </Splide>
                        )}
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
                    <Col xs={11} className="p-0" data-aos="fade-up" data-aos-duration="800">
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
                                    ALAMAT
                                </div>
                                <div className="mb-2">
                                    {house.address.full_address}
                                </div>
                                <div>
                                    <Link target='_blank' to={house.link_maps} className='text-decoration-none text-black'>{house.link_maps}</Link>
                                </div>
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    HASIL SURVEY
                                </div>
                                <div>
                                    {house.house_survey?.notes_file ? (
                                        <>
                                            <Link
                                                target='_blank'
                                                to={house.house_survey.notes_file}
                                                className='text-decoration-none text-black'
                                            >
                                                <FaRegFile /> <span className="ms-2">{house.house_survey.notes_file}</span>
                                            </Link>
                                        </>
                                    ) : (
                                        <>-</>
                                    )}
                                </div>
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    HASIL DESIGN MODEL 3D
                                </div>
                                <div>
                                    {house.house_design?.design_file ? (
                                        <>
                                            <Link
                                                target='_blank'
                                                to={`./model/${house.id}`}
                                                className='text-decoration-none text-black'
                                            >
                                                <FaRegFile /> <span className="ms-2">{house.house_design.design_file}</span>
                                            </Link>
                                        </>
                                    ) : (
                                        <>-</>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    )
}
