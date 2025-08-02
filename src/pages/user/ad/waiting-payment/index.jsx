import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Image, Modal } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';
import { MdOutlineQrCode2, MdOutlineRemoveRedEye } from 'react-icons/md';

import { Link } from 'react-router-dom';

export default function index() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedQR, setSelectedQR] = useState(null);

    const handleShowQR = (qr) => {
        setSelectedQR(qr);
        setShow(true);
    };

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('http://localhost:5773/api/user/advertisement/waiting-payment', {
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
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Harga</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {houses.map((house, index) => (
                        <tr key={house.id}>
                            <td className='text-center'>{index + 1}.</td>
                            <td>{house.title}</td>
                            <td className='text-end'>{Number(house.price).toLocaleString('id-ID')}</td>
                            <td className='text-center'>{house.status}</td>
                            <td className="align-middle">
                                <div className="d-flex justify-content-center gap-3">
                                    <Link to={`./detail/${house.id}`} className='text-decoration-none'><Button className="d-flex align-items-center gap-1" variant="outline-success">
                                        <MdOutlineRemoveRedEye /> view
                                    </Button></Link>
                                    <Button className="d-flex align-items-center gap-1" variant="outline-primary" onClick={() => handleShowQR(house.payments?.[0]?.qr)}>
                                        <MdOutlineQrCode2 /> show QR
                                    </Button>
                                </div>
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
