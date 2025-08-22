const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// OpenAI Chat API proxy
app.post('/api/chat', async (req, res) => {
    try {
        const { message, context } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        // Prepare system message for federal contracting context
        const systemMessage = `You are an AI assistant specializing in federal subcontracting opportunities and government procurement. 
        You help users understand contract vehicles, prime contractors, cost strategies, and market analysis for federal contracting.
        Provide accurate, actionable insights and recommendations. Keep responses concise but informative.
        Focus on practical advice for subcontractors looking to work with federal prime contractors.`;

        const messages = [
            { role: 'system', content: systemMessage },
            { role: 'user', content: message }
        ];

        // Add context if provided
        if (context) {
            messages.splice(1, 0, { role: 'system', content: `Context: ${context}` });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o', // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
                messages: messages,
                max_tokens: 500,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI API error:', errorData);
            return res.status(response.status).json({ 
                error: 'Failed to get AI response',
                details: errorData.error?.message || 'Unknown error'
            });
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

        res.json({ response: aiResponse });

    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

// Serve the main SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log('Set OPENAI_API_KEY environment variable for AI chat functionality');
});
