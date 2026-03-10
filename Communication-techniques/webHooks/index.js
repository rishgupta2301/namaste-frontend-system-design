const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;  

app.use(bodyParser.json());

// Endpoint to receive webhook payloads
app.post('/webhook', (req, res) => {
    
    // Extract the payload from the request body
    const payload = req.body;

    // Log the received payload for demonstration purposes
    console.log('Received webhook payload:', payload);

    // Respond to the sender to acknowledge receipt of the webhook
    res.status(200).send('Webhook received successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});