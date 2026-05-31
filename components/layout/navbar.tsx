"use client";

import {FC} from "react";
import {useAppStore} from "@/store/StoreProvider";
import {useShallow} from 'zustand/react/shallow'
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/Button";

const Navbar: FC = () => {
    const router = useRouter();

    const user = useAppStore(useShallow((state) => state.user))
    const isAuthenticated = useAppStore((state) => state.isAuthenticated)
    const logout = useAppStore((state) => state.logout)

    return (
        <nav className="flex items-center justify-between px-5 py-4 bg-primary text-white">
            <div className="cursor-pointer" onClick={() => router.push('/')}>
                <h2>MiApp</h2>
            </div>
            <div className='flex w-72 justify-around items-center'>
                <ul className="flex gap-6">
                    {isAuthenticated ? (
                        <>
                            <span>Hola, {user?.name}</span>
                            <button onClick={logout}>Cerrar sesión</button>
                        </>
                    ) : (
                        <a href="/login">Iniciar sesión</a>
                    )}


                </ul>
                <Button>Soporte Técnico</Button>
            </div>
        </nav>
    );
};

export default Navbar;
