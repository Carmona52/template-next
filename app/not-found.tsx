import Image from "next/image";
export default function NotFound() {
    return <div className="flex flex-col items-center justify-center align-center">
        <Image src='/error404.svg' alt='Imagen de error 404' width={400} height={400} />
        <h1 className="text-2xl font-bold mt-4">Error Dice el Chispas</h1>
        <p className="text-gray-600 mt-2">La página que buscas no existe.</p>
    </div>
}