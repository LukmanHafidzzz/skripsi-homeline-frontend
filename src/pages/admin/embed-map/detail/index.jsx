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

export default function index() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [embedMap, setEmbedMap] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const { id } = useParams();
    const [house, setHouse] = useState(null);

    useEffect(() => {
        const fetchHouseDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5773/api/admin/house/detail/${id}`, {
                    withCredentials: true
                });
                setHouse(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHouseDetail();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!embedMap.trim()) {
            return Swal.fire("Gagal", "Embed map tidak boleh kosong.", "warning");
        }

        const formData = new FormData();
        formData.append("embed_maps", embedMap);

        try {
            const res = await axios.patch(
                `http://localhost:5773/api/admin/house/embed-maps/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            console.log('Success response:', res.data);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Embed map berhasil ditambahkan',
                confirmButtonColor: '#28a745',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                navigate('/admin/embed-maps');
            });

        } catch (err) {
            console.error('Error:', err.response || err);
            Swal.fire("Gagal!", err.response?.data?.message || "Terjadi kesalahan.", "error");
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
                                        <Image src={`/housephotos/${item.photo}`} className="img-fill rounded-2" />
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
                                    Sertifikat Hak Atas Tanah
                                </div>
                                <div>
                                    <div className="mb-2">
                                        Jenis Sertifikat: <span>{house.certificate.certificate_type.type}</span>
                                    </div>
                                    <div className="mb-2">
                                        <Link target='_blank' to={`/certificateFile/${house.certificate.certificate_file}`} className='text-decoration-none text-black'><FaRegFile /><span className='ms-2'>{house.certificate.certificate_file}</span></Link>
                                    </div>
                                </div>
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    Lokasi
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <Link target='_blank' to={house.link_maps} className='text-decoration-none text-black'><FaRegMap /> <span className='ms-2'>{house.link_maps}</span></Link>
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
                <Row className="mt-5 mb-4">
                    <Col className='p-0'>
                        <div className=''>
                            <div className="fw-bold mb-2 fs-5 p-0">
                                INPUT EMBED MAPS
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control
                                        className='form-add-textarea'
                                        as="textarea"
                                        placeholder='Masukkan embed map'
                                        rows={3}
                                        value={embedMap}
                                        onChange={(e) => setEmbedMap(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-end align-items-center">
                                    <Button variant="success" className='fw-semibold px-5 py-2' type='submit'>
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
