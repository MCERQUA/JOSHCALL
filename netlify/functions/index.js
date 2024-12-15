const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const input = event.queryStringParameters.Body;
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2' // Add this header
        },
        body: JSON.stringify({
            prompt: input,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const openaiResponse = data.choices[0].text;

    return {
        statusCode: 200,
        headers: {"Content-Type": "application/xml"},
        body: `<Response><Say>${openaiResponse}</Say></Response>`,
    };
}