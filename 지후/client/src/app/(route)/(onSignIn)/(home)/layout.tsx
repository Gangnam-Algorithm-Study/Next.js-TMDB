import "@/app/globals.css";
import Header from '../../../_components/Header';
import SideBar from "@/app/_components/SideBar";
import { Inter, Poppins } from 'next/font/google'
import { join } from "path";
import { auth } from "@/auth";
import { redirect } from "next/navigation";



export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session) {
        redirect('/');
    }

    return (
        <div className={"main_layout_container"}>
            <SideBar session={session} />
            {/* <Header /> */}
            {children}
        </div>
    );
}
