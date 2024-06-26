import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NavbarComponent from "@/components/Navbar/Navbar";
import FooterComponent from "@/components/Footer/Footer";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "RTCT",
    description: "Real Time Collaboration Tool",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} dark text-foreground bg-background text-white overflow-x-hidden overflow-y-auto h-64 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full bg-black`}>
                <NextUIProvider className={`flex flex-col w-full bg-black`}>
                    <ConvexClientProvider>
                        <NavbarComponent />
                        {children}
                        <Toaster />
                        <FooterComponent />
                    </ConvexClientProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}