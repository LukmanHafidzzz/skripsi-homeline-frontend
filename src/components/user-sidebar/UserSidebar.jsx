import React from 'react'
import { Card } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import './style.css'
import MdOutlinePendingActions from 'react-icons/md/MdOutlinePendingActions'
import FaRegPenToSquare from 'react-icons/fa6/FaRegPenToSquare'
import IoAdd from 'react-icons/io5/IoAdd'
import IoHomeOutline from 'react-icons/io5/IoHomeOutline'
import IoTrashOutline from 'react-icons/io5/IoTrashOutline'
import CiCreditCard1 from 'react-icons/ci/CiCreditCard1'
import ImSpinner2 from 'react-icons/im/ImSpinner2'
import BsClipboard2Check from 'react-icons/bs/BsClipboard2Check'
import BsClipboard2X from 'react-icons/bs/BsClipboard2X'

export default function UserSidebar() {
    return (
        <>
            <Card className='p-4'>
                <div className="mb-4">
                    <div className='text-secondary fw-medium mb-2'>Beranda</div>
                    <NavLink
                        to='/advertisement'
                        end
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <IoHomeOutline /> Beranda
                    </NavLink>
                </div>
                <div className='mb-4'>
                    <div className='text-secondary fw-medium mb-2'>Status Iklan</div>
                    <NavLink
                        to='waiting'
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <MdOutlinePendingActions /> Menunggu
                    </NavLink>
                    <NavLink
                        to="need-approval"
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <FaRegPenToSquare /> Butuh Persetujuan
                    </NavLink>
                    <NavLink
                        to='processing'
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <ImSpinner2 /> Diproses
                    </NavLink>
                    <NavLink
                        to='waiting-payment'
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <CiCreditCard1 /> Menunggu Pembayaran
                    </NavLink>
                    <NavLink
                        to='rejected'
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <BsClipboard2X /> Ditolak
                    </NavLink>
                    <NavLink
                        to='approved'
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <BsClipboard2Check /> Disetujui
                    </NavLink>
                </div>
                <div className=''>
                    <div className='text-secondary fw-medium mb-2'>Iklan</div>
                    <NavLink
                        to='add'
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <IoAdd /> Tambah Iklan
                    </NavLink>
                    <NavLink
                        to='delete'
                        className={({ isActive }) =>
                            `text-decoration-none px-4 py-3 mb-1 text-black rounded-2 sub-menu gap-2 d-flex align-items-center ${isActive ? 'active-menu' : ''}`
                        }
                    >
                        <IoTrashOutline /> Hapus Iklan
                    </NavLink>
                </div>
            </Card>
        </>
    )
}
