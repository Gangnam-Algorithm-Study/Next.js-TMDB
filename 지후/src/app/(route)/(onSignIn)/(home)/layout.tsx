import "@/app/globals.css";
import Header from '../../../_components/Header';
import SideBar from "@/app/_components/SideBar";
import { Inter, Poppins } from 'next/font/google'
import { join } from "path";


export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"main_layout_container"}>
            <SideBar />
            {/* <Header /> */}
            {children}
        </div>
    );
}
