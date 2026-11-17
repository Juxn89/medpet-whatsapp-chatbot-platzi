import config from '../config/env.js';
import messageHandler from '../services/messageHandler.js';

class WebhookController {
  async handleIncoming(req, res) {
    const value = req.body.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];
    const senderInfo = value?.contacts?.[0];
    const status = value?.statuses?.[0];

    if (message) {
      const content = message.text?.body ?? message.interactive?.button_reply?.id ?? '';
      console.log(`[webhook] Message from ${message.from} (${message.type}): ${content}`);
      try {
        await messageHandler.handleIncomingMessage(message, senderInfo);
      } catch (error) {
        console.error('[webhook] Error handling message:', error.message);
      }
    } else if (status?.status === 'failed') {
      const detail = status.errors?.map((e) => `${e.code} ${e.title}`).join('; ');
      console.error(`[webhook] Delivery failed to ${status.recipient_id}: ${detail}`);
    }
    res.sendStatus(200);
  }

  verifyWebhook(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === config.WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge);
      console.log('Webhook verified successfully!');
    } else {
      res.sendStatus(403);
    }
  }
}

export default new WebhookController();