import React, {useState, useEffect} from 'react'
import './style.css'

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
        <div className={`fw-semibold btn-login-primary ${isScrolled ? 'scrolled' : ''}`}>
            Login
        </div>
    </>
  )
}
