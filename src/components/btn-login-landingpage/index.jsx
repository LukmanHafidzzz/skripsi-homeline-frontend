import React, { useState, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

export default function index() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Link to="/auth/login" className='text-decoration-none'>
                <div className={`fw-semibold btn-login-primary ${isScrolled ? 'scrolled' : ''}`}>
                    Login
                </div>
            </Link>
        </>
    )
}
