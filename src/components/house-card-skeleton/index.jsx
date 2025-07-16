import React, { useState, useEffect } from 'react';

import './style.css'

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Card, Button } from 'react-bootstrap';

import { IoLocationOutline } from "react-icons/io5";
import { LuBath, LuBuilding, LuRuler } from "react-icons/lu";
import { MdOutlineBed } from "react-icons/md";

export default function index() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Card style={{ width: '18rem' }}>
            {loading ? (
                <Skeleton height={180} /> 
            ) : (
                <Card.Img variant="top" src="housephotos/example.jpg" />
            )}

            <Card.Body>
                <Card.Title className="mb-2 card-title-ellipsis">
                    {loading ? <Skeleton width={150} /> : "Rumah Daerah Jakarta Selatan"}
                </Card.Title>

                <Card.Text>
                    <div className="d-flex align-items-center gap-2 mb-2">
                    {loading ? <Skeleton width={140} height={20} /> : (<><IoLocationOutline /> Jakarta Selatan</>)}
                    </div>

                    <div className="fs-7 d-flex align-items-center gap-3 mb-4">
                        {loading ? (
                            <Skeleton width={200} />
                        ) : (
                            <>
                                <div className="d-flex align-items-center gap-1"><LuBath /> 2</div>
                                <div className="d-flex align-items-center gap-1"><MdOutlineBed /> 4</div>
                                <div className="d-flex align-items-center gap-1"><LuRuler /> 160m²</div>
                                <div className="d-flex align-items-center gap-1"><LuBuilding /> 200m²</div>
                            </>
                        )}
                    </div>

                    <div className="fw-bold fs-5 mb-2">
                        {loading ? <Skeleton width={120} /> : "Rp 550.000.000"}
                    </div>

                    {loading ? (
                        <Skeleton height={40} />
                    ) : (
                        <Button className="w-100 detail-btn">Detail</Button>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
