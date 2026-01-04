import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function DesignerHouseList() {
    const [selected, setSelected] = useState('Semua');
    const [searchTerm, setSearchTerm] = useState('');
    const [houseProcesses, setHouseProcesses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSelect = (value) => {
        setSelected(value);
    };

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:5773/api/designer/house-list',
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

        fetchHouses();
    }, []);

    useEffect(() => {
        let filtered = [...houseProcesses];

        if (selected !== 'Semua') {
            filtered = filtered.filter(
                (item) => item.design_process.toLowerCase() === selected.toLowerCase()
            );
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
                    <div className='fw-semibold'>Status Survey:</div>
                    <DropdownButton id="dropdown-basic-button" title={`${selected}`}>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Semua')}>Semua</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Perlu Design')}>Perlu Design</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Sedang Design')}>Sedang Design</Dropdown.Item>
                        <Dropdown.Item className='fw-semibold' onClick={() => handleSelect('Design Selesai')}>Design Selesai</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>ID</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Alamat</th>
                        <th className='custom-table-header'>Status</th>
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
                                <td>{houseProcess.house.address.full_address}</td>
                                <td>{houseProcess.design_process}</td>
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
