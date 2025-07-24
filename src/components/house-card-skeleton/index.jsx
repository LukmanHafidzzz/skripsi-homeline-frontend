import React, { useState, useEffect } from 'react';

import './style.css'

import Skeleton from 'react-loading-skeleton';

import { Card, Button } from 'react-bootstrap';

import { IoLocationOutline } from "react-icons/io5";
import { LuBath, LuBuilding, LuRuler } from "react-icons/lu";
import { MdOutlineBed } from "react-icons/md";
import { BsBadge3D } from "react-icons/bs";

export default function index() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Card style={{ width: "100%", maxWidth: "360px" }}>
            <div style={{ position: "relative" }}>
                {loading ? (
                    <Skeleton height={180} width="100%" />
                ) : (
                    <>
                        <Card.Img variant="top" src="/housephotos/example.jpg" />
                        <div className="badge-3d fs-2 text-white">
                            <BsBadge3D />
                        </div>
                    </>
                )}
            </div>

            <Card.Body>
                {/* Title */}
                <Card.Title className="mb-2 card-title-ellipsis">
                    {loading ? <Skeleton width="80%" height={20} /> : "Rumah Daerah Jakarta Selatan"}
                </Card.Title>

                <Card.Text>
                    {/* Lokasi */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                        {loading ? (
                            <Skeleton width={140} height={18} />
                        ) : (
                            <>
                                <IoLocationOutline /> Jakarta Selatan
                            </>
                        )}
                    </div>

                    {/* Detail Icon */}
                    <div className="fs-7 d-flex align-items-center gap-3 mb-4">
                        {loading ? (
                            <>
                                <Skeleton width={40} height={20} />
                                <Skeleton width={40} height={20} />
                                <Skeleton width={50} height={20} />
                                <Skeleton width={50} height={20} />
                            </>
                        ) : (
                            <>
                                <div className="d-flex align-items-center gap-1"><LuBath /> 2</div>
                                <div className="d-flex align-items-center gap-1"><MdOutlineBed /> 4</div>
                                <div className="d-flex align-items-center gap-1"><LuRuler /> 160m<sup>2</sup></div>
                                <div className="d-flex align-items-center gap-1"><LuBuilding /> 200m<sup>2</sup></div>
                            </>
                        )}
                    </div>

                    {/* Harga */}
                    <div className="fw-bold fs-5 mb-2">
                        {loading ? <Skeleton width={120} height={24} /> : "Rp 550.000.000"}
                    </div>

                    {/* Button */}
                    {loading ? (
                        <Skeleton height={40} width="100%" borderRadius={8} />
                    ) : (
                        <Button className="w-100 detail-btn">Detail</Button>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
