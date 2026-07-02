import { useEffect, useState } from "react";
import "./App.css";

const BACKEND_PORT = 3000;

function App() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    fetch(`http://localhost:${BACKEND_PORT}/api/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok" ? "ok" : "error"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section id="center">
      <h1>Ticket Manager</h1>
      <p>Backend status: {status}</p>
    </section>
  );
}

export default App;
