import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'

import './style.css'

export default function index() {
    return (
        <>
            <Container className=''>
                <Form>
                    <Row className='mb-4'>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Judul Iklan <span className='text-danger'>*</span></Form.Label>
                                <Form.Control className='form-add' type="text" placeholder="Masukkan judul iklan" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Harga <span className='text-danger'>*</span></Form.Label>
                            <InputGroup className="">
                                <InputGroup.Text id="">Rp</InputGroup.Text>
                                <Form.Control placeholder="Masukkan harga" aria-label="" aria-describedby="basic-addon1" className="form-add-group" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Nomor Whatsapp <span className='text-danger'>*</span></Form.Label>
                            <InputGroup className="">
                                <InputGroup.Text id="">+62</InputGroup.Text>
                                <Form.Control placeholder="Contoh: 8xxxxxxxxxxx" aria-label="" aria-describedby="basic-addon1" className="form-add-group" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label className='fw-semibold mb-2'>Deskripsi <span className='text-danger'>*</span></Form.Label>
                                <Form.Control className='form-add-textarea' as="textarea" rows={3} placeholder='Masukkan deskripsi' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-4 row-cols-3 g-4'>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Provinsi <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add'>
                                <option disabled selected>Pilih Provinsi</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Kota <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add'>
                                <option disabled selected>Pilih Kota</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Kecamatan <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add'>
                                <option disabled selected>Pilih Kecamatan</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Kelurahan <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add'>
                                <option disabled selected>Pilih Kelurahan</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Link maps <span className='text-danger'>*</span></Form.Label>
                                <Form.Control className='form-add' type="text" placeholder="Masukkan link maps" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Alamat Lengkap <span className='text-danger'>*</span></Form.Label>
                                <Form.Control className='form-add' type="text" placeholder="Masukkan alamat provinsi dan seterusnya" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Foto Rumah <span className='text-danger'>*</span></Form.Label>
                                <Form.Control className='form-add' type="file" multiple />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Sertifikat Hak Atas Tanah (PDF) <span className='text-danger'>*</span></Form.Label>
                                <Form.Control className='form-add' type="file" multiple accept='application/pdf' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Jenis Sertifikat <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add'>
                                <option disabled selected>Pilih Jenis Sertifikat</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <div className="fs-5 fw-bold text-center mb-3">
                        Fasilitas
                    </div>
                    <Row className="row-cols-3 g-4 mb-5">
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Kamar Mandi <span className='text-danger'>*</span></Form.Label>
                                <Form.Control className='form-add' type="number" placeholder="Masukkan jumlah" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Kamar Tidur <span className='text-danger'>*</span></Form.Label>
                                <Form.Control className='form-add' type="number" placeholder="Masukkan jumlah" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Garasi</Form.Label>
                                <Form.Control className='form-add' type="number" placeholder="Masukkan jumlah" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Ruang Keluarga</Form.Label>
                                <Form.Control className='form-add' type="number" placeholder="Masukkan jumlah" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Ruang Tamu</Form.Label>
                                <Form.Control className='form-add' type="number" placeholder="Masukkan jumlah" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Dapur</Form.Label>
                                <Form.Control className='form-add' type="number" placeholder="Masukkan jumlah" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Gudang</Form.Label>
                                <Form.Control className='form-add' type="number" placeholder="Masukkan jumlah" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Ruang Makan</Form.Label>
                                <Form.Control className='form-add' type="number" placeholder="Masukkan jumlah" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className='mb-3'>
                        Note: tanda (<span className='text-danger'>*</span>) wajib diisi
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" className='btn-input fw-semibold'>
                            Input
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}
