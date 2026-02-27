import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row, Table, Modal, Form } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Skeleton from 'react-loading-skeleton';
import { FaRegFile } from 'react-icons/fa6';
import { FaRegMap } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function DesignInputDetail() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const handleRevision = async () => {
        if (!comment.trim()) {
            Swal.fire('Oops!', 'Komentar revisi wajib diisi', 'warning');
            return;
        }

        setButtonLoading(true);

        try {
            const res = await axios.patch(
                `http://localhost:5773/api/admin/design/revision/${id}`,
                { comment },
                { withCredentials: true }
            );

            Swal.fire(
                'Berhasil!',
                res.data.message,
                'success'
            ).then(() => {
                handleClose();
                navigate('/admin/design-input');
            });

        } catch (err) {
            Swal.fire(
                'Gagal!',
                err.response?.data?.message || 'Terjadi kesalahan',
                'error'
            );
        } finally {
            setButtonLoading(false);
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
                                <div className="fw-bold mb-2 fs-5 mt-4">
                                    Hasil Survey
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <Link
                                            className='text-decoration-none text-black'
                                            target='_blank'
                                            to={house.house_survey.photo_video_link}>
                                            {house.house_survey.photo_video_link}
                                        </Link>
                                    </div>
                                    <div className="mb-2">
                                        <Link target='_blank' to={house.house_survey.notes_file} className='text-decoration-none text-black'><FaRegFile /><span className='ms-2'>{house.house_survey.notes_file}</span></Link>
                                    </div>
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
                                        <Link target='_blank' to={house.certificate.certificate_file} className='text-decoration-none text-black'><FaRegFile /><span className='ms-2'>{house.certificate.certificate_file}</span></Link>
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
                <Row className="mt-5 mb-4" data-aos="fade-up" data-aos-duration="800">
                    <Col className="p-0">
                        <div className="fw-bold mb-2 fs-5">
                            HASIL INPUT DESAIN
                        </div>
                        <div>
                            <Table bordered>
                                <thead>
                                    <tr className='text-center'>
                                        <th className='custom-table-header'>Desain 3D</th>
                                        <th className='custom-table-header'>Floor Plan</th>
                                    </tr>
                                </thead>
                                <tbody className='align-middle'>
                                    <tr>
                                        <td>
                                            <Link to={`./model/${house.id}`} className='text-decoration-none'>
                                                {house.house_design.design_file}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={house.house_design.floor_plan} target='_blank' className='text-decoration-none'>
                                                {house.house_design.floor_plan}
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                {house.house_process.design_process === 'Desain Selesai' ? null : (
                    <div className="mb-4 gap-3 d-flex justify-content-end align-items-center">
                        <Button
                            variant="danger"
                            className='py-3 px-5'
                            onClick={handleShow}
                        >
                            Revisi
                        </Button>
                        <Button
                            variant="success"
                            className='py-3 px-4'
                            onClick={() => {
                                Swal.fire({
                                    title: 'Selesaikan Proses?',
                                    text: 'Apakah Anda yakin data yang diterima sudah benar?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#28a745',
                                    cancelButtonColor: '#6c757d',
                                    confirmButtonText: 'Selesai',
                                    cancelButtonText: 'Batal'
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        setButtonLoading(true);
                                        try {
                                            const res = await axios.patch(
                                                `http://localhost:5773/api/admin/design/design-input/${id}`,
                                                { withCredentials: true }
                                            );

                                            Swal.fire(
                                                'Diproses!',
                                                res.data.message || 'Desain selesai.',
                                                'success'
                                            ).then(() => {
                                                navigate('/admin/design-input');
                                            });

                                            setHouse((prev) => ({ ...prev, status: 'Desain Selesai' }));

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
                                'Tandai Selesai'
                            )}
                        </Button>
                    </div>
                )}
            </Container >

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Revisi Desain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="comment"
                        >
                            <Form.Label>Komentar Revisi</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className='px-4'
                        variant="primary"
                        onClick={handleRevision}
                    >
                        {buttonLoading ? (
                            <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                            'Simpan'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
