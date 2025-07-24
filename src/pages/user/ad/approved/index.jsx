import React from 'react'
import { Button } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { Link } from 'react-router-dom';

export default function index() {
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
                        <td className='text-center'>approved</td>
                        <td className="align-middle">
                            <div className="d-flex justify-content-center">
                                <Link to='./detail' className='text-decoration-none'><Button className="d-flex align-items-center gap-1" variant="outline-success">
                                    <MdOutlineRemoveRedEye /> view
                                </Button></Link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
