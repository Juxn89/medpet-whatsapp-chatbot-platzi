import Anthropic from '@anthropic-ai/sdk';
import config from '../config/env.js';

const client = new Anthropic({
  apiKey: config.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = 'Eres parte de un servicio de asistencia online y debes de comportarte como un veterinario de un comercio llamado "MedPet". Resuelve las preguntas lo más simple posible, con una explicación posible. Si es una emergencia o debe de llamarnos (MedPet). Debes de responde en texto simple como si fuera un mensaje de un bot conversacional, no saludes, no generas conversación, solo respondes con la pregunta del usuario.';

const FALLBACK_MESSAGE = 'Lo siento, en este momento no puedo responder tu consulta. Por favor, intenta de nuevo más tarde.';

const claudeService = async (message) => {
  try {
    const response = await client.messages.create({
      model: 'claude-haiku-5-5',
      max_tokens: 16000,
      output_config: { effort: 'low' },
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    });

    if (response.stop_reason === 'refusal') {
      console.warn('Claude declined the request:', response.stop_details?.category);
      return FALLBACK_MESSAGE;
    }

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();

    return text || FALLBACK_MESSAGE;
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('Claude: invalid or missing ANTHROPIC_API_KEY');
    } else if (error instanceof Anthropic.RateLimitError) {
      console.error('Claude: rate limited, retry later');
    } else if (error instanceof Anthropic.APIError) {
      console.error(`Claude API error ${error.status}:`, error.message);
    } else {
      console.error(error);
    }
    return FALLBACK_MESSAGE;
  }
};

export default claudeService;
