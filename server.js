const express = require('express')
require("dotenv").config();
const app = express()
app.use(express.json())
app.use(express.static("public"))
const PORT = process.env.PORT || 3000
app.post("/chat", async (req, res) =>{
    try{
        const userMessage = req.body.message;
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {role: "system", content:"You are a kind and emotional intelligent assistant"},
                    {role: "user", content: userMessage}
                ]
            })
        })
        const data = await response.json();
        const reply = data.choices[0].message.content;
        res.json({reply});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

app.listen(PORT, ()=>{console.log("localhost: 3000")});

