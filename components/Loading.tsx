export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-full max-w-4xl space-y-6 px-4">
        <div className="h-8 w-48 rounded-[var(--radius-md)]" style={{ backgroundColor: "var(--hover-bg)" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[var(--radius-xl)] p-4 space-y-4"
              style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-xs)" }}
            >
              <div className="h-40 rounded-[var(--radius-lg)]" style={{ backgroundColor: "var(--hover-bg)" }} />
              <div className="h-4 w-3/4 rounded-[var(--radius-sm)]" style={{ backgroundColor: "var(--hover-bg)" }} />
              <div className="h-3 w-1/2 rounded-[var(--radius-sm)]" style={{ backgroundColor: "var(--hover-bg)" }} />
              <div className="h-8 w-full rounded-[var(--radius-md)]" style={{ backgroundColor: "var(--hover-bg)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
