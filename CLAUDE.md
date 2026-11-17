# CLAUDE.md

Bot de WhatsApp "MedPet" (tienda/veterinaria ficticia) del curso de Platzi. Node.js (ESM) + Express, WhatsApp Cloud API de Meta, Claude Haiku 5.5 para la opción "Consultar" y Google Sheets para "Agendar".

## Comandos

- `pnpm start` → `nodemon src/app.js`. **No usar npm**: `devEngines` exige pnpm (`EBADDEVENGINES`).
- nodemon solo vigila `src/`. Después de editar `.env` hay que escribir `rs` en su terminal.

## Estructura

- `src/app.js` — entrada; `src/config/env.js` — variables del `.env`.
- `src/controllers/webhookController.js` — recibe el webhook y registra `[webhook] ...`.
- `src/services/messageHandler.js` — flujo del menú (`option_1`…`option_6`).
- `src/services/claudeService.js` — consultas a Claude; `googleSheetsService.js` — citas en la pestaña `reservas`.
- `src/services/httpRequest/sendToWhatsApp.js` — envíos a Graph API; registra `[whatsapp] Sent ...` / `[whatsapp] API error ...`.

## Configuración de Meta — leer antes de cambiar algo en la app

Guía completa y tabla de errores: [docs/configuracion-meta.md](docs/configuracion-meta.md). Lo esencial:

- **Mantener la app en Development. No sugerir pasarla a Live**: en Live los envíos fallan con `131005` / `#10` (requiere App Review). En Development recibe y responde.
- **Dos palomitas en WhatsApp pero nada en el log** → casi siempre falta suscribir la app a la cuenta de WhatsApp Business: `GET`/`POST /{WABA_ID}/subscribed_apps` (WABA_ID = "Messaging account ID" en _Step 1. Try it out_). Configurar el webhook no basta.
- El túnel de VS Code (puerto 3000) debe estar en **Public**.
- Los tokens del panel duran 1–24 h → `401 code 190`. Verificar con `debug_token` antes de tocar código.

## Reglas

- Nunca imprimir valores de `.env` ni de `src/credentials/credentials.json` (está en `.gitignore`); al diagnosticar, mostrar solo si existen y su longitud.
- No enviar mensajes reales de WhatsApp para probar sin confirmación del usuario.
