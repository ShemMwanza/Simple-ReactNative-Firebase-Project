import { REACT_APP_consumerKey, REACT_APP_consumerSecret } from '../Keys';
import axios from 'axios';
window.Buffer = window.Buffer || require("buffer").Buffer;

const consumer_key = REACT_APP_consumerKey;
const consumer_secret = REACT_APP_consumerSecret;

const LipaNaMpesa = async (phone_number) => {
    const proxy = "https://proxy.cors.sh";
    const auth = new Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64");

    try {

        const tokenData = await axios.get(
            `${proxy}/https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Basic ${auth}`,
                },
            }
        );

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${tokenData.data.access_token}`);

        fetch(proxy + "/https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            method: 'POST',
            headers,
            body: JSON.stringify({
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwMTIyMjI1MTE1",
                "Timestamp": "20230122225115",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": 1,
                "PartyA": phone_number,
                "PartyB": 174379,
                "PhoneNumber": phone_number,
                "CallBackURL": "https://mydomain.com/path",
                "AccountReference": "React-Firebase Project",
                "TransactionDesc": "Buy Goods and Services",
                "CheckoutRequestID": "ws_CO_DMZ_123212312_2342347678234"
            })
        }
        ).catch(() => {
            alert("There is a problem, try again later!")
        })
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}
export {
    LipaNaMpesa
}
