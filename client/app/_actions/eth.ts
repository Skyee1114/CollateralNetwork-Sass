'use server'

import axios from "axios";

export async function getEthValue() {
    try { 
        const config = {
            headers: {
            'Content-Type': 'application/json',
            "x-functions-key": process.env.NEXT_PUBLIC_ETHPRICE_KEY,
            },
        };     
        const res = await axios.get('https://ico-creator-saas.azurewebsites.net/api/SaasIcoProgress', config);   
        return res.data;

    } catch (err: any) {       
        const errors = err.response?.data.errors || ['An unexpected error occurred'];
        throw errors[0];     
    }
};