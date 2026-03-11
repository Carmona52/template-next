'use client'
import {useParams} from 'next/navigation';
import React from 'react';

export default function PageUseClient() {
    const params = useParams<{ id: string }>()
    const id = Number(params.id)


    return (
        <>
            <h1>Hola Pagina {id}</h1>
        </>
    )
}