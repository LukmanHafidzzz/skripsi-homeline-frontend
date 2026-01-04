import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function SurveyorResultInput() {
    const [selected, setSelected] = useState('Semua');
    const [houseProcesses, setHouseProcesses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouseProcesses = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:5773/api/surveyor/result-input',
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

        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    item.house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.house.id.toString().includes(searchTerm)
            );
        }

        if (selected !== 'Semua') {
            if (selected === 'Belum Ada Input') {
                filtered = filtered.filter(
                    item => !item.house.house_survey
                );
            } else {
                filtered = filtered.filter(
                    item => item.house.house_survey
                );
            }
        }

        setFilteredHouses(filtered);
    }, [searchTerm, houseProcesses, selected]);

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
                    <div className='fw-semibold'>Status Input:</div>
                    <DropdownButton id="dropdown-basic-button" title={`${selected}`}>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Semua')}>Semua</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Belum Ada Input')}>Belum Ada Input</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Pengecekan Hasil')}>Pengecekan Hasil</Dropdown.Item>
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
                        <th className='custom-table-header'>Status Input</th>
                        <th className='custom-table-header'>Action</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {filteredHouses.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                {houseProcesses.length === 0
                                    ? "Tidak ada data rumah..."
                                    : "Tidak ada data rumah yang cocok.."}
                            </td>
                        </tr>
                    ) : (
                        filteredHouses.map((houseProcess, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}.</td>
                                <td>{houseProcess.house.id}</td>
                                <td>{houseProcess.house.title}</td>
                                <td>Rp {parseInt(houseProcess.house.price).toLocaleString("id-ID")}</td>
                                {/* <td>{houseProcess.survey_process}</td> */}
                                {/* <td>
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
                                </td> */}
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
