import React from 'react'
import './style.css'
import { Container } from 'react-bootstrap'
import { BsShieldLock } from 'react-icons/bs'

export default function Unauthorize() {
    return (
        <>
            <Container fluid className='text-center vh-100 d-flex align-items-center justify-content-center'>
                <div className='d-flex align-items-center justify-content-center'>
                    <div>
                        <div className='fs-2 fw-bold text-un'>
                            Oopss! Hold Up!
                        </div>
                        <div className='fs-4 fw-semibold'>
                            You are not authorized to view this site.
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
