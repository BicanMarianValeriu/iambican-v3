import React, { useEffect } from 'react';
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router';

type ProtectedProps = {
  children: React.ReactNode
  fallbackUrl?: string
}

const Protected = ({ children, fallbackUrl = '/login/' }: ProtectedProps) => {
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
