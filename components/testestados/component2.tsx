'use client'

import {Button} from '@/components/ui/Button'
import {useState} from "react";

export default function Component2() {
    const [counter, setCounter] = useState<number>(0);

    return (
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <h1>Contador 2: {counter}</h1>
            <Button onClick={()=> setCounter(counter + 1)}>Incrementar</Button>
            <Button onClick={()=> setCounter(counter - 1)} style={{marginLeft: '0.5rem'}}>
                Decrementar
            </Button>
            <Button onClick={()=> setCounter(0)} style={{marginLeft: '0.5rem'}}>
                Reiniciar
            </Button>
        </div>
    )
}