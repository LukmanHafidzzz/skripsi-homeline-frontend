import React from 'react'

import { Link } from 'react-router-dom';

import './style.css'

import { Container, Card, Button } from 'react-bootstrap'

import { IoLocationOutline } from "react-icons/io5";
import { LuBath, LuBuilding, LuRuler } from "react-icons/lu";
import { MdOutlineBed } from "react-icons/md";

export default function index() {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="/housephotos/example.jpg" />
                <Card.Body>
                    <Card.Title className='mb-2 card-title-ellipsis'>Rumah Daerah Jakarta Selatan</Card.Title>
                    <Card.Text>
                        <div className='d-flex align-items-center gap-2 mb-2'><IoLocationOutline /> Jakarta Selatan</div>
                        <div className='fs-7 d-flex align-items-center gap-3 mb-4'>
                            <div className='d-flex align-items-center gap-1'><LuBath /> 2</div>
                            <div className='d-flex align-items-center gap-1'><MdOutlineBed /> 4</div>
                            <div className='d-flex align-items-center gap-1'><LuRuler /> 160m2</div>
                            <div className='d-flex align-items-center gap-1'><LuBuilding /> 200m2</div>
                        </div>
                        <div className='fw-bold fs-5 mb-2'>
                            Rp 550.000.000
                        </div>
                        <Link to='/detail'>
                            <Button className='w-100 detail-btn'>Detail</Button>
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
