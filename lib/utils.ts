//Este archivo sirve para mezclar las propiedades de tailwind y asignarles un nivel de prioridad,
//por ejemplo, si en un componente tenemos bg-blue-500 y al momento de llamarlo, en estilo in-line ponemos bg-red-500,
//tailwind no sabe a cuál darle prioridad, causando delay, cuando son pocos componentes no se nota, pero cuando son varios, este tipo
//de problemas de rendimiento es más notable.

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}