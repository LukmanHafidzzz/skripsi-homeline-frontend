import React, { useState, useEffect } from 'react'
import './style.css'
import { Form, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function index() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('http://localhost:5773/api/admin/house/pending', {
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
                    {houses.map((house, index) => (
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
                    ))}
                </tbody>
            </Table>
        </>
    )
}
