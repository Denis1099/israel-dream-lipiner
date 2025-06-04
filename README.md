# Israel Dream Lipiner

A modern React application built with TypeScript, Vite, shadcn-ui, and Tailwind CSS.

## 🚀 Features

- **React 18** - Latest React features with functional components
- **TypeScript** - Type-safe development experience
- **Vite** - Fast build tool and development server
- **shadcn-ui** - Beautiful and accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Powerful data fetching and caching
- **React Router** - Client-side routing
- **React Hook Form** - Performant forms with validation

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd israel-dream-lipiner
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run build:prod` - Build for production (optimized)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size
- `npm run clean` - Clean build directory

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component

backend/                # Backend API (if applicable)
public/                 # Static assets
```

## 🔧 Backend

This project includes a backend component with deployment scripts:

- `deploy-backend.sh` - Backend deployment script
- `create_table.sql` - Database schema

## 🚀 Deployment

### Frontend
The frontend can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Backend
Use the provided deployment script:
```bash
./deploy-backend.sh
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
