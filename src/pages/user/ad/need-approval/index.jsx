import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Image, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './style.css'
import Table from 'react-bootstrap/Table';
import { MdOutlineLocalOffer, MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function index() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('http://localhost:5773/api/user/advertisement/3d-offering', {
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
                                                confirmButtonColor: '#28a745', // Hijau
                                                cancelButtonColor: '#dc3545',  // Merah
                                                confirmButtonText: 'Gunakan',
                                                cancelButtonText: 'Tidak',
                                                reverseButtons: true, // Membalik posisi tombol agar "Tidak" di kiri
                                                customClass: {
                                                    popup: 'swal2-custom-popup',
                                                    title: 'swal2-title-custom',
                                                    htmlContainer: 'swal2-html-custom',
                                                },
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    Swal.fire('Pilihan berhasil dibuat!', 'Anda memilih menggunakan fitur 3D.', 'success');
                                                    // Aksi jika memilih Gunakan
                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                    Swal.fire('Pilihan berhasil dibuat!', 'Anda memilih untuk tidak menggunakan fitur 3D.', 'success');
                                                    // Aksi jika memilih Tidak
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
