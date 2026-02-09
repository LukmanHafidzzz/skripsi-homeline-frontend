import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import './style.css'
import { Link } from 'react-router-dom';
import NProgress from 'nprogress';
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        NProgress.start();
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            return Swal.fire({
                icon: 'warning',
                title: 'Form Belum Lengkap',
                text: 'Semua field wajib diisi.',
            });
        }

        if (formData.password !== formData.confirmPassword) {
            return Swal.fire({
                icon: 'warning',
                title: 'Password Tidak Cocok',
                text: 'Pastikan password dan konfirmasi password sama.',
                confirmButtonColor: '#f0ad4e'
            });
        }

        try {
            const res = await axios.post('http://localhost:5773/api/auth/register', formData, {
                withCredentials: true
            });

            Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil',
                text: res.data.message,
                confirmButtonColor: '#3085d6'
            }).then(() => {
                window.location.href = '/auth/login';
            });

        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registrasi Gagal',
                    text: error.response.data.message || 'Terjadi kesalahan saat registrasi.',
                    confirmButtonColor: '#d33'
                });
            }
        } finally {
            setLoading(false);
            NProgress.done();
        }
    };

    return (
        <>
            <Container className='vh-100 d-flex justify-content-center align-items-center'>
                <div>
                    <div className='d-grid justify-content-center mb-3'>
                        <Link to="/"><img src="/assets/logo.png" alt="logo" width={120} /></Link>
                        <Link to="/" className='text-decoration-none text-black'><div className='fs-3 fw-bold'><span className='clr-primary'>H</span>omeline</div></Link>
                    </div>
                    <Form className='w-100' onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="">
                            <Form.Label className='fw-bold'>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className='auth-form fs-7'
                                placeholder="Masukkan nama"
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="">
                            <Form.Label className='fw-bold'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className='auth-form fs-7'
                                placeholder="Masukkan alamat email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-4 position-relative">
                            <Form.Label className='fw-bold'>Password</Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className='auth-form fs-7 pe-5'
                                placeholder="Masukkan password"
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <LuEyeOff /> : <LuEye />}
                            </span>
                        </Form.Group>
                        <Form.Group className="mb-5 position-relative">
                            <Form.Label className='fw-bold'>Konfirmasi Password</Form.Label>
                            <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className='auth-form fs-7 pe-5'
                                placeholder="Masukkan konfirmasi password"
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                            </span>
                        </Form.Group>
                        <div className='d-flex justify-content-center align-items-center'>
                            <Button type="submit" className='btn-auth fw-semibold'>
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'Daftar'
                                )}
                            </Button>
                        </div>
                        <div className='text-center mt-1 fs-7'>
                            Sudah memiliki akun? <Link to="/auth/login" className='clr-primary fw-medium text-decoration-none'>Login</Link>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}
