import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SummaryCard from '../../../components/summary-card/SummaryCard'
import { LuHouse, LuCircleCheck, LuCircleX, LuClock, LuCreditCard, LuLoaderCircle, LuClipboardList, LuSearchCheck, LuClipboardCheck, LuBadgeCheck, LuScanSearch, LuPencilLine } from 'react-icons/lu'
import axios from 'axios'

export default function AdminHome() {
    const [houses, setHouses] = useState({
        total: 0,
        approved: 0,
        rejected: 0,
        pending: 0,
        waiting_payment: 0,
        processing: 0,
    })

    const [houseSurveyProcesses, setHouseSurveyProcesses] = useState({
        survey_process: {
            perlu_survey: 0,
            sedang_survey: 0,
            survey_selesai: 0,
        },
        survey_status_input: {
            approved: 0,
            pengecekan_hasil: 0,
            revisi: 0,
        }
    })

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
        axios.get(`http://localhost:5773/api/admin/home/count-house`, { withCredentials: true })
            .then(res => setHouses(res.data))
            .catch(err => console.error(err))

        axios.get(`http://localhost:5773/api/admin/home/count-survey`, { withCredentials: true })
            .then(res => setHouseSurveyProcesses(res.data))
            .catch(err => console.error(err))

        axios.get(`http://localhost:5773/api/admin/home/count-design`, { withCredentials: true })
            .then(res => setHouseDesignProcesses(res.data))
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

                <div className="mt-5" data-aos="fade-up" data-aos-duration="800">
                    <div className="dashboard-section__title">Proses Survey</div>
                    <div className="dashboard-section__subtitle">Ringkasan status survey dan input data properti</div>
                </div>

                <Row className="g-3 mt-3" data-aos="fade-up" data-aos-duration="1000">
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Perlu Survey"
                            value={houseSurveyProcesses.survey_process.perlu_survey}
                            icon={<LuClipboardList />}
                            accentClass="accent--pending"
                            iconClass="icon--pending"
                            description="Properti yang belum disurvey"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Sedang Survey"
                            value={houseSurveyProcesses.survey_process.sedang_survey}
                            icon={<LuScanSearch />}
                            accentClass="accent--waiting"
                            iconClass="icon--waiting"
                            description="Properti yang sedang dalam proses survey"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Survey Selesai"
                            value={houseSurveyProcesses.survey_process.survey_selesai}
                            icon={<LuClipboardCheck />}
                            accentClass="accent--approved"
                            iconClass="icon--approved"
                            description="Properti yang telah selesai disurvey"
                        />
                    </Col>
                </Row>

                <Row className="g-3 mt-1 mb-4" data-aos="fade-up" data-aos-duration="1200">
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Approved"
                            value={houseSurveyProcesses.survey_status_input.approved}
                            icon={<LuBadgeCheck />}
                            accentClass="accent--approved"
                            iconClass="icon--approved"
                            description="Input data properti telah disetujui"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Pengecekan Hasil"
                            value={houseSurveyProcesses.survey_status_input.pengecekan_hasil}
                            icon={<LuSearchCheck />}
                            accentClass="accent--processing"
                            iconClass="icon--processing"
                            description="Input data perlu dilakukan pengecekan"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <SummaryCard
                            title="Revisi"
                            value={houseSurveyProcesses.survey_status_input.revisi}
                            icon={<LuPencilLine />}
                            accentClass="accent--rejected"
                            iconClass="icon--rejected"
                            description="Input data perlu diperbaiki"
                        />
                    </Col>
                </Row>

                <div className="mt-5" data-aos="fade-up" data-aos-duration="800">
                    <div className="dashboard-section__title">Proses Desain</div>
                    <div className="dashboard-section__subtitle">Ringkasan status desain dan input desain properti</div>
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
                            description="Input desain properti perlu dilakukan pengecekan"
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
