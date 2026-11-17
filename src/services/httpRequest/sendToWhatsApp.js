import axios from "axios";
import config from '../../config/env.js';

const sendToWhatsApp = async (data) => {
    const baseUrl = `${config.BASE_URL}/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`;
    const headers = {
        Authorization: `Bearer ${config.API_TOKEN}`
    };

    try {
        const response = await axios({
            method: 'POST',
            url: baseUrl,
            headers: headers,
            data,
        })
        if (data.to) {
            console.log(`[whatsapp] Sent ${data.type ?? 'text'} to ${data.to}`);
        }
        return response.data;
    } catch (error) {
        const apiError = error.response?.data?.error;
        const code = apiError?.code ? ` (code ${apiError.code})` : '';
        console.error(`[whatsapp] API error ${error.response?.status ?? ''}: ${apiError?.message ?? error.message}${code}`);
    }
};

export default sendToWhatsApp;