import api from '../_utils/api';

export async function twofa({ enabled }: {enabled: boolean}) {
    try {
        const res = await api.post('/profile/twofa', { enabled }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function savePersonName({ name }: {name: string}) {
    try {
        const res = await api.post('/profile/savepersonname', { name }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function updatePersonInformation({ firstname, lastname, dob, nationality }: {firstname: string, lastname: string, dob: string, nationality: string}) {
    try {
        const res = await api.post('/profile/updatepersoninformation', { firstname, lastname, dob, nationality }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function updateContactInformation({ email, phoneNumber }: {email: string, phoneNumber: string}) {
    try {
        const res = await api.post('/profile/updatecontactinformation', { email, phoneNumber }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function updateAddressInformation({ address1, address2, city, state, zip }: {address1: string, address2: string, city: string, state: string, zip: string}) {
    try {
        const res = await api.post('/profile/updateaddressinformation', { address1, address2, city, state, zip }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};
