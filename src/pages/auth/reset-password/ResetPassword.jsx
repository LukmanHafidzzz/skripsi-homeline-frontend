import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import NProgress from 'nprogress'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import './style.css'

export default function ResetPassword() {

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Token Tidak Valid',
                text: 'Silakan request reset password kembali'
            }).then(() => {
                navigate('/auth/forgot-password')
            })
        }
    }, [token, navigate])


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const isPasswordStrong = (password) => {
        return password.length >= 6
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.password || !formData.confirmPassword) {
            return Swal.fire({
                icon: 'warning',
                title: 'Form Belum Lengkap'
            })
        }

        if (!isPasswordStrong(formData.password)) {
            return Swal.fire({
                icon: 'warning',
                title: 'Password Terlalu Lemah',
                text: 'Minimal 6 karakter'
            })
        }

        if (formData.password !== formData.confirmPassword) {
            return Swal.fire({
                icon: 'warning',
                title: 'Password Tidak Sama'
            })
        }

        try {
            setLoading(true)
            NProgress.start()

            const res = await axios.post(
                'http://localhost:5773/api/auth/reset-password',
                {
                    token,
                    password: formData.password
                }
            )

            Swal.fire({
                icon: 'success',
                title: 'Password Berhasil Diubah',
                text: res.data.message
            }).then(() => {
                navigate('/auth/login')
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Reset Password',
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
                    <Form.Group className="mb-4 position-relative">
                        <Form.Label className='fw-bold'>
                            Password Baru
                        </Form.Label>

                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='auth-form pe-5'
                            placeholder="Masukkan password baru"
                        />

                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <LuEyeOff /> : <LuEye />}
                        </span>

                        <small className="text-muted">
                            Minimal 6 karakter
                        </small>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className='fw-bold'>
                            Konfirmasi Password
                        </Form.Label>

                        <Form.Control
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='auth-form pe-5'
                            placeholder="Masukkan ulang password"
                        />

                        <span
                            className="toggle-password"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                        </span>
                    </Form.Group>

                    <div className='d-flex justify-content-center'>
                        <Button
                            type="submit"
                            className='btn-auth fw-semibold'
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                                'Reset Password'
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
