import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Generate the Blogs with -Blog Gen AI",
  description: "A Blog Gen AI  is a web app to generate the blogs on desired topic just entring the blog title to topic. generate the blogs on spot effortlessly with in a seconds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
