import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
const HouseCard = lazy(() => import('../../../components/house-card/HouseCard'));

export default function Searchpage({ searchTerm, minPrice, maxPrice, sortOption, selectedProvinsi }) {
    const [allHouses, setAllHouses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get("https://skripsi-homeline-backend.vercel.app/api/user/search");
                setAllHouses(response.data);
                setFilteredHouses(response.data);
            } catch (err) {
                console.error("Failed to fetch houses:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHouses();
    }, []);

    useEffect(() => {
        let filtered = [...allHouses];

        if (searchTerm) {
            filtered = filtered.filter(house =>
                house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                house.address.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (minPrice) {
            filtered = filtered.filter(house => parseInt(house.price) >= parseInt(minPrice));
        }
        if (maxPrice) {
            filtered = filtered.filter(house => parseInt(house.price) <= parseInt(maxPrice));
        }

        if (selectedProvinsi.length > 0) {
            filtered = filtered.filter(house =>
                selectedProvinsi.includes(house.address.province)
            );
        }

        if (sortOption === 'Harga Tertinggi') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'Harga Terendah') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'Terbaru') {
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        setFilteredHouses(filtered);
    }, [searchTerm, minPrice, maxPrice, sortOption, selectedProvinsi, allHouses]);

    return (
        <Container fluid className='p-0'>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <div className="text-muted">Loading...</div>
                </div>
            ) : filteredHouses.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <div className="text-muted">Tidak ada data rumah yang cocok</div>
                </div>
            ) : (
                <Row className='d-flex flex-wrap'>
                    {filteredHouses.map((house) => (
                        <Col xl={4} className='mb-3 d-flex justify-content-center' key={house.id}>
                            <HouseCard house={house} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}