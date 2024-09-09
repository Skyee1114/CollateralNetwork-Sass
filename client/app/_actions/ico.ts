import api from "../_utils/api";

export async function getICO({ walletaddress }: {walletaddress: string}) {
    try {
        const res = await api.post('/ico/getico', { walletaddress }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};

export async function claimICO({ from, to, transactionHash }: {from: string, to: string, transactionHash: string}) {
    try {
        const res = await api.post('/ico/claimico', { from, to, transactionHash }); 
        return res.data;
        
    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};




