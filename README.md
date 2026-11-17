# MedPet — ChatBot de WhatsApp para veterinaria

Repositorio del **Curso de ChatBot con WhatsApp API** de Platzi.

MedPet es un chatbot para una clínica veterinaria que atiende a los clientes por WhatsApp. Se construye con un servidor **Node.js + Express** conectado a la **WhatsApp Cloud API** de Meta.

## Stack

- Node.js (ES Modules)
- Express
- WhatsApp Cloud API (Meta)
- Claude API (Anthropic) para responder consultas
- Google Sheets para registrar citas

## Configuración

Copia `.env.example` a `.env`, completa los valores y arranca con `pnpm start`.

Para configurar Meta (webhook, número de prueba, tokens) y resolver errores comunes, revisa **[docs/configuracion-meta.md](docs/configuracion-meta.md)**. Incluye un paso que el panel de Meta no muestra y sin el cual no llegan los mensajes.

## Progreso

- [ ] Clase 8 — Configuración de un servidor con Express y GitHub para Veterinaria
