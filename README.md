# React and Node.js Message Demo

A small full-stack project that connects a Create React App frontend to a Node.js and Express backend. Click the button in the frontend to request a JSON message from the API.

## Project structure

```text
basic-react.js-node.js/
  backend/
    .env.example
    index.js
    rest.http
  frontend/
    public/
    src/
```

## Features

- Create React App frontend with a responsive interface.
- Express API with a root status route, health route, and message route.
- API responses keep `apiUrl` as the first JSON property.
- Completed API requests are logged with method, URL, status, and duration.
- Frontend request states cover idle, loading, success, and error cases.
- Backend and frontend settings are configurable with environment files.
- No artificial request delay is used.

## Run locally

Use two terminals from the project root.

### 1. Start the backend

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run start:dev
```

The backend runs at `http://localhost:1198` by default.

### 2. Start the frontend

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm start
```

The CRA development server opens at `http://localhost:3000` and calls `http://localhost:1198/api`.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/` | Confirms that the API is running |
| GET | `/health` | Returns the service health status |
| GET | `/api/a2rp` | Returns the message shown by the frontend |

Additional request examples are in [`backend/rest.http`](backend/rest.http).

## Configuration

Backend variables are documented in [`backend/.env.example`](backend/.env.example):

- `PORT` controls the Express server port and defaults to `1198`.
- `CLIENT_ORIGIN` controls the allowed frontend origin and defaults to `http://localhost:3000`.

The frontend variable in [`frontend/.env.example`](frontend/.env.example) is:

- `REACT_APP_API_BASE_URL` for the backend API base URL.

## Author

**Ashish Ranjan**
Full-Stack Web Developer

- Portfolio: [ashishranjan.net](https://www.ashishranjan.net/)
- GitHub: [github.com/a2rp](https://github.com/a2rp)
- CodePen: [codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [facebook.com/theash.ashish](https://www.facebook.com/theash.ashish/)
- YouTube: [Ashish Ranjan](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- [Support page](https://a2rp-donation-page.netlify.app/)
- [Buy Me a Coffee](https://buymeacoffee.com/a2rp)
- [Patreon](https://www.patreon.com/a2rp)

## License

This project is available under the MIT License. See [`LICENSE`](LICENSE).
