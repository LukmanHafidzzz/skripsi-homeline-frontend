import React, { useState, useEffect } from 'react'
import SummaryCard from '../../../../components/summary-card/SummaryCard'
import { Container, Row, Col } from 'react-bootstrap'
import { LuHouse, LuCircleCheck, LuCircleX, LuClock, LuCreditCard, LuLoaderCircle } from 'react-icons/lu'
import axios from 'axios'

export default function AdvertisementHome() {
    const [houses, setHouses] = useState({
        total: 0,
        approved: 0,
        rejected: 0,
        pending: 0,
        waiting_payment: 0,
        processing: 0,
    })

    useEffect(() => {
        axios.get(`http://localhost:5773/api/user/advertisement/count`,
            { withCredentials: true })
            .then(res => setHouses(res.data))
            .catch(err => console.error(err))
    }, [])
    return (
        <>
            <Container>
                <div className="" data-aos="fade-up" data-aos-duration="800">
                    <div className="dashboard-section__title">Overview Dashboard</div>
                    <div className="dashboard-section__subtitle">Ringkasan seluruh status iklan properti</div>
                </div>

                <Row className="g-3 mt-3" data-aos="fade-up" data-aos-duration="1000">
                    <Col xs={12}>
                        <SummaryCard
                            title="Total Semua Iklan"
                            value={houses.total}
                            icon={<LuHouse />}
                            accentClass="accent--total"
                            iconClass="icon--total"
                            description="Gabungan seluruh iklan dari semua status"
                        />
                    </Col>
                </Row>

                <Row className="g-3 mt-1" data-aos="fade-up" data-aos-duration="1200">
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Approved"
                            value={houses.approved}
                            icon={<LuCircleCheck />}
                            accentClass="accent--approved"
                            iconClass="icon--approved"
                            description="Iklan telah disetujui & tayang"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Rejected"
                            value={houses.rejected}
                            icon={<LuCircleX />}
                            accentClass="accent--rejected"
                            iconClass="icon--rejected"
                            description="Iklan ditolak, perlu perbaikan"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Pending"
                            value={houses.pending}
                            icon={<LuClock />}
                            accentClass="accent--pending"
                            iconClass="icon--pending"
                            description="Iklan menunggu untuk direview"
                        />
                    </Col>
                </Row>

                <Row className="g-3 mt-1 mb-4" data-aos="fade-up" data-aos-duration="1400">
                    <Col xs={12} md={6}>
                        <SummaryCard
                            title="Waiting Payment"
                            value={houses.waiting_payment}
                            icon={<LuCreditCard />}
                            accentClass="accent--waiting"
                            iconClass="icon--waiting"
                            description="Iklan menunggu konfirmasi pembayaran"
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <SummaryCard
                            title="Processing"
                            value={houses.processing}
                            icon={<LuLoaderCircle />}
                            accentClass="accent--processing"
                            iconClass="icon--processing"
                            description="Iklan sedang dalam proses pengerjaan"
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
