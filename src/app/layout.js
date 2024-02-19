import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import "@/app.css"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
