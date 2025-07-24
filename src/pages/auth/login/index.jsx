import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

import './style.css'

import { Link } from 'react-router-dom';

export default function index() {
    return (
        <>
            <Container className='vh-100 d-flex justify-content-center align-items-center'>
                <div>
                    <div className='d-grid justify-content-center mb-3'>
                        <Link to="/"><img src="/assets/logo.png" alt="logo" width={120} /></Link>
                        <Link to="/" className='text-decoration-none text-black'><div className='fs-3 fw-bold'><span className='clr-primary'>H</span>omeline</div></Link>
                    </div>
                    <Form className='w-100'>
                        <Form.Group className="mb-4" controlId="">
                            <Form.Label className='fw-bold'>Email</Form.Label>
                            <Form.Control type="email" className='auth-form fs-7' placeholder="Masukkan alamat email" />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="">
                            <Form.Label className='fw-bold'>Password</Form.Label>
                            <Form.Control type="password" className='auth-form fs-7' placeholder="Masukkan password" />
                        </Form.Group>
                        <div className='d-flex justify-content-center align-items-center'>
                            <Button type="submit" className='btn-auth fw-semibold'>
                                Login
                            </Button>
                        </div>
                        <div className='text-center mt-1 fs-7'>
                            Belum memiliki akun? <Link to="/auth/register" className='clr-primary fw-medium text-decoration-none'>Daftar</Link>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}
