import React from 'react'

import './style.css'

import { Container, Card, Button } from 'react-bootstrap'

import { IoLocationOutline } from "react-icons/io5";
import { LuBath, LuBuilding, LuRuler } from "react-icons/lu";
import { MdOutlineBed } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";

export default function index() {
    return (
        <>
            <Card style={{ width: '19rem' }}>
                <Card.Img variant="top" src="housephotos/example.jpg" />
                <Card.Body>
                    <Card.Title className='mb-2'>Rumah Daerah Jakarta Selatan</Card.Title>
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
                        <Button className='w-100 detail-btn'>Detail</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
