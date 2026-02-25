import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import './style.css'
import '@splidejs/react-splide/css';
import { Link, useParams } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Skeleton from 'react-loading-skeleton';
import { FaRegFile } from 'react-icons/fa6';
import { FaRegMap } from 'react-icons/fa';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet.awesome-markers";
import L from 'leaflet';

const homeIcon = L.AwesomeMarkers.icon({
    icon: 'house',
    markerColor: 'red',
    prefix: 'fa',
});

const schoolIcon = L.AwesomeMarkers.icon({
    icon: 'graduation-cap',
    markerColor: 'blue',
    prefix: 'fa',
});

const healthFacilitiesIcon = L.AwesomeMarkers.icon({
    icon: 'hospital',
    markerColor: 'green',
    prefix: 'fa',
});

const supermarketIcon = L.AwesomeMarkers.icon({
    icon: 'shopping-cart',
    markerColor: 'orange',
    prefix: 'fa',
});

const worshipPlaceIcon = L.AwesomeMarkers.icon({
    icon: 'place-of-worship',
    markerColor: 'purple',
    prefix: 'fa',
});

export default function HouseListDetail() {
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
                const res = await axios.get(`https://skripsi-homeline-backend.vercel.app/api/admin/house/detail/${id}`, {
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

                <Row className='mt-5 mb-4'>
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
                        <Row className='my-4'>
                            <Col data-aos="fade-up" data-aos-duration="800">
                                <div className="fw-bold mb-2 fs-5">
                                    MAPS
                                </div>
                                <div>
                                    {house.latitude && house.longitude ? (
                                        <>
                                            <MapContainer
                                                center={{ lat: parseFloat(house.latitude), lng: parseFloat(house.longitude) }}
                                                zoom={15}
                                                style={{ height: "500px", width: "100%" }}
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />

                                                <Circle center={{ lat: parseFloat(house.latitude), lng: parseFloat(house.longitude) }} radius={1500} color="blue" />
                                                <Marker position={{ lat: parseFloat(house.latitude), lng: parseFloat(house.longitude) }} icon={homeIcon}>
                                                    <Popup>
                                                        <div>{house.title}</div>
                                                        <a href={house.link_maps} target="_blank" rel="noopener noreferrer">
                                                            Lihat di Google Maps
                                                        </a>
                                                    </Popup>
                                                </Marker>

                                                {house.general_facilities?.map((facility, idx) => {
                                                    let icon = null;

                                                    switch (facility.general_facility_type.type.toLowerCase()) {
                                                        case "school":
                                                            icon = schoolIcon;
                                                            break;
                                                        case "health":
                                                            icon = healthFacilitiesIcon;
                                                            break;
                                                        case "supermarket":
                                                            icon = supermarketIcon;
                                                            break;
                                                        case "religious":
                                                            icon = worshipPlaceIcon;
                                                            break;
                                                        default:
                                                            icon = schoolIcon;
                                                    }

                                                    return (
                                                        <Marker
                                                            key={idx}
                                                            position={{ lat: parseFloat(facility.latitude), lng: parseFloat(facility.longitude) }}
                                                            icon={icon}
                                                        >
                                                            <Popup>
                                                                <div>{facility.name}</div>
                                                                <a href={facility.maps} target="_blank" rel="noopener noreferrer">
                                                                    Lihat di Google Maps
                                                                </a>
                                                            </Popup>
                                                        </Marker>
                                                    );
                                                })}
                                            </MapContainer>
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
