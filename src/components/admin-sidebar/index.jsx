import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'
import { IoHomeOutline, IoQrCodeOutline } from 'react-icons/io5'
import { BsHouses } from 'react-icons/bs'
import { LiaMapSolid } from 'react-icons/lia'
import { LuClipboardList, LuFileInput, LuPaintbrush } from 'react-icons/lu'
import { FaRegEdit } from 'react-icons/fa'

export default function index() {
    return (
        <>
            <div className="mb-4">
                <div className='text-secondary fw-medium mb-2'>Beranda</div>
                <NavLink
                    to='/admin'
                    end
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <IoHomeOutline /> Beranda
                </NavLink>
            </div>
            <div className="mb-4">
                <div className='text-secondary fw-medium mb-2'>Rumah</div>
                <NavLink
                    to='house-list'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <BsHouses /> List Rumah
                </NavLink>
                <NavLink
                    to='checking'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <IoHomeOutline /> Checking Awal
                </NavLink>
                <NavLink
                    to='input-qr'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <IoQrCodeOutline /> Input QR
                </NavLink>
                <NavLink
                    to='payment-confirm'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <FaRegEdit /> Konfirmasi Pembayaran
                </NavLink>
                <NavLink
                    to='embed-map'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <LiaMapSolid /> Embed Map
                </NavLink>
            </div>
            <div className='mb-4'>
                <div className='text-secondary fw-medium mb-2'>Request</div>
                <NavLink
                    to='request-desain-approval'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <LuPaintbrush /> Desain
                </NavLink>
                <NavLink
                    to='request-survey-approval'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <LuClipboardList /> Survey
                </NavLink>
            </div>
            <div className='mb-4'>
                <div className='text-secondary fw-medium mb-2'>Survey</div>
                <NavLink
                    to='survey-list-house'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <BsHouses /> List Rumah
                </NavLink>
                <NavLink
                    to='survey-input'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <LuFileInput /> Hasil Input
                </NavLink>
            </div>
            <div className='mb-4'>
                <div className='text-secondary fw-medium mb-2'>Desain</div>
                <NavLink
                    to='design-list-house'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <BsHouses /> List Rumah
                </NavLink>
                <NavLink
                    to='design-input'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <LuFileInput /> Hasil Input
                </NavLink>
            </div>
        </>
    )
}
