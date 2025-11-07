# Frontend Dependencies

This document lists all the npm packages used in the frontend application.

## Core Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "motion": "latest",
    "lucide-react": "latest",
    "date-fns": "latest",
    "sonner": "2.0.3"
  }
}
```

## UI Component Libraries

The project uses **shadcn/ui** components. These are already included in the `/components/ui` directory and don't need separate installation. The following components are available:

- `accordion`, `alert-dialog`, `alert`, `aspect-ratio`
- `avatar`, `badge`, `breadcrumb`, `button`
- `calendar`, `card`, `carousel`, `chart`
- `checkbox`, `collapsible`, `command`, `context-menu`
- `dialog`, `drawer`, `dropdown-menu`, `form`
- `hover-card`, `input-otp`, `input`, `label`
- `menubar`, `navigation-menu`, `pagination`, `popover`
- `progress`, `radio-group`, `resizable`, `scroll-area`
- `select`, `separator`, `sheet`, `sidebar`
- `skeleton`, `slider`, `switch`, `table`
- `tabs`, `textarea`, `toggle-group`, `toggle`, `tooltip`

## Installation

If you're setting up a new project, install the dependencies:

```bash
npm install react react-dom motion lucide-react date-fns sonner@2.0.3
```

## Tailwind CSS

The project uses **Tailwind CSS v4.0** with a custom configuration in `styles/globals.css`.

No `tailwind.config.js` file is needed as we're using Tailwind v4.0's inline theme configuration.

## TypeScript

All components are written in TypeScript. Make sure you have TypeScript configured in your project:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## Build Tools

This project is compatible with:
- **Vite**
- **Next.js**
- **Create React App**

Choose your preferred build tool and configure accordingly.

## Environment Variables

Create a `.env` file:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Or for production
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

Note: For Vite, use `VITE_API_URL` instead of `NEXT_PUBLIC_API_URL` and update the API service accordingly.
