import React, { useState, useEffect } from 'react'
import './style.css'
import { DropdownButton, Form, Dropdown, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

export default function index() {
    const [selected, setSelected] = useState('Terbaru');

    const handleSelect = (value) => {
        setSelected(value);
    };

    return (
        <>
            <div className='mb-3'>
                <Form.Control type="text" className='search-form rounded-5 p-3 mb-3' placeholder="Cari rumah..." />
            </div>

            <Table bordered>
                <thead>
                    <tr className='text-center'>
                        <th className='custom-table-header'>No</th>
                        <th className='custom-table-header'>ID</th>
                        <th className='custom-table-header'>Judul</th>
                        <th className='custom-table-header'>Harga</th>
                        <th className='custom-table-header'>Action</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    <tr>
                        <td>1.</td>
                        <td>H00001</td>
                        <td>Rumah daerah Jakarta Selatan</td>
                        <td className='text-end'>550.000.000</td>
                        <td className="align-middle">
                            <div className="d-flex justify-content-center">
                                <Link to='./detail' className='text-decoration-none'>
                                    <Button className="d-flex align-items-center gap-1" variant="outline-success">
                                        <MdOutlineRemoveRedEye /> view
                                    </Button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
