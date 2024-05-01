import "@/app/globals.css";
import Header from '../../_components/Header';
import SideBar from "@/app/_components/SideBar";
import { Inter, Poppins } from 'next/font/google'
import { join } from "path";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'block',
})

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {/* <SideBar /> */}
            <Header />
            {children}
        </div>
    );
}
