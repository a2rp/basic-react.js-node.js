# Documentation

## Overview

This repository contains two separate applications that work together:

- `backend` is a Node.js and Express API.
- `frontend` is a Create React App interface.

The frontend requests `GET /api/a2rp` and renders the returned message. Both applications are intentionally small so the request lifecycle is easy to follow.

## Backend flow

1. `dotenv` loads local environment values.
2. Express configures CORS and JSON parsing.
3. The request logger records the method, URL, status, and duration after each response.
4. Routes return JSON with `apiUrl` as the first property.
5. Unknown routes return a JSON `404` response.
6. The server starts only when `index.js` is run directly.

### Backend routes

| Method | Route | Response |
| --- | --- | --- |
| GET | `/` | API status message |
| GET | `/health` | Health status |
| GET | `/api/a2rp` | Demo message consumed by the frontend |

## Frontend flow

1. CRA loads the React application from `src/index.js`.
2. `App.js` starts in the idle state.
3. Clicking the button changes the state to loading.
4. The browser `fetch` API requests the configured backend URL.
5. A successful JSON response is displayed in the result panel.
6. HTTP and network errors are shown in the error state.

The frontend uses `REACT_APP_API_BASE_URL` when provided. It falls back to `http://localhost:1198/api` for local development.

## Local configuration

Copy the example files before starting either application:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

Do not commit either local `.env` file. The example files contain only safe development defaults.

## Local commands

Backend:

```powershell
cd backend
npm install
npm run start:dev
```

Frontend:

```powershell
cd frontend
npm install
npm start
```

Create a production frontend bundle with:

```powershell
cd frontend
npm run build
```

## Design decisions

- The project remains a Create React App project.
- The backend defaults to port `1198` to match the documented request examples.
- The frontend uses native `fetch`, which keeps the small demo dependency-light.
- No artificial delay is added to the network request.
- No test folder or test script is included.
