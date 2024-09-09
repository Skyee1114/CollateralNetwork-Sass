import api from "../_utils/api";

interface Assetdata {
    nft: any;
    estimatedAssetValue: string;
    loanAmount: string;
    loanTermMonths: string;
    loanRate: string;
}

export async function listAsset({ nft, estimatedAssetValue, loanAmount, loanTermMonths, loanRate }: Assetdata) {
    try {
        const res = await api.post('/nft/listasset', { nft, estimatedAssetValue, loanAmount, loanTermMonths, loanRate }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function getAssetsList() {
    try {      
        const res = await api.get('/nft/getassetslist');   
        return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function getUserAssetsList() {
    try {      
        const res = await api.get('/nft/getuserassetslist');   
        return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function stageAsset({ tokenid, tokenaddress, stage, amend }: { tokenid: string, tokenaddress: string, stage: number, amend: string }) {
    try {        
        const res = await api.post('/nft/stageasset', { tokenid, tokenaddress, stage, amend }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function updateAsset({ tokenid, tokenaddress, estimatedAssetValue, loanAmount, loanRate, loanTermMonths }: { tokenid: string, tokenaddress: string, estimatedAssetValue: string, loanAmount: string, loanRate: string, loanTermMonths: string }) {
    try {        
        const res = await api.post('/nft/updateandlistasset', { tokenid, tokenaddress, estimatedAssetValue, loanAmount, loanRate, loanTermMonths }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function getMarketplaceAssets() {
    try {      
      const res = await api.get('/nft/getmarketplaceassets');   
      return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function getDashboardMarketplaceInformation() {
    try {      
      const res = await api.get('/nft/getdashboardmarketplaceinformation');   
      return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function getMarketplaceBidAsset({id}: {id: string}) {
    try {      
      const res = await api.post('/nft/getmarketplacebidasset', { id });   
      return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function bid({ tokenid, tokenaddress, bidamount }: {tokenid: string, tokenaddress: string, bidamount: string}) {
    try {      
      const res = await api.post('/nft/bid', { tokenid, tokenaddress, bidamount });   
      return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function getBidofAsset({id}: {id: string}) {
    try {      
      const res = await api.post('/nft/getbidofasset', { id });   
      return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};