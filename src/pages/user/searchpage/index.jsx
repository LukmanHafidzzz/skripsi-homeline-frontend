import React, { useEffect, useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

import HouseCard from '../../../components/house-card-skeleton/index'

export default function index() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get("http://localhost:5773/api/user/search");
                setHouses(response.data);
            } catch (err) {
                console.error("Failed to fetch houses:", err);
            }
        };

        fetchHouses();
    }, []);
    return (
        <>
            <Container fluid className='p-0'>
                <Row className='d-flex flex-wrap'>
                    {houses.map((house) => (
                        <Col xl={4} className='mb-3 d-flex justify-content-center' key={house.id}>
                            <HouseCard house={house} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}
