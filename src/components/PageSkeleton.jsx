import React from 'react';

const PageSkeleton = () => (
  <div
    className="min-h-[420px] w-full px-6 py-12 space-y-8"
    role="status"
    aria-label="Loading page"
  >
    <div className="h-8 w-40 mx-auto rounded-full bg-slate-100 animate-pulse" />
    <div className="h-14 w-3/4 mx-auto rounded-2xl bg-slate-100 animate-pulse" />
    <div className="h-4 w-2/3 mx-auto rounded-full bg-slate-100 animate-pulse" />
    <div className="grid md:grid-cols-3 gap-6 pt-8">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-48 rounded-[2rem] bg-slate-100/80 animate-pulse" />
      ))}
    </div>
  </div>
);

export default PageSkeleton;