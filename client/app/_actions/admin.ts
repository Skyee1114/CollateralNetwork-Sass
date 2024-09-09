import api from '../_utils/api';

export async function getUsers() {
    try {
        const res = await api.post('/admin/getusers'); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];           
    }
};

export async function getICOs() {
    try {
        const res = await api.post('/admin/geticos'); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};


export async function getClaimedICO() {
    try {
        const res = await api.post('/admin/getclaimedico'); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function distributeICO({walletaddress, distributionTransaction}: {walletaddress: string, distributionTransaction: string}) {
    try {
        const res = await api.post('/admin/distributeico', {walletaddress, distributionTransaction}); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function updateICO({previouswalletaddress, newwalletaddress, purchasedtoken, bonustoken}: {previouswalletaddress: string, newwalletaddress: string, purchasedtoken: number, bonustoken: number}) {
    try {
        const res = await api.post('/admin/updateico', {previouswalletaddress, newwalletaddress, purchasedtoken, bonustoken}); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

