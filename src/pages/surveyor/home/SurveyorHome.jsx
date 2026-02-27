import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SummaryCard from '../../../components/summary-card/SummaryCard'
import { LuClipboardList, LuSearchCheck, LuClipboardCheck, LuBadgeCheck, LuScanSearch, LuPencilLine } from 'react-icons/lu'
import axios from 'axios'

export default function SurveyorHome() {
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

    useEffect(() => {
        axios.get(`http://localhost:5773/api/surveyor/count-survey`,
            { withCredentials: true })
            .then(res => setHouseSurveyProcesses(res.data))
            .catch(err => console.error(err))
    }, [])
    return (
        <>
            <Container>
                <div className="" data-aos="fade-up" data-aos-duration="800">
                    <div className="dashboard-section__title">Overview Survey</div>
                    <div className="dashboard-section__subtitle">Ringkasan survey dan input data properti</div>
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
            </Container>
        </>
    )
}
