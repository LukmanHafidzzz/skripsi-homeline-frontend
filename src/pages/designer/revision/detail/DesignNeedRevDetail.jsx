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
    const [file, setFile] = useState(null);
    const [floorPlan, setFloorPlan] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);


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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadProgress(0);
    };

    const handleFloorPlanChange = (e) => {
        setFloorPlan(e.target.files[0]);
    };

    const isFormValid = file || floorPlan;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file && !floorPlan) {
            Swal.fire('Warning', 'Minimal isi salah satu file.', 'warning');
            return;
        }

        const maxSize = 50 * 1024 * 1024;

        if (file) {
            if (!file.name.endsWith('.glb')) {
                Swal.fire('Error', 'File 3D harus format .glb', 'error');
                return;
            }

            if (file.size > maxSize) {
                Swal.fire('Error', 'File 3D terlalu besar (maks 50MB)', 'error');
                return;
            }
        }

        if (floorPlan && floorPlan.size > maxSize) {
            Swal.fire('Error', 'Floor plan terlalu besar (maks 50MB)', 'error');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {

            let fileUrl = null;
            let fileName = null;

            if (file) {

                const contentType = file.type || 'application/octet-stream';

                const presignedResponse = await axios.post(
                    'http://localhost:5773/api/designer/get-presigned-url',
                    {
                        fileName: file.name,
                        contentType
                    },
                    { withCredentials: true }
                );

                const { presignedUrl, fileUrl: s3Url, fileName: s3Name } = presignedResponse.data;

                const progressInterval = setInterval(() => {
                    setUploadProgress(prev => (prev < 90 ? prev + 10 : prev));
                }, 200);

                const uploadResponse = await fetch(presignedUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': contentType },
                    body: file
                });

                clearInterval(progressInterval);
                setUploadProgress(100);

                if (!uploadResponse.ok) {
                    throw new Error('Upload S3 gagal');
                }

                fileUrl = s3Url;
                fileName = s3Name;
            }
            
            const formData = new FormData();

            formData.append("house_id", house.id);

            if (fileUrl && fileName) {
                formData.append("fileUrl", fileUrl);
                formData.append("fileName", fileName);
            }

            if (floorPlan) {
                formData.append("floor_plan", floorPlan);
            }

            const response = await axios.put(
                'http://localhost:5773/api/designer/rev-house-design',
                formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            Swal.fire('Sukses', response.data.message, 'success')
                .then(() => navigate('/designer/input-house-model'));

            setFile(null);
            setFloorPlan(null);

        } catch (error) {

            console.error(error);

            let message = 'Gagal upload revisi';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            Swal.fire('Error', message, 'error');

        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    if (!house) return <div>Loading...</div>;

    const designStatus = house?.house_process?.design_status_input;

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
                        <div className=''>
                            <div className="fw-bold mb-2 fs-5 p-0">
                                FLOOR PLAN
                            </div>
                            <div className="mb-4">
                                <Link
                                    target='_blank'
                                    to={house.house_design.floor_plan}
                                    className='text-decoration-none'
                                >
                                    <span className="">{house.house_design.floor_plan}</span>
                                </Link>
                            </div>
                            <div className="fw-bold mb-2 fs-5 p-0">
                                HASIL DESIGN 3D
                            </div>
                            <div className="mb-5">
                                <Link
                                    to={`./model/${house.id}`}
                                    className='text-decoration-none'
                                >
                                    <span>{house.house_design.design_file}</span>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4" data-aos="fade-up" data-aos-duration="800">
                    <Col className='p-0 pe-2'>
                        <div className="fw-bold fs-3 mb-3">REVISI</div>
                        <Form onSubmit={handleSubmit}>
                            <div className=''>
                                <div className="fw-bold mb-2 fs-5 p-0">
                                    INPUT REVISI FLOOR PLAN
                                </div>
                                <Form.Group controlId="formFileFloorPlan" className="mb-4">
                                    <Form.Control
                                        type="file"
                                        onChange={handleFloorPlanChange}
                                        disabled={uploading}
                                        accept=".png, .jpg, .jpeg, .webp, image/png, image/jpeg, image/webp"
                                    />
                                </Form.Group>
                                <div className="fw-bold mb-2 fs-5 p-0">
                                    INPUT HASIL DESIGN 3D
                                </div>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={handleFileChange}
                                        disabled={uploading}
                                        accept=".glb"
                                    />
                                </Form.Group>
                                {uploading && file && (
                                    <div className="progress mb-3">
                                        <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            style={{ width: `${uploadProgress}%` }}
                                        >
                                            {uploadProgress}%
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4 d-flex justify-content-end align-items-center">
                                    <Button
                                        type='submit'
                                        variant="success"
                                        className='fw-semibold px-5 py-2'
                                        disabled={uploading || !isFormValid}
                                    >
                                        {uploading ? 'Uploading...' : 'Input'}
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
