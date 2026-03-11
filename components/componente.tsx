'use client'
import React from 'react'

export default function Componente() {
    const [count, setCount] = React.useState(0);

    return (
        <>
            <h1>{count}</h1>

        </>
    )
}