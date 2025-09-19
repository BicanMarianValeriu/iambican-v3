import React, { useEffect } from 'react';
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router';

const Protected = ({ children, fallbackUrl = '/login/' }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            return;
        }

        navigate(fallbackUrl);
    }, [token, navigate, fallbackUrl]);

    return <>{children}</>;
}

export default Protected;
