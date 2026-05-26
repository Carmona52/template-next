'use client'

import {useAppStore} from "@/store/StoreProvider";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";

export default function ProductosPage() {
    const products = useAppStore((state) => state.products);
    if (!products.length) {
        return (
            <h1>No hay producots disponibles</h1>
        )
    }
    return (
        <div className='flex flex-wrap flex-row w-full'>
            {products.map((product, index) => (

                <Card variant='default' key={index}>
                    <CardHeader><img src={product.image} key={index} className='w-32 rounded-md aspect-auto'/></CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <CardContent>
                        <Button onClick={()=>alert(`Click a ${product.name}`)}>Ver más información </Button>
                    </CardContent>
                </Card>

            ))}
        </div>
    )
}