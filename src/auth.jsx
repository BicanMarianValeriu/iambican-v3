import React, { createContext, useContext, useReducer, useEffect, useLayoutEffect } from 'react';
import { requestApi } from './utils/wordpress';
import { isLocalhost } from './utils';
import { useCookie } from 'react-use';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

// Actions
const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_USER: 'SET_USER',
};

// Reducer
const initialState = {
    loading: null,
    user: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.payload };
        case ACTIONS.SET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

// Middleware
const loggerMiddleware = (dispatch) => (action) => {
    if (isLocalhost) {
        console.log('Dispatching action:', action);
    }
    dispatch(action);
};

// Context
const AuthContext = createContext();

// AuthProvider
export const AuthProvider = ({ children }) => {
    const [token, setToken, removeToken] = useCookie('jwtToken', { expires: 30, secure: true, sameSite: 'Strict' });
    const [state, dispatch] = useReducer(reducer, initialState);
    const enhancedDispatch = loggerMiddleware(dispatch);

    const actions = {
        setLoading: (isLoading) => {
            enhancedDispatch({ type: ACTIONS.SET_LOADING, payload: isLoading });
        },
        setUser: (data) => {
            enhancedDispatch({ type: ACTIONS.SET_USER, payload: data });
        },
        logout: () => {
            enhancedDispatch({ type: ACTIONS.SET_USER, payload: null });
            removeToken();
            toast.info('Ai fost dezautentificat.');
        },
        setToken,
        removeToken
    };

    useEffect(() => {
        if (token) {
            const fetchMe = async () => {
                actions.setLoading(true);

                if (!isTokenExpired(token)) {
                    try {
                        const { data } = await requestApi.get('wp/v2/users/me', {
                            params: { context: 'edit' }
                        });
                        actions.setUser(data);
                    } catch (error) {
                        toast.error('Ceva nu a mers bine - incearcă din nou.');
                        actions.logout();
                    } finally {
                        actions.setLoading(false);
                    }
                } else {
                    toast.info('Sesiunea a expirat.');
                    actions.logout();
                }
            };

            fetchMe();
        }
        // eslint-disable-next-line
    }, [token]);

    useLayoutEffect(() => {
        const authInterceptor = requestApi.interceptors.request.use((config) => {
            config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
            return config;
        });

        return (() => {
            requestApi.interceptors.request.eject(authInterceptor);
        });

    }, [token]);

    useLayoutEffect(() => {
        const refreshInterceptor = requestApi.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const { data } = await requestApi.post('jwt-auth/v1/token/refresh', {}, {
                        headers: {
                            Cookie: `refresh_token=${token}`,
                        }
                    });

                    setToken(data.token);

                    originalRequest.headers.Authorization = `Bearer ${data.token}`;

                    return requestApi(originalRequest);
                } catch (error) {
                    toast.info('Ceva nu a mers bine.');
                    actions.logout();
                }
            }

            return Promise.reject(error);
        });

        return (() => {
            requestApi.interceptors.response.eject(refreshInterceptor);
        });

        // eslint-disable-next-line
    }, [token]);

    return (
        <AuthContext.Provider value={{ ...{ ...state, token }, actions }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

// Check if token expired
export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};