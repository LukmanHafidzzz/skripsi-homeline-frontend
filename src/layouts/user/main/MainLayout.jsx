import React, { useState, useEffect, lazy, Suspense } from 'react'
const NavbarHomeUser = lazy(() => import('../../../components/navbar-home-user/NavbarHomeUser.jsx'));
const FooterGeneral = lazy(() => import('../../../components/footer-general/FooterGeneral.jsx'));
import { Container, Row, Col, InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom'
import './style.css'
import axios from 'axios';
import Searchpage from '../../../pages/user/searchpage/Searchpage.jsx';
import { useAuth } from '../../../context/AuthProvider.jsx';

export default function MainLayout() {
    const { loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState({ value: "", unit: "jt" });
    const [maxPrice, setMaxPrice] = useState({ value: "", unit: "jt" });
    const [sortOption, setSortOption] = useState("Terbaru");
    const [provinsiList, setProvinsiList] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState([]);
    const [useOnly3d, setUseOnly3d] = useState(false);

    const handleSelectSort = (value) => setSortOption(value);

    const handleCheckboxChange = (provId) => {
        setSelectedProvinsi(prev =>
            prev.includes(provId) ? prev.filter(id => id !== provId) : [...prev, provId]
        );
    };

    const handlePriceChange = (val, setter, currentUnit) => {
        const num = parseFloat(val);
        if (!val || isNaN(num)) {
            setter({ value: "", unit: "jt" });
            return;
        }

        const inJuta = currentUnit === "m" ? num * 1000 : num;

        if (inJuta >= 1000) {
            setter({ value: inJuta / 1000, unit: "m" });
        } else {
            setter({ value: inJuta, unit: "jt" });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!authLoading) setLoading(false);
    }, [authLoading]);

    useEffect(() => {
        fetch('http://localhost:5773/api/user/provinces')
            .then(res => res.json())
            .then(data => setProvinsiList(data));
    }, []);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <NavbarHomeUser />
            </Suspense>
            <Container fluid className="mt-21 px-4">
                <Row>
                    <Col xs={3} className="">
                        <div className='fw-bold fs-5 mb-3'>Filter</div>
                        <Container className="border p-4 rounded-2 mb-4 box-filter">
                            <div className='fw-bold mb-3'>Harga (dalam Juta Rp)</div>
                            <div className="d-flex flex-column gap-2 mb-4">
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">Rp</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Minimal Harga"
                                        value={minPrice.value}
                                        onChange={(e) => handlePriceChange(e.target.value, setMinPrice, minPrice.unit)}
                                        className="form-maxmin text-end"
                                        type="number"
                                        min="0"
                                    />
                                    <span className="input-suffix">{minPrice.unit}</span>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon2">Rp</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Maksimal Harga"
                                        value={maxPrice.value}
                                        onChange={(e) => handlePriceChange(e.target.value, setMaxPrice, maxPrice.unit)}
                                        className="form-maxmin text-end"
                                        type="number"
                                        min="0"
                                    />
                                    <span className="input-suffix">{maxPrice.unit}</span>
                                </InputGroup>
                            </div>
                        </Container>
                        <Container className="border p-3 rounded-2 mb-4 box-filter">
                            <div className='fw-bold mb-3'>Lokasi</div>
                            <div className="d-flex flex-column gap-2 mb-4 loc-container">
                                {provinsiList.map((province) => (
                                    <Form.Check
                                        key={province}
                                        className="checkbox-ellipsis"
                                        type="checkbox"
                                        id={`provinsi-${province}`}
                                        label={province}
                                        checked={selectedProvinsi.includes(province)}
                                        onChange={() => handleCheckboxChange(province)}
                                    />
                                ))}
                            </div>
                        </Container>
                        <Container className="border p-4 rounded-2 mb-4 box-filter">
                            <div className='fw-bold mb-3'>Tersedia Tampilan 3D</div>
                            <div className="d-flex flex-column gap-2">
                                <div className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        value={useOnly3d}
                                        onChange={(e) => setUseOnly3d(e.target.checked)}
                                        checked={useOnly3d}
                                        id="default-checkbox"
                                        label='Tampilkan hanya rumah dengan 3D'
                                    />
                                </div>
                            </div>
                        </Container>
                    </Col>
                    <Col xs={9} className="">
                        {loading ? (
                            <Skeleton height={50} width="75%" />
                        ) : (
                            <div className='fs-4 mb-2'>
                                Cari rumah sesuai lokasi, harga, dan kebutuhan Anda di sini!
                            </div>
                        )}
                        {loading ? (
                            <>
                                <div className='mb-3'>
                                    <Skeleton height={50} width="100%" className="mb-2" />
                                    <div className='d-flex justify-content-end align-items-center text-black gap-3'>
                                        <Skeleton height={40} width={200} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='mb-3'>
                                    <Form.Control
                                        type="text"
                                        className='search-form rounded-5 p-3 mb-3'
                                        placeholder="Cari rumah..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <div className='d-flex justify-content-end align-items-center text-black gap-3'>
                                        <div className='fw-semibold'>Urutkan:</div>
                                        <DropdownButton id="dropdown-basic-button" title={sortOption}>
                                            <Dropdown.Item onClick={() => handleSelectSort('Harga Tertinggi')}>Harga Tertinggi</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleSelectSort('Harga Terendah')}>Harga Terendah</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleSelectSort('Terbaru')}>Terbaru</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <Searchpage
                                searchTerm={searchTerm}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                sortOption={sortOption}
                                selectedProvinsi={selectedProvinsi}
                                useOnly3d={useOnly3d}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>

            <Suspense fallback={<div>Loading...</div>}>
                <FooterGeneral />
            </Suspense>
        </>
    )
}
