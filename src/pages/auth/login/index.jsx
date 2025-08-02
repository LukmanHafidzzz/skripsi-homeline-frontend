import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios'
import './style.css'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5773/api/auth/login', {
                email,
                password
            }, {
                withCredentials: true
            });

            const response = await axios.get('http://localhost:5773/api/auth/me', {
                withCredentials: true
            });

            const user = response.data;
            const level = user.level_user_id;

            Swal.fire({
                icon: 'success',
                title: 'Berhasil Login',
                text: `Selamat datang, ${user.username || 'user'}!`,
                timer: 1500,
                showConfirmButton: false
            });

            if (level === 1) {
                navigate('/admin');
            } else if (level === 2) {
                navigate('/surveyor');
            } else if (level === 3) {
                navigate('/designer');
            } else {
                navigate('/search');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat login.";
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: errorMessage,
            });
        }
    };

    return (
        <Container className='vh-100 d-flex justify-content-center align-items-center'>
            <div>
                <div className='d-grid justify-content-center mb-3'>
                    <Link to="/"><img src="/assets/logo.png" alt="logo" width={120} /></Link>
                    <Link to="/" className='text-decoration-none text-black'><div className='fs-3 fw-bold'><span className='clr-primary'>H</span>omeline</div></Link>
                </div>
                <Form className='w-100' onSubmit={handleLogin}>
                    {message && (
                        <div className="text-danger text-center mb-2">{message}</div>
                    )}
                    <Form.Group className="mb-4">
                        <Form.Label className='fw-bold'>Email</Form.Label>
                        <Form.Control
                            type="email"
                            className='auth-form fs-7'
                            placeholder="Masukkan alamat email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Label className='fw-bold'>Password</Form.Label>
                        <Form.Control
                            type="password"
                            className='auth-form fs-7'
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
    )
}
