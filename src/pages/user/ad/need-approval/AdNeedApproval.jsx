import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './style.css'
import Table from 'react-bootstrap/Table';
import { MdOutlineLocalOffer, MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

export default function AdNeedApproval() {
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('https://skripsi-homeline-backend.vercel.app/api/user/advertisement/3d-offering', {
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
                            <td className="align-middle">
                                <div className="d-flex justify-content-center gap-3">
                                    <Link to={`./detail/${house.id}`} className='text-decoration-none'><Button className="d-flex align-items-center gap-1" variant="outline-success">
                                        <MdOutlineRemoveRedEye /> view
                                    </Button></Link>
                                    <Button
                                        variant="outline-primary"
                                        className='d-flex align-items-center gap-1'
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Apakah Anda ingin menggunakan fitur 3D modeling untuk pengiklanan anda?',
                                                html: `<small><i>*Note: Dikenakan biaya sebesar <b>Rp 150.000</b> dengan metode QRIS</i></small>`,
                                                icon: 'question',
                                                showCancelButton: true,
                                                confirmButtonColor: '#28a745',
                                                cancelButtonColor: '#dc3545',
                                                confirmButtonText: 'Gunakan',
                                                cancelButtonText: 'Tidak',
                                                reverseButtons: true,
                                                customClass: {
                                                    popup: 'swal2-custom-popup',
                                                    title: 'swal2-title-custom',
                                                    htmlContainer: 'swal2-html-custom',
                                                },
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    try {
                                                        const res = await axios.patch(
                                                            `https://skripsi-homeline-backend.vercel.app/api/user/advertisement/approve-3d-offering/${house.id}`,
                                                            { withCredentials: true }
                                                        );
                                                        Swal.fire(
                                                            'Pilihan berhasil dibuat!',
                                                            res.data.message || 'Anda memilih menggunakan fitur 3D.',
                                                            'success'
                                                        ).then(() => {
                                                            navigate('/advertisement/need-approval');
                                                        });
                                                    } catch (err) {
                                                        Swal.fire(
                                                            'Gagal!',
                                                            err.response?.data?.message || 'Terjadi kesalahan.',
                                                            'error'
                                                        );
                                                    };
                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                    try {
                                                        const res = await axios.patch(
                                                            `https://skripsi-homeline-backend.vercel.app/api/user/advertisement/reject-3d-offering/${house.id}`,
                                                            { withCredentials: true }
                                                        );
                                                        Swal.fire(
                                                            'Pilihan berhasil dibuat!',
                                                            res.data.message || 'Anda memilih untuk tidak menggunakan fitur 3D.',
                                                            'success'
                                                        ).then(() => {
                                                            navigate('/advertisement/need-approval');
                                                        });
                                                    } catch (err) {
                                                        Swal.fire(
                                                            'Gagal!',
                                                            err.response?.data?.message || 'Terjadi kesalahan.',
                                                            'error'
                                                        );
                                                    }
                                                }
                                            });
                                        }}
                                    >
                                        <MdOutlineLocalOffer /> Penawaran
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
