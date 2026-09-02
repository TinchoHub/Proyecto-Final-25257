# 🛡️ Node.js & Express REST API — Auth & Cloud Services

API RESTful backend construida con **Node.js**, **Express 5** y **Firebase**, implementando autenticación robusta mediante **JSON Web Tokens (JWT)** y hashing de contraseñas con **bcryptjs**.

---

## 🚀 Características Principales

- **Arquitectura RESTful:** Endpoints estructurados para la gestión de recursos bajo estándares HTTP.
- **Autenticación y Autorización:**
  - Encriptación y salado de contraseñas de usuarios con `bcryptjs`.
  - Emisión y validación de tokens de acceso sin estado (stateless) vía `jsonwebtoken`.
  - Middlewares de protección de rutas privadas.
- **Persistencia en la Nube:** Integración con servicios de base de datos y almacenamiento de **Firebase**.
- **Seguridad Web:** Configuración de cabeceras de intercambio de recursos de origen cruzado mediante `cors`.
- **Configuración Segura:** Gestión desacoplada de variables de entorno mediante `dotenv`.

---

## 🛠️ Stack Tecnológico

- **Entorno:** Node.js (ES Modules)
- **Framework Web:** [Express 5](https://expressjs.com/)
- **BaaS / Cloud DB:** [Firebase SDK v12](https://firebase.google.com/)
- **Seguridad:** `jsonwebtoken` (JWT), `bcryptjs`, `cors`
- **Configuración:** `dotenv`

---

## 📋 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto tomando como plantilla lo siguiente:

```env
PORT=3000
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
JWT_SECRET=tu_clave_secreta_jwt
