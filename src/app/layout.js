import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "@/app.css";
import background from "../../src/background.png";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
        }}
      >
        {children}
      </body>
    </html>
  );
}
