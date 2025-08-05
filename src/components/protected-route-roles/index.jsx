import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const index = ({ allowedRoles }) => {
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('https://skripsi-homeline-backend.vercel.app/api/auth/me', {
                    withCredentials: true,
                });
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setChecking(false);
            }
        };
        fetchUser();
    }, []);

    if (checking) return <div>Loading...</div>;

    if (!user) return <Navigate to="/auth/login" />;
    if (!allowedRoles.includes(user.level_user_id)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default index;
