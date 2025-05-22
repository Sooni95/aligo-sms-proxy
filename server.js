const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/send-sms', async (req, res) => {
  const { receiver, msg, sender, userid, apikey } = req.body;

  try {
    const payload = new URLSearchParams({
      user_id: userid,
      key: apikey,
      sender,
      receiver,
      msg,
      msg_type: 'SMS'
    });

    const response = await axios.post('https://apis.aligo.in/send/', payload);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('Aligo SMS Proxy is running.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
