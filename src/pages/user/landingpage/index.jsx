import React from 'react'

import HouseCard from '../../../components/house-card/index'

export default function index() {
    return (
        <>
            <div className='d-flex flex-wrap justify-content-between'>
                <HouseCard />
                <HouseCard />
                <HouseCard />
            </div>
        </>
    )
}
