# Elite Auto Rentals - Client

This is the client-side application for Elite Auto Rentals, a luxury car rental service.

## Features

- Browse luxury car collection
- Filter and search for vehicles
- User authentication (sign up, sign in)
- Car booking system
- User profile management
- Responsive design for all devices

## Technology Stack

- React
- TypeScript
- Vite
- React Router for routing
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API communication
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
4. Create a .env file based on .env.example
5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
The application will be available at http://localhost:5173

## Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

This will create optimized production files in the `dist` directory.

## Deployment

The frontend application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the environment variables
3. Deploy

## Project Structure

- `src/`
  - `components/` - Reusable UI components
  - `contexts/` - React context providers
  - `pages/` - Main application pages
  - `utils/` - Utility functions
  - `types/` - TypeScript type definitions
  - `App.tsx` - Main application component
  - `main.tsx` - Entry point

## Environment Variables

The following environment variables are required:

- `VITE_API_URL` - Backend API URL