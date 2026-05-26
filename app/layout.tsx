import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import StoreProvider from '@/store/StoreProvider';
import {
    Sidebar,
    SidebarProvider,
    SidebarSectionHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarDivider,
} from "@/components/layout/SideBar";
import {
    Home,
    ShoppingCart,
    Package,
    Users,
    DollarSign,
    BarChart2,
    User,
    Settings,
} from "lucide-react";

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Demo de sistema",
    description: "Demo de sistema",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
            <SidebarProvider>
                <div className="flex flex-col h-screen">
                    <Navbar/>
                    <div className="flex flex-1 overflow-hidden">
                        <Sidebar>
                            <SidebarSectionHeader>Negocio</SidebarSectionHeader>
                            <SidebarMenu>
                                <SidebarMenuButton href="/" icon={<Home size={22}/>}>
                                    Inicio
                                </SidebarMenuButton>
                                <SidebarMenuButton href="/pedidos" icon={<ShoppingCart size={22}/>}>
                                    Pedidos
                                </SidebarMenuButton>
                                <SidebarMenuButton href="/productos" icon={<Package size={22}/>}>
                                    Productos
                                </SidebarMenuButton>
                                <SidebarMenuButton href="/clientes" icon={<Users size={22}/>}>
                                    Clientes
                                </SidebarMenuButton>
                                <SidebarMenuButton href="/finanzas" icon={<DollarSign size={22}/>}>
                                    Finanzas
                                </SidebarMenuButton>
                                <SidebarMenuButton href="/estadisticas" icon={<BarChart2 size={22}/>}>
                                    Estadísticas
                                </SidebarMenuButton>
                            </SidebarMenu>

                            <SidebarDivider/>

                            <SidebarSectionHeader>Cuenta</SidebarSectionHeader>
                            <SidebarMenu>
                                <SidebarMenuButton href="/perfil" icon={<User size={22}/>}>
                                    Perfil
                                </SidebarMenuButton>
                                <SidebarMenuButton href="/configuracion" icon={<Settings size={22}/>}>
                                    Configuración
                                </SidebarMenuButton>
                            </SidebarMenu>
                        </Sidebar>

                        <main className="flex-1 overflow-y-auto p-4">
                            {children}
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </StoreProvider>
        </body>
        </html>
    );
}