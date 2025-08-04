import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function ProtectedRoute({ children, allowedLevels }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5773/api/auth/me', {
                    withCredentials: true,
                });
                setUser(res.data);

                if (allowedLevels.includes(res.data.level_user_id)) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                setUser(null);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [allowedLevels]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/auth/login" />;
    }

    if (!isAuthorized) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
}