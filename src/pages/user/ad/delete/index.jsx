import React from 'react'
import { Button } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';
import { IoTrashOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

export default function index() {
    const handleDelete = () => {
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus iklan ini?',
            text: "Iklan akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Batal',
            confirmButtonText: 'Hapus!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Terhapus!',
                    'Data berhasil dihapus.',
                    'success'
                )
                // delete action
            }
        })
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
                    <tr>
                        <td>1.</td>
                        <td>Rumah daerah Jakarta Selatan</td>
                        <td className='text-end'>550.000.000</td>
                        <td className='text-center'>rejected</td>
                        <td className="align-middle">
                            <div className="d-flex justify-content-center gap-2">
                                <Link to='./detail' className='text-decoration-none'><Button className="d-flex align-items-center gap-1" variant="outline-success">
                                    <MdOutlineRemoveRedEye /> view
                                </Button></Link>
                                <Link className='text-decoration-none' onClick={handleDelete}><Button className="d-flex align-items-center gap-1" variant="outline-danger">
                                    <IoTrashOutline /> hapus
                                </Button></Link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
