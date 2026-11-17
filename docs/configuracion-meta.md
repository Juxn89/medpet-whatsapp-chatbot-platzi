# Configuración de Meta (WhatsApp Cloud API) — guía y lecciones aprendidas

Pasos que sí hacen falta para que el bot reciba y responda mensajes con el **número de prueba** de Meta, y los errores que encontramos en el camino. El panel de Meta cambió respecto a los videos del curso, así que algunos pasos no aparecen en las clases.

_Basado en pruebas reales del 17 de noviembre de 2026 (API v27.0)._

## Configuración paso a paso

1. **App tipo Business en modo Development.** No la pases a Live (ver [Lo que NO hace falta](#lo-que-no-hace-falta)).
2. **Número de prueba y destinatarios** — en _WhatsApp → Step 1. Try it out_:
   - Copia el **Phone Number ID** a `BUSINESS_PHONE` en `.env`.
   - Anota el **Messaging account ID**: es el ID de la cuenta de WhatsApp Business (WABA), lo necesitas en el paso 6.
   - Agrega tu número en **Recipient → Manage phone number list**. El número de prueba solo puede responder a esa lista (máximo 5).
3. **Token** — botón _Generate token_ → `API_TOKEN` en `.env`. Estos tokens duran entre 1 y 24 horas; para no regenerarlos, crea un token permanente de **usuario del sistema** en _Meta Business Suite → Configuración del negocio → Usuarios del sistema_ (permisos `whatsapp_business_messaging` y `whatsapp_business_management`, caducidad "Nunca").
4. **Exponer el puerto 3000** — en VS Code, pestaña _Ports_ → clic derecho en el 3000 → _Port Visibility_ → **Public**. Si queda en Private, Meta recibe un login de GitHub (302/401) y nunca llega al bot.
5. **Webhook** — producto **Webhooks** del menú lateral:
   - En el selector de objeto elige **WhatsApp Business Account** (no _User_ ni _Page_).
   - _Callback URL_: `https://<tu-túnel>/webhook` y el mismo `WEBHOOK_VERIFY_TOKEN` del `.env` → **Verify and save**.
   - Suscribe el campo **`messages`**. Usa la misma versión que `API_VERSION` del `.env`.
6. **Suscribir la app a la cuenta de WhatsApp Business** — ⚠️ **paso que no muestra el panel y sin el cual no llega ningún mensaje real.** Configurar el webhook (paso 5) no basta: la cuenta también debe tener tu app en su lista de apps suscritas.

   ```powershell
   # Ver qué apps están suscritas (tu app debe aparecer)
   curl.exe -H "Authorization: Bearer TU_TOKEN" "https://graph.facebook.com/v27.0/WABA_ID/subscribed_apps"

   # Suscribir tu app (responde {"success":true})
   curl.exe -X POST -H "Authorization: Bearer TU_TOKEN" "https://graph.facebook.com/v27.0/WABA_ID/subscribed_apps"
   ```

   Por defecto solo aparece _WA DevX Webhook Events 1P App_ (la app interna de Meta que alimenta "Check test webhooks" en el panel). En PowerShell usa `curl.exe`, no `curl`.
7. **Probar** — `pnpm start` y escribe "hola" al número de prueba. Debes recibir el saludo y el menú.

## Lo que NO hace falta

| Paso | Por qué evitarlo |
|---|---|
| **Pasar la app a Live** | El banner de Webhooks dice que en Development solo llegan webhooks de prueba, pero en nuestra prueba **el problema real era la suscripción del paso 6**. En Live, los envíos fallan con `131005 Access denied` y `#10 Application does not have permission` porque Meta exige App Review. En Development funciona todo. |
| _Step 2. Production setup_ | Es para registrar un número real de tu negocio y un método de pago. |
| _Step 3. Business verification_ | Solo para producción real. |
| App Review / Advanced Access | Solo si la app pasa a Live. |

`PRIVACY.md` existe porque Meta la pide para pasar a Live; en Development no es necesaria.

## Solución de problemas

El bot registra en consola cada mensaje recibido (`[webhook] Message from ...`), cada envío (`[whatsapp] Sent ...`) y cada error de la API (`[whatsapp] API error ...`).

| Síntoma | Causa | Solución |
|---|---|---|
| Tu mensaje queda con **una palomita gris** | No llegó a Meta | Revisa el número al que escribes |
| **Dos palomitas** pero nada en la consola | La app no está suscrita a la WABA, el webhook no está verificado o el túnel está Private | Pasos 6, 5 y 4 |
| El botón **Test** de Meta tampoco llega | Callback URL mal guardada o túnel Private | Pasos 5 y 4 |
| `API error 401 ... Session has expired (code 190)` | Token vencido | Genera otro token (paso 3) y escribe `rs` en la terminal |
| `API error 403 (#131005) Access denied` / `(#10) Application does not have permission` | App en modo Live | Regresa la app a Development |
| `API error 400 (#131030) Recipient phone number not in allowed list` | Tu número no está en la lista de destinatarios | Paso 2 |
| Cambiaste el `.env` y no pasa nada | nodemon solo vigila `src/` | Escribe `rs` en la terminal de nodemon |
| `npm run start` falla con `EBADDEVENGINES` | El proyecto exige pnpm | Usa `pnpm start` |

Para ver si el token sigue vigente y cuándo vence (sin exponerlo en el código):

```powershell
curl.exe "https://graph.facebook.com/debug_token?input_token=TU_TOKEN&access_token=TU_TOKEN"
```
