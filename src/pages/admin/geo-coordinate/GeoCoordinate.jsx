import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function GeoCoordinate() {
    const [selected, setSelected] = useState('Semua');
    const [houses, setHouses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:5773/api/admin/house/geo-coordinate',
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
    }

    useEffect(() => {
        let filtered = [...houses];

        if (searchTerm) {
            filtered = filtered.filter(
                (house) =>
                    house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    house.id.toString().includes(searchTerm)
            );
        }

        if (selected === 'Belum Ada Input') {
            filtered = filtered.filter(house => house.latitude == null || house.longitude == null);
        } else if (selected === 'Sudah Ada Input') {
            filtered = filtered.filter(house => house.latitude != null && house.longitude != null);
        }

        setFilteredHouses(filtered);
    }, [searchTerm, houses, selected]);

    if (loading) {
        return <div className="mt-5 pt-5 text-center">Loading...</div>;
    }

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
                <Form.Control
                    type="text"
                    className='search-form rounded-5 p-3 mb-3'
                    placeholder="Cari rumah..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className='d-flex align-items-center text-black gap-3'>
                    <div className='fw-semibold'>Status Input:</div>
                    <DropdownButton id="dropdown-basic-button" title={`${selected}`}>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Semua')}>Semua</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Belum Ada Input')}>Belum Ada Input</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Sudah Ada Input')}>Sudah Ada Input</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>Kode</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Harga</th>
                        <th className='custom-table-header'>Status Rumah</th>
                        <th className='custom-table-header'>Status Input</th>
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
                                    <span className={`badge w-100 py-2 ${house.status === 'Processing' ? 'bg-warning' : 'bg-success'}`}>{house.status}</span>
                                </td>
                                <td>
                                    {house.latitude && house.longitude ? (
                                        <span className="badge w-100 py-2 bg-success">Sudah Koordinat</span>
                                    ) : (
                                        <span className="badge w-100 py-2 bg-danger">Belum Ada Koordinat</span>
                                    )}
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
