import React, {useState} from 'react'
import NavbarHomeUser from '../../../components/navbar-home-user/index'
import Landingpage from '../../../pages/user/landingpage/index'
import FooterGeneral from '../../../components/footer-general/index'

import { Outlet } from 'react-router-dom'

import { Container, Row, Col, InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap'

import './style.css'

export default function index() {
    const [selected, setSelected] = useState('Terbaru');

    const handleSelect = (value) => {
        setSelected(value);
    };

    return (
        <>
            <NavbarHomeUser />
            <Container fluid className="mt-21 px-4">
                <Outlet />
            </Container>
            
            <FooterGeneral />
        </>
    )
}
