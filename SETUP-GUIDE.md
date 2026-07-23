# React, Tailwind CSS, TypeScript & shadcn Setup Guide

This project is currently structured as a highly optimized static HTML/CSS/JS website. However, to support modern React components (such as the new `.tsx` testimonial cards and Orbit preloader components in the `/components` folder), you will need a build environment.

This guide provides step-by-step instructions on how to initialize a standard React project in this workspace using Vite, Tailwind CSS, TypeScript, and shadcn.

---

## Why the `/components/ui` Folder is Crucial

In a modern shadcn-configured codebase, the standard directory for core UI building blocks (like buttons, badges, dialogs, and cards) is `components/ui`.

1. **Standardization:** Keeping primitive components isolated inside `components/ui` allows you to separate reusable layout atoms from complex pages or feature components.
2. **Import Path Mapping:** By standardizing components under `components/ui`, you can configure path aliases in `tsconfig.json` (such as `"@/components/ui/*"`). This avoids cluttered and error-prone relative imports like:
   ```tsx
   import { Button } from "../../../components/ui/button" // ❌ Hard to maintain
   ```
   Instead, you use clean alias paths:
   ```tsx
   import { Button } from "@/components/ui/button" //  Maintainable and clean
   ```
3. **shadcn CLI Automation:** The shadcn CLI depends on this folder structure. When you run `npx shadcn@latest add button`, the CLI automatically writes the component code into `/components/ui` and ensures any dependencies (like `@radix-ui/react-slot`) are automatically configured and imported correctly.

---

## Setup Steps

### 1. Initialize a modern React Project
In the root directory, configure React + TypeScript using Vite:
```bash
npm create vite@latest ./ -- --template react-ts
```
*(Select "Yes" to run in the current directory and merge files if prompted).*

### 2. Install Tailwind CSS (v4)
Install Tailwind CSS and its Vite plugin:
```bash
npm install tailwindcss @tailwindcss/vite
```

Configure the Vite plugin in `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})
```

Add the Tailwind imports to your global CSS file (e.g. `src/index.css`):
```css
@import "tailwindcss";
```

### 3. Setup TypeScript Aliases
Ensure your `tsconfig.json` matches Vite's path mappings:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 4. Initialize shadcn CLI
Configure the project for shadcn by running the initialization script:
```bash
npx shadcn@latest init
```
During the prompt, select:
- **Style:** Default
- **Base Color:** Slate (or whichever matches your theme)
- **CSS Variable support:** Yes
- **Tailwind v4 support:** Yes
- **Alias configuration:** `@/components` and `@/lib/utils`

### 5. Install Project Dependencies
Run the following commands to install the required external npm libraries used by our Testimonial, Marquee, and ZoomParallax components:
```bash
npm install lucide-react class-variance-authority @radix-ui/react-slot clsx tailwind-merge framer-motion
```


### 6. Extend Tailwind with Keyframes
To enable the infinite horizontal scroll animation in Tailwind, add the keyframe declarations to your global stylesheet (`index.css` or `globals.css`):
```css
@import "tailwindcss";

@theme inline {
  --animate-marquee: marquee var(--duration) infinite linear;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
}
```
*(The CSS variables `--duration` and `--gap` can be customized dynamically using Tailwind helper utility classes or inline styles).*
