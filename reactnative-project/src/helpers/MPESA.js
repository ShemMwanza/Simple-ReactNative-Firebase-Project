import { REACT_APP_consumerKey, REACT_APP_consumerSecret } from '../../firebase/keys';
import axios from 'axios';
import { encode, decode } from 'base-64';

const consumer_key = REACT_APP_consumerKey;
const consumer_secret = REACT_APP_consumerSecret;

const encodeBase64 = (str) => {
    return encode(str);
};

const LipaNaMpesa = async (phone_number) => {
    try {
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3); // Generate timestamp in the format YYYYMMDDHHMMSS
        const auth = encodeBase64(`${consumer_key}:${consumer_secret}`);

        // Step 1: Generate access token
        const tokenResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
        });

        const accessToken = tokenResponse.data.access_token;

        // Step 2: Initiate Lipa Na M-Pesa Express request
        const payload = {
            BusinessShortCode: 174379,
            Password: generateLipaNaMpesaPassword(timestamp),
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: 1,
            PartyA: phone_number,
            PartyB: 174379,
            PhoneNumber: phone_number,
            CallBackURL: 'https://example.com/callback',
            AccountReference: 'React-Firebase Project',
            TransactionDesc: 'Buy Goods and Services',
            CheckoutRequestID: 'ws_CO_DMZ_123212312_2342347678234',
        };

        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log(response.data); // Handle the response data here

    } catch (error) {
        console.log(error);
        throw new Error('Failed to initiate Lipa Na M-Pesa request');
    }
};

// Function to generate Lipa Na M-Pesa password
const generateLipaNaMpesaPassword = (timestamp) => {
    const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    const shortcode = 174379;
    const password = encodeBase64(`${shortcode}${passkey}${timestamp}`);
    return password;
};

export {
    LipaNaMpesa
};
