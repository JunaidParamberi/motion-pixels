import "./globals.css";
import NotFoundView from "./components/NotFoundView";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="antialiased">
        <NotFoundView />
      </body>
    </html>
  );
}
