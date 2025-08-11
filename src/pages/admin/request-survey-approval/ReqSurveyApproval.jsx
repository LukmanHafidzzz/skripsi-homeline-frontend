import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function ReqSurveyApproval() {
    const [selected, setSelected] = useState('Semua');
    const [surveyRequests, setSurveyRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSelect = (value) => {
        setSelected(value);
    };

    useEffect(() => {
        const fetchSurveyRequest = async () => {
            try {
                const res = await axios.get(
                    'https://skripsi-homeline-backend.vercel.app/api/admin/request/survey-request',
                    { withCredentials: true }
                );
                setSurveyRequests(res.data);
                setFilteredRequests(res.data);
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyRequest();
    }, []);

    useEffect(() => {
        let filtered = [...surveyRequests];

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
    }, [searchTerm, selected, surveyRequests]);

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
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Semua')}>semua</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Waiting')}>waiting</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Approved')}>approved</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Rejected')}>rejected</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>ID</th>
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
                                {surveyRequests.length === 0
                                    ? "Tidak ada data rumah..."
                                    : "Tidak ada data rumah yang cocok.."}
                            </td>
                        </tr>
                    ) : (
                        filteredRequests.map((surveyRequest, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}.</td>
                                <td>{surveyRequest.house_id}</td>
                                <td>{surveyRequest.house.title}</td>
                                <td className='text-end'>{Number(surveyRequest.house.price).toLocaleString('id-ID')}</td>
                                <td className='text-center'>{surveyRequest.request_status}</td>
                                <td className="align-middle">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`./detail/${surveyRequest.house.id}`} className='text-decoration-none'>
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
