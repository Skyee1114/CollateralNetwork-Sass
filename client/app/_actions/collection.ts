import api from "../_utils/api";

interface Collectiondata {
    collectionName: string;
    marketplaceLink: string;
    socialLink: string;
    assetLink: string;
}

export async function uploadCollection({ collectionName, marketplaceLink, socialLink, assetLink }: Collectiondata) {
    try {
        const res = await api.post('/collection/uploadcollection', { collectionName, marketplaceLink, socialLink, assetLink }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function getCollectionList() {
    try {      
        const res = await api.get('/collection/getcollectionlist');   
        return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function getUserCollectionList() {
    try {
        const res = await api.post('/collection/getusercollectionlist'); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function updateCollectionStatus({ id, allowed }: {id: string, allowed: number}) {
    try {
        const res = await api.post('/collection/updatecollectionstatus', { id, allowed }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};