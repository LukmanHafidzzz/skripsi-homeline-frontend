import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { LuClipboardPlus } from 'react-icons/lu';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function SurveyorNeedSurvey() {
    const [selected, setSelected] = useState('Semua');
    const [searchTerm, setSearchTerm] = useState('');
    const [houseProcesses, setHouseProcesses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasPendingSurvey, setHasPendingSurvey] = useState(false);

    const handleSelect = (value) => {
        setSelected(value);
    };

    const handleStartSurvey = async (houseProcessId) => {
        const result = await Swal.fire({
            title: 'Mulai Survey?',
            text: 'Apakah Anda yakin ingin mensurvey rumah ini?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Survey',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#6c757d',
        });

        if (result.isConfirmed) {
            try {
                await axios.patch(
                    `https://skripsi-homeline-backend.vercel.app/api/surveyor/start-survey/${houseProcessId}`,
                    {},
                    { withCredentials: true }
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Survey dimulai!',
                    timer: 1500,
                    showConfirmButton: false,
                });

                const res = await axios.get(
                    'https://skripsi-homeline-backend.vercel.app/api/surveyor/need-survey',
                    { withCredentials: true }
                );
                setHouseProcesses(res.data);
                setFilteredHouses(res.data);

                const pending = res.data.some(
                    item => item.survey_process === "Sedang Survey" && item.status_input == null
                );

                setHasPendingSurvey(pending);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: error.response?.data?.message || 'Terjadi kesalahan',
                });
            }
        }
    };

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get(
                    'https://skripsi-homeline-backend.vercel.app/api/surveyor/need-survey',
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

        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    item.house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.house.id.toString().includes(searchTerm)
            );
        }

        setFilteredHouses(filtered);
    }, [searchTerm, houseProcesses]);

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
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>Kode</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Alamat</th>
                        <th className='custom-table-header'>No Whatsapp</th>
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
                                <td>{houseProcess.house.house_code}</td>
                                <td>{houseProcess.house.title}</td>
                                <td>{houseProcess.house.address.full_address}</td>
                                <td>
                                    <a
                                        href={`https://wa.me/${houseProcess.house.no_telp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-success fw-semibold text-decoration-none"
                                    >
                                        +62{houseProcess.house.no_telp}
                                    </a>
                                </td>
                                <td className="align-middle">
                                    <div className="d-flex gap-2 justify-content-center">
                                        <Link className='text-decoration-none'>
                                            <Button className="d-flex align-items-center gap-1" variant="primary" disabled={hasPendingSurvey} onClick={() => handleStartSurvey(houseProcess.id)}>
                                                <LuClipboardPlus /> mulai
                                            </Button>
                                        </Link>
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
