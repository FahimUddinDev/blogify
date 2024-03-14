import React from "react";

function Layout({ children }) {
  return (
    <main>
      <section>
        <div className="container"> {children}</div>
      </section>
    </main>
  );
}

export default Layout;
