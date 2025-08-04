import React, { useState, useEffect, lazy, Suspense } from 'react'
const NavbarHomeUser = lazy(() => import('../../../components/navbar-home-user/NavbarHomeUser.jsx'));
const FooterGeneral = lazy(() => import('../../../components/footer-general/FooterGeneral.jsx'));
import { Container, Row, Col, InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom'
import './style.css'

export default function MainLayout() {
    const [selected, setSelected] = useState('Terbaru');
    const handleSelect = (value) => {
        setSelected(value);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <NavbarHomeUser />
            </Suspense>
            <Container fluid className="mt-21 px-4">
                <Row>
                    <Col xs={3} className="">
                        <div className='fw-bold fs-5 mb-3'>Filter</div>
                        <Container className="border p-4 rounded-2 mb-4 box-filter">
                            <div className='fw-bold mb-3'>Harga</div>
                            <div className="d-flex flex-column gap-2 mb-4">
                                <InputGroup className="">
                                    <InputGroup.Text id="basic-addon1">Rp</InputGroup.Text>
                                    <Form.Control placeholder="Harga minimum" aria-label="" aria-describedby="basic-addon1" className="form-maxmin" />
                                </InputGroup>
                                <InputGroup className="">
                                    <InputGroup.Text id="basic-addon2">Rp</InputGroup.Text>
                                    <Form.Control placeholder="Harga maksimum" aria-label="" aria-describedby="basic-addon2" className="form-maxmin" />
                                </InputGroup>
                            </div>
                        </Container>
                        <Container className="border p-3 rounded-2 box-filter">
                            <div className='fw-bold mb-3'>Lokasi</div>
                            <div className="d-flex flex-column gap-2 mb-4 loc-container">
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='DKI Jakarta' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Bandung' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='DI Yogyakarta' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Surabaya' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Semarang' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Medan' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Makassar' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Palembang' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Batam' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Malang' />
                                <Form.Check className='checkbox-ellipsis' type='checkbox' id='' label='Bali' />
                            </div>
                        </Container>
                    </Col>
                    <Col xs={9} className="">
                        <div className='fs-4 mb-2'>
                            Cari rumah sesuai lokasi, harga, dan kebutuhan Anda di sini!
                        </div>
                        {loading ? (
                            <>
                                {/* Skeletons for search bar and sorting */}
                                <div className='mb-3'>
                                    <Skeleton height={50} width="100%" className="mb-3" />
                                    <div className='d-flex justify-content-end align-items-center text-black gap-3'>
                                        <Skeleton height={40} width={200} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='mb-3'>
                                    <Form.Control type="text" className='search-form rounded-5 p-3 mb-3' placeholder="Cari rumah..." />
                                    <div className='d-flex justify-content-end align-items-center text-black gap-3'>
                                        <div className='fw-semibold'>Urutkan:</div>
                                        <DropdownButton id="dropdown-basic-button" title={`${selected}`}>
                                            <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Harga Tertinggi')}>Harga Tertinggi</Dropdown.Item>
                                            <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Harga Terendah')}>Harga Terendah</Dropdown.Item>
                                            <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Terbaru')}>Terbaru</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>

            <Suspense fallback={<div>Loading...</div>}>
                <FooterGeneral />
            </Suspense>
        </>
    )
}
