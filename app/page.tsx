import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col p-2">
            <h1>Pagina de inicio</h1>
            <Link href={"/example1"}>Pagina 1</Link>
            <Link href={"/example2"}>Pagina 2</Link>
            <Link href={"/example3"}>Pagina 3</Link>

        </div>
    );
}
