import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'

// import HouseCard from '../../../components/house-card/index'
import HouseCard from '../../../components/house-card-skeleton/index'

export default function index() {
    return (
        <>
            <Container fluid className='p-0'>
                <Row className='d-flex flex-wrap'>
                    <Col xl={4} className='mb-3 d-flex justify-content-center'>
                        <HouseCard />
                    </Col>
                    <Col xl={4} className='mb-3 d-flex justify-content-center'>
                        <HouseCard />
                    </Col>
                    <Col xl={4} className='mb-3 d-flex justify-content-center'>
                        <HouseCard />
                    </Col>
                    <Col xl={4} className='mb-3 d-flex justify-content-center'>
                        <HouseCard />
                    </Col>
                    <Col xl={4} className='mb-3 d-flex justify-content-center'>
                        <HouseCard />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
