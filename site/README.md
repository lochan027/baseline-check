# Web Playground

A Next.js web application that provides a live playground for testing code against Baseline standards.

## Features

- Live code testing for JavaScript, CSS, and HTML
- Real-time feature detection
- Visual results with error highlighting
- Configurable Baseline year selection
- Mobile-responsive design with Tailwind CSS

## Development

```bash
npm run dev
```

## Deployment

The site is ready for deployment on Vercel, Netlify, or any Node.js hosting platform.

### Vercel Deployment

```bash
npm run build
```

The site will be available at the deployed URL with the playground at `/playground`.

## API

### POST /api/check

Request:
```json
{
  "code": "const x = data?.value ?? 'default'",
  "baseline": "2023"
}
```

Response:
```json
{
  "baseline": "2023",
  "safe": true,
  "issues": [],
  "features": [
    { "feature": "optional-chaining", "required": "2020" },
    { "feature": "nullish-coalescing", "required": "2020" }
  ]
}
```