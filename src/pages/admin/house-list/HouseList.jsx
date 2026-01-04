import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function HouseList() {
    const [selected, setSelected] = useState('Semua');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredHouses, setFilteredHouses] = useState([]);

    const handleSelect = (value) => {
        setSelected(value);
    };

    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('http://localhost:5773/api/admin/house/house-list', {
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

        if (searchTerm) {
            filtered = filtered.filter(house =>
                house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                house.id.toString().includes(searchTerm)
            );
        }

        if (selected !== 'Semua') {
            filtered = filtered.filter(house =>
                house.status.toLowerCase() === selected.toLowerCase()
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
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Pending')}>Pending</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Waiting Payment')}>Waiting Payment</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Offering 3D')}>Offering 3D</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Processing')}>Processing</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Approved')}>Approved</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Rejected')}>Rejected</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>Pengunggah</th>
                        <th className='custom-table-header'>Nomor Kontak</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Harga</th>
                        <th className='custom-table-header'>Status</th>
                        <th className='custom-table-header'>Action</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {filteredHouses.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                Tidak ada data rumah yang cocok..
                            </td>
                        </tr>
                    ) : (
                        filteredHouses.map((house, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}.</td>
                                <td>{house.user.username}</td>
                                <td>+62 {house.no_telp}</td>
                                <td>{house.title}</td>
                                <td className='text-end'>{Number(house.price).toLocaleString('id-ID')}</td>
                                <td className='text-end'>{house.status}</td>
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
