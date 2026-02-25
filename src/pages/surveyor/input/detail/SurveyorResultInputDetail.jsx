import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Image, Row, Table } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Skeleton from 'react-loading-skeleton';
import { FaRegFile } from 'react-icons/fa6';
import { FaPlus, FaRegMap, FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function SurveyorResultInputDetail() {
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [generalFacilities, setGeneralFacilities] = useState([
        { name: "", latitude: "", longitude: "", maps: "" },
    ]);
    const [generalFacilityType, setGeneralFacilityType] = useState([]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newGeneralFacilities = [...generalFacilities];
        newGeneralFacilities[index][name] = value;
        setGeneralFacilities(newGeneralFacilities);
    };

    const handleAdd = () => {
        setGeneralFacilities([...generalFacilities, { name: "", latitude: "", longitude: "", maps: "" }]);
    };

    const handleRemove = (index) => {
        if (generalFacilities.length === 1) return;

        const newGeneralFacilities = generalFacilities.filter(
            (_, i) => i !== index
        );
        setGeneralFacilities(newGeneralFacilities);
    };

    useEffect(() => {
        const fetchGeneralFacilityTypes = async () => {
            try {
                const response = await axios.get('https://skripsi-homeline-backend.vercel.app/api/surveyor/general-facility-types');
                setGeneralFacilityType(response.data);
            } catch (error) {
                console.error('Error fetching general facility types:', error);
            }
        };

        fetchGeneralFacilityTypes();
    }, []);

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

    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonLoading(true);

        if (!file) return;

        const formData = new FormData();
        formData.append('notes_file', file);
        formData.append('photo_video_link', link);
        formData.append('house_id', house.id);
        formData.append('general_facilities', JSON.stringify(generalFacilities));
        try {
            const res = await axios.post('https://skripsi-homeline-backend.vercel.app/api/surveyor/input-house-survey', formData, {
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
                navigate('/surveyor/input-house-survey');
            });
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Gagal upload', 'error');
        } finally {
            setButtonLoading(false);
        };
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
                                        <Link target='_blank' to={house.link_maps} className='text-decoration-none text-black'><FaRegMap /><span className='ms-2'>{house.link_maps}</span></Link>
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
                <Form onSubmit={handleSubmit} data-aos="fade-up" data-aos-duration="800">
                    <Row className="mt-4">
                        <Col xs={5} className='p-0 pe-4'>
                            <div className=''>
                                <div className="fw-bold mb-2 fs-5 p-0">
                                    {house.house_survey
                                        ? 'FILE HASIL SURVEY'
                                        : 'INPUT FILE HASIL SURVEY'}
                                </div>
                                {house.house_survey ? (
                                    <Link
                                        target='_blank'
                                        to={house.house_survey.notes_file}
                                        className='text-decoration-none'
                                    >
                                        <span className="">{house.house_survey.notes_file}</span>
                                    </Link>
                                ) : (
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control type="file" onChange={handleFileChange} required />
                                    </Form.Group>
                                )}
                            </div>
                        </Col>
                        <Col className='p-0 px-2'>
                            <div className=''>
                                <div className="fw-bold mb-2 fs-5 p-0">
                                    {house.house_survey
                                        ? 'LINK DRIVE HASIL FOTO/VIDEO'
                                        : 'INPUT LINK DRIVE HASIL FOTO/VIDEO'}
                                </div>
                                {house.house_survey ? (
                                    <Link
                                        target='_blank'
                                        to={house.house_survey.photo_video_link}
                                        className='text-decoration-none'
                                    >
                                        <span className="">{house.house_survey.photo_video_link}</span>
                                    </Link>
                                ) : (
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control type="text" value={link} onChange={handleLinkChange} required />
                                    </Form.Group>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="p-0">
                            <div className="fw-bold mb-2 fs-5">
                                {house.house_survey
                                    ? 'FASILITAS UMUM SEKITAR'
                                    : 'INPUT FASILITAS UMUM SEKITAR'}
                            </div>
                        </Col>
                        {house.house_survey ? (
                            <Col xs={12} className="p-0">
                                <Table bordered>
                                    <thead>
                                        <tr className="text-center">
                                            <th>No</th>
                                            <th>Nama Fasilitas</th>
                                            <th>Tipe Fasilitas</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>Maps</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        {house.general_facilities.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{index + 1}.</td>
                                                <td>{item.name}</td>
                                                <td>{item.general_facility_type.type}</td>
                                                <td>{item.latitude}</td>
                                                <td>{item.longitude}</td>
                                                <td>
                                                    <Link
                                                        target="_blank"
                                                        to={item.maps}
                                                        className="text-decoration-none"
                                                    >
                                                        {item.maps}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        ) : (
                            <>
                                {generalFacilities.map((generalFacility, index) => (
                                    <Col key={index} xs={12} className="p-0">
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    placeholder="Nama fasilitas"
                                                    value={generalFacility.name}
                                                    onChange={(e) => handleChange(index, e)}
                                                    required
                                                />
                                            </Col>

                                            <Col>
                                                <Form.Select
                                                    name="type_id"
                                                    value={generalFacility.type_id || ""}
                                                    onChange={(e) => handleChange(index, e)}
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        Pilih Tipe Fasilitas
                                                    </option>
                                                    {generalFacilityType.map((type) => (
                                                        <option key={type.id} value={type.id}>
                                                            {type.type}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>

                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    name="latitude"
                                                    placeholder="Latitude"
                                                    value={generalFacility.latitude}
                                                    onChange={(e) => handleChange(index, e)}
                                                    required
                                                />
                                            </Col>

                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    name="longitude"
                                                    placeholder="Longitude"
                                                    value={generalFacility.longitude}
                                                    onChange={(e) => handleChange(index, e)}
                                                    required
                                                />
                                            </Col>

                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    name="maps"
                                                    placeholder="Link Google Maps"
                                                    value={generalFacility.maps}
                                                    onChange={(e) => handleChange(index, e)}
                                                    required
                                                />
                                            </Col>

                                            <Col xs="auto">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleRemove(index)}
                                                    disabled={generalFacilities.length === 1}
                                                    className="d-flex justify-content-center align-items-center"
                                                    style={{ height: 35 }}
                                                >
                                                    <FaMinus />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                ))}

                                <Col xs={12} className="p-0">
                                    <div className="mb-4 d-flex justify-content-start align-items-center">
                                        <Button
                                            variant="primary"
                                            onClick={handleAdd}
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ width: 40, height: 40 }}
                                        >
                                            <FaPlus />
                                        </Button>
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>
                    {house.house_survey ? (null) : (
                        <div className="mb-4 d-flex justify-content-end align-items-center">
                            <Button
                                type="submit"
                                variant="success"
                                className="fw-semibold px-5 py-2"
                                disabled={buttonLoading}
                            >
                                {buttonLoading ? (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    'Input'
                                )}
                            </Button>
                        </div>
                    )}
                </Form>
            </Container>
        </>
    )
}
