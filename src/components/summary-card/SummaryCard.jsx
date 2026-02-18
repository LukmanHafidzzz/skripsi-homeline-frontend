import React from 'react';
import './style.css';
import { Card } from 'react-bootstrap';

export default function SummaryCard({ title, value, icon, accentClass, iconClass, description }) {
    return (
        <>
            <Card className="summary-card">
                <div className="summary-card__body">
                    <div className={`summary-card__accent ${accentClass}`} />
                    <div className="summary-card__content">
                        <p className="summary-card__title">{title}</p>
                        <h2 className="summary-card__value">{value}</h2>
                        <p className="summary-card__description">{description}</p>
                    </div>
                    <div className={`summary-card__icon-wrapper ${iconClass}`}>
                        {icon}
                    </div>
                </div>
            </Card>
        </>
    )
}
