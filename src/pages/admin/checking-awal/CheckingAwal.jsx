import React, { useState, useEffect } from 'react'
import './style.css'
import { Form, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function CheckingAwal() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('http://localhost:5773/api/admin/house/pending', {
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

        setFilteredHouses(filtered);
    }, [searchTerm, houses]);

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
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>ID</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Harga</th>
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
