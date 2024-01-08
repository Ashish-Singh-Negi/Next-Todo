import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <section className="h-3/5 w-1/4 border-solid border-blue-400 border-2 rounded-3xl flex flex-col items-center justify-center">
        {children}
      </section>
    </div>
  );
};

export default layout;
