# Budget app

## Setup

Install all dependencies using the following command:

```bash
pnpm install
```

Create a `.env` with the following content and apply to your configuration:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

## Start the app

### Development

- Start the app using `pnpm dev`. It runs on <http://localhost:5137> by default.

### Testing

- Start the cypress tests using `pnpm test`.Make sure the website is running on <http://localhost:5137>, and the backend database is seeded.

### Production

- Build the app using `pnpm build`. This will generate a `dist` folder with the compiled files.
- Serve this folder using a static service like Apache, Nginx or others.
