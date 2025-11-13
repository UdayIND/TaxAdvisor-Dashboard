# Tax Advisor Dashboard

A comprehensive tax optimization dashboard for financial advisors, built with React, TypeScript, and Vite.

## Features

- **Tax Opportunities Dashboard** with 4 comprehensive tabs:
  - Tax Efficiency Overview
  - Asset Location Optimization
  - Withdrawal Planner
  - Value Demonstration
- Client management and scenario planning
- Interactive charts and visualizations
- Real-time tax calculations and projections

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/UdayIND/TaxAdvisor-Dashboard.git

# Navigate to project directory
cd TaxAdvisor-Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Deployment to Vercel

This project is configured for easy deployment to Vercel:

1. **Via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository: `UdayIND/TaxAdvisor-Dashboard`
   - Vercel will automatically detect the Vite configuration
   - Click "Deploy"

2. **Via Vercel CLI**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`
- SPA routing rewrites

## Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── layout/        # Layout components (Sidebar, TopBar)
│   │   └── ui/            # shadcn-ui components
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx  # Main dashboard
│   │   └── TaxDashboard.tsx  # Tax Opportunities Dashboard
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── public/                # Static assets
└── vercel.json           # Vercel deployment configuration
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
