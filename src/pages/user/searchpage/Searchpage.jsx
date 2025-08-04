import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
const HouseCard = lazy(() => import('../../../components/house-card/HouseCard'));

export default function Searchpage() {
    const [houses, setHouses] = useState([]);

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
                            <Suspense fallback={<div>Loading...</div>}>
                                <HouseCard house={house} />
                            </Suspense>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}
