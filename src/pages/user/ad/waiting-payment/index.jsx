import React, { useState, useEffect } from 'react'
import { Button, Image, Modal } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';
import { MdOutlineQrCode2, MdOutlineRemoveRedEye } from 'react-icons/md';

import { Link } from 'react-router-dom';

export default function index() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <td className='text-center'>waiting payment</td>
                        <td className="align-middle">
                            <div className="d-flex justify-content-center gap-3">
                                <Link to='./detail' className='text-decoration-none'><Button className="d-flex align-items-center gap-1" variant="outline-success">
                                    <MdOutlineRemoveRedEye /> view
                                </Button></Link>
                                <Button className="d-flex align-items-center gap-1" variant="outline-primary" onClick={handleShow}>
                                    <MdOutlineQrCode2 /> show QR
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} centered contentClassName="p-0 border-0 bg-transparent">
                <Modal.Body className="p-0 position-relative d-flex justify-content-center align-items-center">
                    <Image src="/qris/qris-1.png" className="w-50 rounded" />
                    
                    <Button
                        variant="light"
                        onClick={handleClose}
                        className="position-absolute"
                        style={{ top: '10px', right: '10px', borderRadius: '50%' }}
                    >
                        ✕
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
