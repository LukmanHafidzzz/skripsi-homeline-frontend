import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { IoTrashOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdDelete() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const res = await axios.get('https://skripsi-homeline-backend.vercel.app/api/user/advertisement/delete', {
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
                                <div className="d-flex justify-content-center gap-2">
                                    <Link to={`./detail/${house.id}`} className='text-decoration-none'><Button className="d-flex align-items-center gap-1" variant="outline-success">
                                        <MdOutlineRemoveRedEye /> view
                                    </Button></Link>
                                    <Button
                                        className="d-flex align-items-center gap-1"
                                        variant="outline-danger"
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Apakah anda yakin ingin menghapus iklan ini?',
                                                text: "Iklan akan dihapus secara permanen!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#d33',
                                                cancelButtonColor: '#3085d6',
                                                cancelButtonText: 'Batal',
                                                confirmButtonText: 'Hapus!',
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    setDeletingId(house.id);
                                                    try {
                                                        const res = await axios.delete(`https://skripsi-homeline-backend.vercel.app/api/user/advertisement/delete/${house.id}`, {
                                                            withCredentials: true
                                                        });

                                                        Swal.fire('Terhapus!', res.data.message, 'success');

                                                        setHouses((prev) => prev.filter((h) => h.id !== house.id));
                                                    } catch (err) {
                                                        Swal.fire(
                                                            'Gagal!',
                                                            err.response?.data?.message || 'Terjadi kesalahan.',
                                                            'error'
                                                        );
                                                    } finally {
                                                        setDeletingId(null);
                                                    }
                                                }
                                            });
                                        }}
                                    >
                                        {deletingId === house.id ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            <>
                                                <IoTrashOutline /> hapus
                                            </>
                                        )}
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
