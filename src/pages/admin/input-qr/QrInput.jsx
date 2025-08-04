import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button, Modal, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineQrCode2, MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function QrInput() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [selectedQR, setSelectedQR] = useState(null);

    const handleShowQR = (qr) => {
        setSelectedQR(qr);
        setShow(true);
    };

    const [selected, setSelected] = useState('Semua');

    const handleSelect = (value) => {
        setSelected(value);
    };

    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('http://localhost:5773/api/admin/house/input-qr', {
                    withCredentials: true
                });
                setHouses(res.data);
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHouses();
    }, []);

    if (loading) {
        return <div className="mt-5 pt-5 text-center">Loading...</div>;
    };

    if (houses.length === 0) {
        return (
            <div className="mt-5 pt-5 text-center">
                Tidak ada data rumah...
            </div>
        );
    };

    return (
        <>
            <div className='mb-3'>
                <Form.Control type="text" className='search-form rounded-5 p-3 mb-3' placeholder="Cari rumah..." />
                <div className='d-flex align-items-center text-black gap-3'>
                    <div className='fw-semibold'>Status:</div>
                    <DropdownButton id="dropdown-basic-button" title={`${selected}`}>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Semua')}>Semua</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Butuh QR')}>Butuh QR</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Sudah Input')}>Sudah Input</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div >

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>ID</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Harga Rumah</th>
                        <th className='custom-table-header'>Action</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {houses.map((house, index) => (
                        <tr key={index}>
                            <td className='text-center'>{index + 1}.</td>
                            <td>{house.id}</td>
                            <td>{house.title}</td>
                            <td className='text-end'>{Number(house.price).toLocaleString('id-ID')}</td>
                            <td className="d-flex align-items-center justify-content-center">
                                {house.payments?.[0]?.qr ? (
                                    <>
                                        <Button className="d-flex align-items-center" variant="outline-primary" onClick={() => handleShowQR(house.payments?.[0]?.qr)}>
                                            <MdOutlineQrCode2 /> show QR
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`./detail/${house.id}`} className='text-decoration-none'>
                                                <Button className="d-flex align-items-center gap-1" variant="outline-success">
                                                    <MdOutlineRemoveRedEye /> view
                                                </Button>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} centered contentClassName="p-0 border-0 bg-transparent">
                <Modal.Body className="p-0 position-relative d-flex justify-content-center align-items-center">
                    {selectedQR && (
                        <Image src={`/qris/${selectedQR}`} className="w-50 rounded" />
                    )}

                    <Button
                        variant="light"
                        onClick={handleClose}
                        className="position-absolute"
                        style={{ top: '10px', right: '10px', borderRadius: '50%' }}
                    >
                        ✕
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
