import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
});

export const aiResponse = async (prompt: string, onChunk: (text: string) => void) => {


    const stream = await openRouter.chat.send({
        chatRequest: {
            model: 'openai/gpt-oss-120b:free',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        }
    }); 

    for await (const chunk of stream) {
        // Accessing the content safely
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
            onChunk(content);
        }
    }
}

