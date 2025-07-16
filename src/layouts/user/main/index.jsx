import React, {useState} from 'react'
import NavbarHomeUser from '../../../components/navbar-home-user/index'
import Landingpage from '../../../pages/user/landingpage/index'

import { Container, Row, Col, InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap'

import './style.css'

export default function index() {
    const [selected, setSelected] = useState('Terbaru');

    const handleSelect = (value) => {
        setSelected(value);
    };

    return (
        <>
            <NavbarHomeUser />
            <Container fluid className="mt-5 px-4">
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
                                <Form.Check type='checkbox' id='' label='DKI Jakarta' />
                                <Form.Check type='checkbox' id='' label='Bandung' />
                                <Form.Check type='checkbox' id='' label='DI Yogyakarta' />
                                <Form.Check type='checkbox' id='' label='Surabaya' />
                                <Form.Check type='checkbox' id='' label='Semarang' />
                                <Form.Check type='checkbox' id='' label='Medan' />
                                <Form.Check type='checkbox' id='' label='Makassar' />
                                <Form.Check type='checkbox' id='' label='Palembang' />
                                <Form.Check type='checkbox' id='' label='Batam' />
                                <Form.Check type='checkbox' id='' label='Malang' />
                                <Form.Check type='checkbox' id='' label='Bali' />
                            </div>
                        </Container>
                    </Col>
                    <Col xs={9} className="">
                        <div className='fs-4 mb-2'>Cari rumah sesuai lokasi, harga, dan kebutuhan Anda di sini!</div>
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
                        <div>
                            <Landingpage />
                        </div>
                    </Col>
                </Row>
            </Container>

            Nanti ada footer
        </>
    )
}
