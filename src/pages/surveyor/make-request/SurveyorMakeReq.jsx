import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function SurveyorMakeReq() {
    const [selected, setSelected] = useState('Semua');
    const [houseProcesses, setHouseProcesses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSelect = (value) => {
        setSelected(value);
    };

    useEffect(() => {
        const fetchHouseProcesses = async () => {
            try {
                const res = await axios.get(
                    'https://skripsi-homeline-backend.vercel.app/api/surveyor/make-request',
                    { withCredentials: true }
                );
                setHouseProcesses(res.data);
                setFilteredHouses(res.data);
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHouseProcesses();
    }, []);

    useEffect(() => {
        let filtered = [...houseProcesses];

        if (selected !== 'Semua') {
            if (selected === 'Belum Dibuat') {
                filtered = filtered.filter(
                    item => !item.house.survey_request
                );
            } else {
                filtered = filtered.filter(
                    item =>
                        item.house.survey_request &&
                        item.house.survey_request.request_status === selected
                );
            }
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    item.house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.house.id.toString().includes(searchTerm)
            );
        }

        setFilteredHouses(filtered);
    }, [selected, searchTerm, houseProcesses]);

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
                    <div className='fw-semibold'>Status Request:</div>
                    <DropdownButton id="dropdown-basic-button" title={`${selected}`}>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Semua')}>Semua</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Belum Dibuat')}>Request belum dibuat</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Approved')}>Approved</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Rejected')}>Rejected</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Waiting')}>Waiting</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header align-middle'>No</th>
                        <th className='custom-table-header align-middle'>Judul</th>
                        <th className='custom-table-header align-middle'>Harga</th>
                        <th className='custom-table-header align-middle'>Alamat</th>
                        <th className='custom-table-header align-middle'>Status Request</th>
                        <th className='custom-table-header align-middle'>Action</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {filteredHouses.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4">
                                {houseProcesses.length === 0
                                    ? "Tidak ada data rumah..."
                                    : "Tidak ada data rumah yang cocok.."}
                            </td>
                        </tr>
                    ) : (
                        filteredHouses.map((houseProcess, index) => (
                            <tr key={houseProcess.house.id}>
                                <td className='text-center'>{index + 1}.</td>
                                <td>{houseProcess.house.title}</td>
                                <td>Rp {parseInt(houseProcess.house.price).toLocaleString("id-ID")}</td>
                                <td>{houseProcess.house.address.full_address}</td>
                                <td className="text-center">
                                    {houseProcess.house.survey_request ? (
                                        <span className={`badge w-100 py-2 ${houseProcess.house.survey_request?.request_status === 'Approved'
                                            ? 'bg-success'
                                            : houseProcess.house.survey_request?.request_status === 'Rejected'
                                                ? 'bg-danger'
                                                : 'bg-warning'
                                            }`}>
                                            {houseProcess.house.survey_request?.request_status}
                                        </span>
                                    ) : (
                                        <span className="badge w-100 py-2 bg-secondary">Belum dibuat</span>
                                    )}
                                </td>
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
                        ))
                    )}
                </tbody>
            </Table>
        </>
    )
}
