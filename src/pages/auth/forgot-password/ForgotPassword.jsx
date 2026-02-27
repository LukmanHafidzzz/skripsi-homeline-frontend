import React, { useState } from 'react'
import axios from 'axios'
import { Button, Container, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import NProgress from 'nprogress'
import './style.css'

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            return Swal.fire({
                icon: 'warning',
                title: 'Email Kosong',
                text: 'Silakan masukkan email terlebih dahulu.'
            })
        }

        try {
            setLoading(true)
            NProgress.start()

            const res = await axios.post(
                'http://localhost:5773/api/auth/forgot-password',
                { email }
            )

            Swal.fire({
                icon: 'success',
                title: 'Email Terkirim',
                text: res.data.message
            })

            setEmail('')

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text:
                    error.response?.data?.message ||
                    'Terjadi kesalahan'
            })
        } finally {
            setLoading(false)
            NProgress.done()
        }
    }

    return (
        <Container className='vh-100 d-flex justify-content-center align-items-center'>
            <div>
                <div className='d-grid justify-content-center mb-5'>
                    <Link to="/">
                        <img src="/assets/logo.png" alt="logo" width={120} />
                    </Link>
                    <Link to="/" className='text-decoration-none text-black'>
                        <div className='fs-3 fw-bold'>
                            <span className='clr-primary'>H</span>omeline
                        </div>
                    </Link>
                </div>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-5">
                        <Form.Label className='fw-bold'>
                            Email
                        </Form.Label>

                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='auth-form fs-7'
                            placeholder="Masukkan email terdaftar"
                        />
                    </Form.Group>

                    <div className='d-flex justify-content-center'>
                        <Button type="submit" className='btn-auth fw-semibold'>
                            {loading ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                                'Kirim Link Reset'
                            )}
                        </Button>
                    </div>

                    <div className='text-center mt-2 fs-7'>
                        Kembali ke{' '}
                        <Link
                            to="/auth/login"
                            className='clr-primary fw-medium text-decoration-none'
                        >
                            Login
                        </Link>
                    </div>

                </Form>
            </div>
        </Container>
    )
}
