const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}));

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: message }]
        });

        const reply = response.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ reply: "حدث خطأ أثناء الاتصال بـ OpenAI" });
    }
});

app.listen(3000, () => {
    console.log('🚀 الخادم يعمل على http://localhost:3000');
});