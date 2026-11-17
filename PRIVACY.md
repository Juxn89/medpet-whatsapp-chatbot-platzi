# Política de privacidad — MedPet WhatsApp Chatbot

_Última actualización: 17 de noviembre de 2026_

MedPet WhatsApp Chatbot es un proyecto **educativo**, desarrollado como parte de un curso de Platzi. "MedPet" es una tienda de mascotas ficticia; el bot no presta servicios comerciales ni veterinarios reales.

## Datos que recibimos

Cuando escribes al número de WhatsApp del bot, WhatsApp (Meta) nos envía:

- Tu número de teléfono de WhatsApp y tu nombre de perfil.
- El contenido de los mensajes que envías y los botones que seleccionas.

## Cómo usamos los datos

- **Responder tus mensajes** y mostrarte el menú de opciones.
- **Agendar una cita** (opción "Agendar"): guardamos tu número, tu nombre, el nombre y tipo de tu mascota, el motivo de la consulta y la fecha en una hoja de cálculo de Google Sheets administrada por el desarrollador del proyecto.
- **Responder consultas** (opción "Consultar"): el texto de tu pregunta se envía a la API de Claude (Anthropic) para generar una respuesta automática.

No vendemos, compartimos ni usamos tus datos con fines publicitarios.

## Servicios de terceros

- **Meta / WhatsApp Cloud API**: envío y recepción de mensajes.
- **Anthropic (Claude API)**: generación de respuestas a consultas.
- **Google Sheets**: registro de citas.

Cada servicio procesa los datos según su propia política de privacidad.

## Conservación

El estado de la conversación se guarda solo en memoria y se pierde al reiniciar el bot. Los registros de citas se conservan únicamente durante el curso y se eliminan al finalizarlo.

## Aviso importante

Las respuestas de la opción "Consultar" son generadas automáticamente por inteligencia artificial y **no sustituyen la atención de un veterinario profesional**. Ante una emergencia, acude a una clínica veterinaria.

## Eliminación de datos y contacto

Para solicitar la eliminación de tus datos o hacer preguntas sobre esta política, abre un issue en el repositorio del proyecto: <https://github.com/Juxn89/medpet-whatsapp-chatbot-platzi/issues>
