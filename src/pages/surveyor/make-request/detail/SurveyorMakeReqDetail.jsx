import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row, Table } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Skeleton from 'react-loading-skeleton';
import { FaRegFile } from 'react-icons/fa6';
import { FaRegMap } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function SurveyorMakeReqDetail() {
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
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
                const res = await axios.get(`https://skripsi-homeline-backend.vercel.app/api/surveyor/house-detail/${id}`, {
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
                                    <div>
                                        <div className="mb-2">
                                            Jenis Sertifikat: <span>{house.certificate.certificate_type.type}</span>
                                        </div>
                                        <div className="mb-2">
                                            <Link target='_blank' to={house.certificate.certificate_file} className='text-decoration-none text-black'><FaRegFile /><span className='ms-2'>{house.certificate.certificate_file}</span></Link>
                                        </div>
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
                <Row className="mt-5 mb-4" data-aos="fade-up" data-aos-duration="800">
                    <Col className="p-0">
                        <div className="fw-bold mb-2 fs-5">
                            PENGAJUAN REQUEST
                        </div>
                        <div>
                            <Table bordered>
                                <thead>
                                    <tr className='text-center'>
                                        <th className='custom-table-header'>Status Saat Ini</th>
                                        <th className='custom-table-header'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='align-middle'>
                                    <tr>
                                        <td>{house.house_process.survey_process}</td>
                                        <td className="align-middle">
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    variant="success"
                                                    className='py-2 px-4'
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: 'Lanjutkan?',
                                                            text: 'Apakah Anda yakin ingin mengajukan survey?',
                                                            icon: 'question',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#28a745',
                                                            cancelButtonColor: '#6c757d',
                                                            confirmButtonText: 'Ya!',
                                                            cancelButtonText: 'Batal'
                                                        }).then(async (result) => {
                                                            setButtonLoading(true);
                                                            if (result.isConfirmed) {
                                                                try {
                                                                    const res = await axios.post('https://skripsi-homeline-backend.vercel.app/api/surveyor/make-request', {
                                                                        house_id: house.id
                                                                    }, {
                                                                        withCredentials: true,
                                                                    });
                                                                    Swal.fire(
                                                                        'Pengajuan berhasil dibuat!',
                                                                        '',
                                                                        'success'
                                                                    ).then(() => {
                                                                        navigate('/surveyor/make-request');
                                                                    });
                                                                } catch (err) {
                                                                    Swal.fire(
                                                                        'Gagal!',
                                                                        err.response?.data?.message || 'Terjadi kesalahan.',
                                                                        'error'
                                                                    );
                                                                } finally {
                                                                    setButtonLoading(false);
                                                                }
                                                            }
                                                        })
                                                    }}
                                                >
                                                    {buttonLoading ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        'Ajukan Survey'
                                                    )}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container >
        </>
    )
}
