import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function PaymentConfirm() {
    const [houses, setHouses] = useState([]);
    const [selected, setSelected] = useState('Semua');
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get(
                    'https://skripsi-homeline-backend.vercel.app/api/admin/house/payment-confirm',
                    { withCredentials: true }
                );
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

    const handleSelect = (value) => {
        setSelected(value);
    };

    useEffect(() => {
        let filtered = [...houses];
        if (selected !== 'Semua') {
            filtered = filtered.filter(house => {
                if (selected === 'Belum Terkonfirmasi') {
                    return house.status === 'Waiting Payment';
                } else if (selected === 'Sudah Terkonfirmasi') {
                    return house.status === 'Processing' || house.status === 'Approved';
                }
            });
        }
        if (!searchTerm) {
            setFilteredHouses(filtered);
        } else {
            const filtered = houses.filter(
                house =>
                    house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    house.id.toString().includes(searchTerm)
            );
            setFilteredHouses(filtered);
        }
    }, [searchTerm, houses, selected]);

    if (loading) {
        return <div className="mt-5 pt-5 text-center">Loading...</div>;
    }

    return (
        <>
            <div className='mb-3'>
                <Form.Control
                    type="text"
                    className='search-form rounded-5 p-3 mb-3'
                    placeholder="Cari rumah..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className='d-flex align-items-center text-black gap-3'>
                    <div className='fw-semibold'>Status:</div>
                    <DropdownButton id="dropdown-basic-button" title={`${selected}`}>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Semua')}>Semua</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Belum Terkonfirmasi')}>Belum Terkonfirmasi</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Sudah Terkonfirmasi')}>Sudah Terkonfirmasi</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>Kode</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Harga Rumah</th>
                        <th className='custom-table-header'>Status Pembayaran</th>
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
                                <td>{house.house_code}</td>
                                <td>{house.title}</td>
                                <td className='text-end'>{Number(house.price).toLocaleString('id-ID')}</td>
                                <td>
                                    <span
                                        className={`badge w-100 py-2 ${house.status === 'Waiting Payment'
                                            ? 'bg-danger'
                                            : 'bg-success'
                                            }`}
                                    >
                                        {house.status === 'Waiting Payment' ? 'Belum Terkonfirmasi' : 'Sudah Terkonfirmasi'}
                                    </span>
                                </td>
                                <td className="align-middle">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`./detail/${house.id}`} className='text-decoration-none'>
                                            <Button className="d-flex align-items-center gap-1" variant="outline-success">
                                                <MdOutlineRemoveRedEye /> view
                                            </Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    )
}
