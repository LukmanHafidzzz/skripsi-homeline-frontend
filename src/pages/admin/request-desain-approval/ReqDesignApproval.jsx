import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function ReqDesignApproval() {
    const [selected, setSelected] = useState('Semua');
    const [designRequests, setDesignRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSelect = (value) => {
        setSelected(value);
    };

    useEffect(() => {
        const fetchDesignRequest = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:5773/api/admin/request/design-request',
                    { withCredentials: true }
                );
                setDesignRequests(res.data);
                setFilteredRequests(res.data);
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDesignRequest();
    }, []);

    useEffect(() => {
        let filtered = [...designRequests];

        if (selected !== 'Semua') {
            filtered = filtered.filter(req => req.request_status.toLowerCase() === selected.toLowerCase());
        }

        if (searchTerm) {
            filtered = filtered.filter(req =>
                req.house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.house_id.toString().includes(searchTerm)
            );
        }

        setFilteredRequests(filtered);
    }, [searchTerm, selected, designRequests]);

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
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Waiting')}>Waiting</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Approved')}>Approved</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Rejected')}>Rejected</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Harga</th>
                        <th className='custom-table-header'>Request Status</th>
                        <th className='custom-table-header'>Action</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {filteredRequests.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                {designRequests.length === 0
                                    ? "Tidak ada data rumah..."
                                    : "Tidak ada data rumah yang cocok.."}
                            </td>
                        </tr>
                    ) : (
                        filteredRequests.map((designRequests, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}.</td>
                                <td>{designRequests.house.title}</td>
                                <td className='text-end'>
                                    {Number(designRequests.house.price).toLocaleString('id-ID')}
                                </td>
                                <td className='text-center'>
                                    <span className={`badge w-100 py-2 ${designRequests.request_status === 'Waiting'
                                        ? 'bg-warning' : designRequests.request_status === 'Approved'
                                            ? 'bg-success' : 'bg-danger'}`}>
                                        {designRequests.request_status}
                                    </span>
                                </td>
                                <td className="align-middle">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`./detail/${designRequests.house.id}`} className='text-decoration-none'>
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
