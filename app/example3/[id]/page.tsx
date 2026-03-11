import Navbar from "@/components/navigation/navbar";
import Componente from "@/components/componente";

export default async function idExample({params}: { params: Promise<{ id: number }> }) {
    const {id} = await params;

    return (
        <>
            <Componente />
            <h1>Hola pagina {id}</h1>
        </>
    )
}