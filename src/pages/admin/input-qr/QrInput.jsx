import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button, Modal, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineQrCode2, MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function QrInput() {
    const [show, setShow] = useState(false);
    const [selectedQR, setSelectedQR] = useState(null);
    const [selected, setSelected] = useState('Semua');
    const [houses, setHouses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShowQR = (qr) => {
        setSelectedQR(qr);
        setShow(true);
    };
    const handleSelect = (value) => {
        setSelected(value);
    };

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('https://skripsi-homeline-backend.vercel.app/api/admin/house/input-qr', {
                    withCredentials: true
                });
                setHouses(res.data);
                setFilteredHouses(res.data);
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHouses();
    }, []);

    useEffect(() => {
        let filtered = [...houses];

        if (selected === 'Butuh QR') {
            filtered = filtered.filter(h => !h.payments?.[0]?.qr);
        } else if (selected === 'Sudah Input') {
            filtered = filtered.filter(h => h.payments?.[0]?.qr);
        }

        if (searchTerm) {
            filtered = filtered.filter(house =>
                house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                house.id.toString().includes(searchTerm)
            );
        }

        setFilteredHouses(filtered);
    }, [searchTerm, selected, houses]);

    if (loading) {
        return <div className="mt-5 pt-5 text-center">Loading...</div>;
    }

    return (
        <>
            <div className='mb-3'>
                <Form.Control type="text"
                    className='search-form rounded-5 p-3 mb-3'
                    placeholder="Cari rumah..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                    {filteredHouses.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                {houses.length === 0
                                    ? "Tidak ada data rumah..."
                                    : "Tidak ada data rumah yang cocok.."}
                            </td>
                        </tr>
                    ) : (
                        filteredHouses.map((house, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}.</td>
                                <td>{house.id}</td>
                                <td>{house.title}</td>
                                <td className='text-end'>{Number(house.price).toLocaleString('id-ID')}</td>
                                <td className="d-flex align-items-center justify-content-center">
                                    {house.payments?.[0]?.qr ? (
                                        <Button
                                            className="d-flex align-items-center"
                                            variant="outline-primary"
                                            onClick={() => handleShowQR(house.payments?.[0]?.qr)}
                                        >
                                            <MdOutlineQrCode2 /> show QR
                                        </Button>
                                    ) : (
                                        <Link to={`./detail/${house.id}`} className='text-decoration-none'>
                                            <Button className="d-flex align-items-center gap-1" variant="outline-success">
                                                <MdOutlineRemoveRedEye /> view
                                            </Button>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} centered contentClassName="p-0 border-0 bg-transparent">
                <Modal.Body className="p-0 position-relative d-flex justify-content-center align-items-center">
                    {selectedQR && (
                        <Image src={selectedQR} className="w-50 rounded" />
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
