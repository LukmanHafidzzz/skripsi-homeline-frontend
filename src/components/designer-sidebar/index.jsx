import React from 'react'
import { Card } from 'react-bootstrap'

import { Link, NavLink } from 'react-router-dom'

import './style.css'

import { BsHouses } from 'react-icons/bs'
import { LuClipboardPen, LuFileInput } from 'react-icons/lu'
import { IoHomeOutline } from 'react-icons/io5'

export default function index() {
    return (
        <>
            <div className="mb-4">
                <div className='text-secondary fw-medium mb-2'>Beranda</div>
                <NavLink
                    to='/designer'
                    end
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <IoHomeOutline /> Beranda
                </NavLink>
            </div>
            <div className='mb-4'>
                <div className='text-secondary fw-medium mb-2'>Desain</div>
                <NavLink
                    to='house-list'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <BsHouses /> List Rumah
                </NavLink>
                <NavLink
                    to='make-request'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <LuClipboardPen /> Buat Request
                </NavLink>
                <NavLink
                    to='input-house-model'
                    className={({ isActive }) =>
                        `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                    }
                >
                    <LuFileInput /> Input Hasil Design
                </NavLink>
            </div>
        </>
    )
}
