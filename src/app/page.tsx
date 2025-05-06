export default async function Home() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-8 text-center">
        <h1 className="text-3xl font-bold">Simple Chat</h1>
        <p className="text-muted-foreground">
          A Simple Chat Application Based on Next.js and AI SDK
        </p>
      </header>
      <div className=" flex flex-row grow">
        <div className="min-w-[240px] mr-0 m-4 rounded-2xl flex-none py-12 pl-12 pr-0 bg-gray-100">
          <div> conversation list </div>
        </div>
        <div className="flex-grow m-4 rounded-2xl overflow-y-auto p-12  bg-gray-100">
          <main className="w-full max-w-4xl mx-auto">
            <div>chat</div>
          </main>
        </div>
      </div>

      <footer className="p-8 text-center text-sm text-muted-foreground">
        <p>
          Built with TypeScript, Next.js, Hono, DrizzleORM, and the Vercel AI
          SDK
        </p>
      </footer>
    </div>
  );
}
