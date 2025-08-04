import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';

import { Link, useParams, useNavigate } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import Skeleton from 'react-loading-skeleton';
import { FaRegFile } from 'react-icons/fa6';
import { FaRegMap } from 'react-icons/fa';

import Swal from 'sweetalert2';
import axios from 'axios';

export default function CheckingAwalDetail() {
    const [loading, setLoading] = useState(true);
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
                        <div className='d-flex justify-content-end align-items-center gap-3'>
                            <div>
                                <Button
                                    variant="danger"
                                    className='p-3'
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'Apakah Anda yakin?',
                                            text: 'Anda akan menolak pengajuan ini.',
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#d33',
                                            cancelButtonColor: '#3085d6',
                                            confirmButtonText: 'Tolak!',
                                            cancelButtonText: 'Batal'
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                try {
                                                    const res = await axios.patch(
                                                        `http://localhost:5773/api/admin/house/pending-to-reject/${id}`,
                                                        { withCredentials: true }
                                                    );

                                                    Swal.fire(
                                                        'Ditolak!',
                                                        res.data.message || 'Pengajuan telah ditolak.',
                                                        'success'
                                                    ).then(() => {
                                                        navigate('/admin/checking');
                                                    });

                                                    setHouse((prev) => ({ ...prev, status: 'Offering 3D' }));

                                                } catch (err) {
                                                    Swal.fire(
                                                        'Gagal!',
                                                        err.response?.data?.message || 'Terjadi kesalahan.',
                                                        'error'
                                                    );
                                                }
                                            }
                                        })
                                    }}
                                >
                                    Tolak Pengajuan
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="success"
                                    className='p-3'
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'Lanjutkan Proses?',
                                            text: 'Apakah Anda yakin ingin melanjutkan proses pengajuan ini?',
                                            icon: 'question',
                                            showCancelButton: true,
                                            confirmButtonColor: '#28a745',
                                            cancelButtonColor: '#6c757d',
                                            confirmButtonText: 'Lanjutkan',
                                            cancelButtonText: 'Batal'
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                try {
                                                    const res = await axios.patch(
                                                        `http://localhost:5773/api/admin/house/pending-to-offer/${id}`,
                                                        { withCredentials: true }
                                                    );

                                                    Swal.fire(
                                                        'Diproses!',
                                                        res.data.message || 'Pengajuan telah dilanjutkan.',
                                                        'success'
                                                    ).then(() => {
                                                        navigate('/admin/checking');
                                                    });

                                                    setHouse((prev) => ({ ...prev, status: 'Offering 3D' }));

                                                } catch (err) {
                                                    Swal.fire(
                                                        'Gagal!',
                                                        err.response?.data?.message || 'Terjadi kesalahan.',
                                                        'error'
                                                    );
                                                }
                                            }
                                        })
                                    }}
                                >
                                    Lanjutkan Proses
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        </>
    )
}
