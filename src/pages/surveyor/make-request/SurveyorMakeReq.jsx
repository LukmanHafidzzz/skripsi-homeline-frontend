import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function SurveyorMakeReq() {
    const [houseProcesses, setHouseProcesses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouseProcesses = async () => {
            try {
                const res = await axios.get('https://skripsi-homeline-backend.vercel.app/api/surveyor/make-request', {
                    withCredentials: true
                });
                setHouseProcesses(res.data);
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHouseProcesses();
    }, []);

    if (loading) {
        return <div className="mt-5 pt-5 text-center">Loading...</div>;
    };

    if (houseProcesses.length === 0) {
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
                        <th className='custom-table-header'>Alamat</th>
                        <th className='custom-table-header'>Status</th>
                        <th className='custom-table-header'>Action</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {houseProcesses.map((houseProcess, index) => (
                        <tr key={index}>
                            <td className='text-center'>{index + 1}.</td>
                            <td>{houseProcess.house.id}</td>
                            <td>{houseProcess.house.title}</td>
                            <td className=''>Rp {parseInt(houseProcess.house.price).toLocaleString("id-ID")}</td>
                            <td className=''>{houseProcess.house.address.full_address}</td>
                            <td className=''>{houseProcess.survey_process}</td>
                            <td className="align-middle">
                                <div className="d-flex justify-content-center">
                                    <Link to={`./detail/${houseProcess.house.id}`} className='text-decoration-none'>
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
