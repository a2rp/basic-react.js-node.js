# React and Node.js Message Demo Frontend

This is the Vite and React frontend for the repository. It calls the Express backend and displays the response from `GET /api/a2rp`.

## Run

Requires Node.js 20.19 or newer and npm.

```powershell
Copy-Item .env.example .env
npm install
npm start
```

The frontend runs at `http://localhost:3000`. The backend should be running at `http://localhost:1198`.

## Configuration

Set `VITE_API_BASE_URL` in `.env` when the backend uses a different URL:

```text
VITE_API_BASE_URL=http://localhost:1198/api
```

## Build

```powershell
npm run build
```

The production files are written to the Vite `dist` directory.

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me A Coffee: [https://buymeacoffee.com/a2rp](https://buymeacoffee.com/a2rp)
- Patreon: [https://patreon.com/a2rp](https://patreon.com/a2rp)
