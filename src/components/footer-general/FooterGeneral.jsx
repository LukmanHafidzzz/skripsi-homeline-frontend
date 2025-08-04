import React from 'react'
import './style.css'
import { Col, Row } from 'react-bootstrap'
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function FooterGeneral() {
    return (
        <>
            <div className='border mt-5 p-4'>
                <Row>
                    <Col xs={4} className=''>
                        <div className='fw-bold fs-4 mb-2'><span className='clr-primary'>H</span>omeline</div>
                        <div>
                            Jl. H. Dulwanih, Bedahan, Kec. Sawangan, Kota Depok, Jawa Barat 16519
                        </div>
                    </Col>
                    <Col xs={4} className=''></Col>
                    <Col xs={4} className='text-end'>
                        <div className='fw-bold fs-4 mb-2'>Get in touch</div>
                        <div className="d-flex align-items-center justify-content-end gap-1">
                            <div className='footer-icon fs-5'>
                                <FaInstagram />
                            </div>
                            <div className='footer-icon fs-5'>
                                <MdOutlineEmail />
                            </div>
                            <div className='footer-icon fs-5'>
                                <FaWhatsapp />
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr />
                <div className='text-center'>Homeline • Copyright • 2025</div>
            </div>
        </>
    )
}
