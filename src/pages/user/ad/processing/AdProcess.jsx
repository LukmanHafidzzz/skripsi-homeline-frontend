import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function AdProcess() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('https://skripsi-homeline-backend.vercel.app/api/user/advertisement/processing', {
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
                        <th>Status Survey</th>
                        <th>Status Design</th>
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
                            <td className='text-center'>{house.house_process.survey_process}</td>
                            <td className='text-center'>{house.house_process.design_process}</td>
                            <td className="align-middle">
                                <div className="d-flex justify-content-center">
                                    <Link to={`./detail/${house.id}`} className='text-decoration-none'><Button className="d-flex align-items-center gap-1" variant="outline-success">
                                        <MdOutlineRemoveRedEye /> view
                                    </Button></Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
