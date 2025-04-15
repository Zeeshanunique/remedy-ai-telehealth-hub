# RemedyAI Telehealth Hub

![RemedyAI Logo](public/favicon.ico) 

## About

RemedyAI Telehealth Hub is a comprehensive telehealth platform that leverages AI technology to provide remote healthcare services. The platform connects patients with healthcare providers through video consultations, offers AI-powered symptom analysis, and enables convenient appointment scheduling and medical record management.

## Features

- **Secure Authentication**: User authentication and data protection powered by Clerk
- **AI Health Assistant**: Personalized health information using Google's Gemini 1.5 Flash model
- **Symptom Analysis**: AI-powered preliminary analysis of reported symptoms
- **Video Consultations**: Connect with healthcare providers through secure video calls
- **Appointment Scheduling**: Book and manage healthcare appointments
- **Medical Records**: View and track personal health metrics and medical history
- **User Profile Management**: Manage personal information, security settings, and preferences

## Tech Stack

This project is built with modern technologies:

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Authentication**: Clerk Authentication
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Build Tool**: Vite
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Recharts
- **API Communication**: TanStack Query

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd remedy-ai-telehealth-hub

# Install dependencies
npm install
# or
yarn install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
VITE_GOOGLE_API_KEY=your_google_api_key
```

### Development

```sh
# Start the development server
npm run dev
# or
yarn dev
```

Visit `http://localhost:8080` to view the application.

### Building for Production

```sh
# Build the project
npm run build
# or
yarn build
```

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Application pages and routes
- `src/lib`: Utility functions and libraries
- `src/hooks`: Custom React hooks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
