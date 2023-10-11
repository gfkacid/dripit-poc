import "@/assets/styles/globals.css";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Inter } from "next/font/google";
import StoreProvider from "@/store/StoreProvider";
import Layout from "@/components/layout";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dripit",
  description: "Dripit app",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={font.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </StoreProvider>
  );
}
