const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to the desired port number

// Parse JSON bodies
app.use(bodyParser.json());

// Handle POST requests to the callback URL
app.post('/callback', (req, res) => {
    // Extract the M-Pesa transaction details from the request body
    const {
        Body: {
            stkCallback: {
                MerchantRequestID,
                CheckoutRequestID,
                ResultCode,
                ResultDesc,
                CallbackMetadata,
            },
        },
    } = req.body;

    // Handle the M-Pesa transaction details as needed
    console.log('Received M-Pesa transaction details:');
    console.log('MerchantRequestID:', MerchantRequestID);
    console.log('CheckoutRequestID:', CheckoutRequestID);
    console.log('ResultCode:', ResultCode);
    console.log('ResultDesc:', ResultDesc);
    console.log('CallbackMetadata:', CallbackMetadata);

    // Send a response (optional)
    res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
