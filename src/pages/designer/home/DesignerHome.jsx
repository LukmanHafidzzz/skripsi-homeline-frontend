import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SummaryCard from '../../../components/summary-card/SummaryCard'
import { LuHouse, LuCircleCheck, LuCircleX, LuClock, LuCreditCard, LuLoaderCircle, LuClipboardList, LuSearchCheck, LuClipboardCheck, LuBadgeCheck, LuScanSearch, LuPencilLine } from 'react-icons/lu'
import axios from 'axios'

export default function DesignerHome() {
    const [houseDesignProcesses, setHouseDesignProcesses] = useState({
        design_process: {
            perlu_desain: 0,
            sedang_desain: 0,
            desain_selesai: 0,
        },
        design_status_input: {
            approved: 0,
            pengecekan_hasil: 0,
            revisi: 0,
        }
    })

    useEffect(() => {
        axios.get(`https://skripsi-homeline-backend.vercel.app/api/admin/home/count-design`, { withCredentials: true })
            .then(res => setHouseDesignProcesses(res.data))
            .catch(err => console.error(err))
    }, [])
    return (
        <>
            <Container>
                <div className="" data-aos="fade-up" data-aos-duration="800">
                    <div className="dashboard-section__title">Overview Desain</div>
                    <div className="dashboard-section__subtitle">Ringkasan desain dan input desain properti</div>
                </div>

                <Row className="g-3 mt-3" data-aos="fade-up" data-aos-duration="1000">
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Perlu Desain"
                            value={houseDesignProcesses.design_process.perlu_desain}
                            icon={<LuClipboardList />}
                            accentClass="accent--pending"
                            iconClass="icon--pending"
                            description="Properti yang belum memiliki desain"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Sedang Desain"
                            value={houseDesignProcesses.design_process.sedang_desain}
                            icon={<LuScanSearch />}
                            accentClass="accent--waiting"
                            iconClass="icon--waiting"
                            description="Properti yang sedang dalam proses desain"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Desain Selesai"
                            value={houseDesignProcesses.design_process.desain_selesai}
                            icon={<LuClipboardCheck />}
                            accentClass="accent--approved"
                            iconClass="icon--approved"
                            description="Properti yang telah selesai desain"
                        />
                    </Col>
                </Row>

                <Row className="g-3 mt-1 mb-4" data-aos="fade-up" data-aos-duration="1200">
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Approved"
                            value={houseDesignProcesses.design_status_input.approved}
                            icon={<LuBadgeCheck />}
                            accentClass="accent--approved"
                            iconClass="icon--approved"
                            description="Input desain properti telah disetujui"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Pengecekan Hasil"
                            value={houseDesignProcesses.design_status_input.pengecekan_hasil}
                            icon={<LuSearchCheck />}
                            accentClass="accent--processing"
                            iconClass="icon--processing"
                            description="Input desain properti memerlukan pengecekan"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Revisi"
                            value={houseDesignProcesses.design_status_input.revisi}
                            icon={<LuPencilLine />}
                            accentClass="accent--rejected"
                            iconClass="icon--rejected"
                            description="Input desain properti perlu diperbaiki"
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
