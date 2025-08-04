import React, { useState, useEffect } from 'react';
import './style.css'
import Skeleton from 'react-loading-skeleton';
import { Card, Button } from 'react-bootstrap';
import { IoLocationOutline } from "react-icons/io5";
import { LuBath, LuBuilding, LuRuler } from "react-icons/lu";
import { MdOutlineBed } from "react-icons/md";
import { BsBadge3D } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function HouseCard({ house }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const bathroom = house.house_facilities?.find(f => f.facility_id === 1);
    const bedroom = house.house_facilities?.find(f => f.facility_id === 2);

    return (
        <Card style={{ width: "100%", maxWidth: "360px" }}>
            <div style={{ position: "relative" }}>
                {loading ? (
                    <Skeleton height={180} width="100%" />
                ) : (
                    <>
                        <Card.Img
                            variant="top"
                            src={`/housephotos/${house.house_photos[0].photo}`}
                        />
                        {house.use_3d === "yes" && (
                            <div className="badge-3d fs-2 text-white">
                                <BsBadge3D />
                            </div>
                        )}
                    </>
                )}
            </div>

            <Card.Body>
                <Card.Title className="mb-2 card-title-ellipsis">
                    {loading ? <Skeleton width="80%" height={20} /> : house.title}
                </Card.Title>

                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        {loading ? (
                            <Skeleton width={140} height={18} />
                        ) : (
                            <>
                                <IoLocationOutline /> {house.address.city}
                            </>
                        )}
                    </div>

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
                                <div className="d-flex align-items-center gap-1"><LuBath /> {bathroom.quantity}</div>
                                <div className="d-flex align-items-center gap-1"><MdOutlineBed /> {bedroom.quantity}</div>
                                <div className="d-flex align-items-center gap-1"><LuRuler /> {house.land_area}m<sup>2</sup></div>
                                <div className="d-flex align-items-center gap-1"><LuBuilding /> {house.building_area}m<sup>2</sup></div>
                            </>
                        )}
                    </div>

                    <div className="fw-bold fs-5 mb-2">
                        {loading ? <Skeleton width={120} height={24} /> : `Rp ${parseInt(house.price).toLocaleString("id-ID")}`}
                    </div>

                    {loading ? (
                        <Skeleton height={40} width="100%" borderRadius={8} />
                    ) : (
                        <Link to={`./detail/${house.id}`}>
                            <Button className='w-100 detail-btn'>Detail</Button>
                        </Link>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
