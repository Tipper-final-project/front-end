import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "@/app.css";
import Image from "next/legacy/image";
import background from "../../src/background.png";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="background"
          style={{
            zIndex: "auto",
            position: "fixed",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={background}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt="background image"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
