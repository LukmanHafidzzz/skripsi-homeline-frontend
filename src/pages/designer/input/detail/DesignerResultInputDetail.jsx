import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Skeleton from 'react-loading-skeleton';
import { FaRegFile } from 'react-icons/fa6';
import { FaRegMap } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import { RiDriveLine } from 'react-icons/ri';

export default function DesignerResultInputDetail() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const { id } = useParams();
    const [house, setHouse] = useState(null);

    useEffect(() => {
        const fetchHouseDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5773/api/designer/house-detail/${id}`, {
                    withCredentials: true
                });
                setHouse(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHouseDetail();
    }, [id]);

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append('design_file', file);
        formData.append('house_id', house.id);

        try {
            const res = await axios.post('http://localhost:5773/api/designer/input-house-model', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire(
                'Sukses',
                res.data.message,
                'success'
            ).then(() => {
                navigate('/designer/input-house-model');
            });
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Gagal upload', 'error');
        }
    };

    if (!house) return <div>Loading...</div>;

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
                                {house.house_photos.map((item, index) => (
                                    <SplideSlide className="h-100" key={index}>
                                        <Image src={item.photo} className="img-fill rounded-2" />
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
                    <Col className="p-0" data-aos="fade-up" data-aos-duration="800">
                        <div>
                            {house.description}
                        </div>
                        <Row className='mt-4'>
                            <Col xs={5} data-aos="fade-up" data-aos-duration="800">
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
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    Alamat Lengkap
                                </div>
                                <div>
                                    {house.address.full_address}
                                </div>
                            </Col>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <div className="fw-bold mb-2 fs-5">
                                    Hasil Survey
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <Link
                                            target='_blank'
                                            to={house.house_survey.notes_file}
                                            className='text-decoration-none text-black'
                                        >
                                            <FaRegFile /> <span className="ms-2">{house.house_survey.notes_file}</span>
                                        </Link>
                                    </div>
                                    <div className="mb-2">
                                        <Link
                                            target='_blank'
                                            to={house.house_survey.photo_video_link}
                                            className='text-decoration-none text-black'
                                        >
                                            <RiDriveLine /> <span className="ms-2">Link dokumentasi</span>
                                        </Link>
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
                                        <Col className='p-0'>{house.user.username}</Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>Email</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>{house.user.email}</Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className=''>No. Whatsapp</Col>
                                        <Col className='' xs={1}>:</Col>
                                        <Col className='p-0'>+62{house.no_telp}</Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className='p-0 pe-2'>
                        <Form onSubmit={handleSubmit}>
                            <div className=''>
                                <div className="fw-bold mb-2 fs-5 p-0">
                                    INPUT FILE HASIL DESIGN
                                </div>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" onChange={handleFileChange} />
                                </Form.Group>
                                <div className="mb-4 d-flex justify-content-end align-items-center">
                                    <Button type='submit' variant="success" className='fw-semibold px-5 py-2'>
                                        Input
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    )
}
