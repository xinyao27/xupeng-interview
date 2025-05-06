# Simple Chat Application

A simple chat application built with Next.js and AI SDK, supporting multi-session management and AI conversation features.

![Simple Chat](https://nextjs.org/favicon.ico)

## Project Overview

This project is a modern chat application built with the Next.js framework, integrated with AI conversation capabilities. The application supports creating multiple conversation sessions and interacting with AI within these sessions. All conversation content is saved to a SQLite database, allowing users to view their history at any time.

## Features

- **Multi-session Management**: Create and manage multiple independent conversation sessions
- **Real-time AI Conversations**: Integrated with AI SDK, supporting natural language interactions with AI
- **Markdown Rendering**: Support for rendering Markdown format in chat messages
- **Responsive Design**: Adapts to different device screen sizes
- **Data Persistence**: Uses SQLite database to store all conversation content

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) + [React 19](https://react.dev/)
- **UI Components**: Custom components based on Radix UI
- **Styling Solution**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **API Routes**: [Hono](https://hono.dev/)
- **Database**: SQLite (via [DrizzleORM](https://orm.drizzle.team/) and [libSQL](https://github.com/libsql/libsql))
- **AI Integration**: [AI SDK](https://sdk.vercel.ai/docs) + [DeepSeek](https://deepseek.ai/)

## Quick Start

### Requirements

- Node.js 18+ version
- npm or yarn or pnpm or bun

### Installation Steps

1. Clone the project code

```bash
git clone <repository-url>
cd xupeng-interview
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Initialize the database

```bash
npm run db:migrate
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application

## Project Structure

```
src/
├── app/                # Next.js application routes
│   ├── [...route]/     # Dynamic routes
│   ├── page.tsx        # Main page
│   └── layout.tsx      # Application layout
├── components/         # React components
│   ├── chat/           # Chat-related components
│   ├── nav/            # Navigation components
│   └── ui/             # UI base components
└── lib/                # Utility libraries
    ├── db/             # Database related
    │   ├── schema.ts   # Database model definitions
    │   └── utils.ts    # Database utility functions
    └── utils.ts        # General utility functions
```

## Database Models

The application uses a SQLite database to store conversation data, mainly including the following two tables:

- **conversations**: Stores conversation session information
  - id: Unique session identifier
  - title: Session title
  - createdAt: Creation time
  - updatedAt: Update time

- **messages**: Stores conversation messages
  - id: Unique message identifier
  - conversationId: Associated session ID
  - role: Message role ('user' or 'assistant')
  - content: Message content
  - createdAt: Creation time

## Deployment

### Deploy to Vercel

It is recommended to deploy this Next.js application using the [Vercel platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push the code to a GitHub repository
2. Import the repository in Vercel
3. Configure necessary environment variables
4. Click deploy

For more deployment details, please refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

[MIT](LICENSE)
