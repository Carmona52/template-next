'use client'

import {useAppStore} from '@/store/StoreProvider'
import {Button} from '@/components/ui/Button'

export default function Counter() {
    const count = useAppStore((state) => state.count)
    const increment = useAppStore((state) => state.increment)
    const decrement = useAppStore((state) => state.decrement)
    const reset = useAppStore((state) => state.reset)

    return (
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <h1>Contador: {count}</h1>
            <Button variant='kevinespecial' onClick={increment}>Incrementar</Button>
            <Button onClick={decrement} style={{marginLeft: '0.5rem'}}>
                Decrementar
            </Button>
            <Button onClick={reset} variant='destroy' style={{marginLeft: '0.5rem'}}>
                Reiniciar
            </Button>
        </div>
    )
}