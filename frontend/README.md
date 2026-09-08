# React and Node.js Message Demo Frontend

This is the Create React App frontend for the repository. It calls the Express backend and displays the response from `GET /api/a2rp`.

## Run

```powershell
Copy-Item .env.example .env
npm install
npm start
```

The frontend runs at `http://localhost:3000`. The backend should be running at `http://localhost:1198`.

## Configuration

Set `REACT_APP_API_BASE_URL` in `.env` when the backend uses a different URL:

```text
REACT_APP_API_BASE_URL=http://localhost:1198/api
```

## Build

```powershell
npm run build
```

The production files are written to the CRA `build` directory.
