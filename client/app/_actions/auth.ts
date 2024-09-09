import api from '../_utils/api';

export async function register({ email, name, password }: {email: string, name: string, password: string}) {
    try {
        const res = await api.post('/register', { email, name, password }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function verify({ token }: {token: string}) {
    try {
        const res = await api.post(`/verify/${token}`, { token }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];           
    }
};

export async function login({ email, password }: {email: string, password: string}) {
    try {
        const res = await api.post('/login', { email, password }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];       
    }
};

export async function logout() {
    try {
        const res = await api.get('/google/logout'); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];       
    }
};

export async function loadUser() {
    try {
        const res = await api.post('/loaduser'); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];           
    }
};

export async function verifyTwofa() {
    try {
        const res = await api.post('/login/verifytwofa'); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];           
    }
};

export async function verifyTwofaCode({ twofaCode }: {twofaCode: string}) {
    try {
        const res = await api.post('/login/verifytwofacode', { twofaCode }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};
