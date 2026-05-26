# Esta es una plantilla para proyectos creada con NextJs 16.1.6 

## ¿Qué es Next.js?

Next.js es un **framework de React** que facilita la creación de aplicaciones web modernas.  
Ofrece **renderizado del lado del servidor (SSR)**, **generación estática (SSG)** y optimizaciones integradas como **ruteo automático**, **código dividido por páginas** y **soporte para API routes**.

---

## ¿Cómo funciona?

Next.js funciona sobre **React**, añadiendo capacidades como:
- **Renderizado del lado del servidor (SSR)** y **generación estática (SSG)**.
- **Ruteo automático** basado en la estructura de carpetas.
- **Optimización de rendimiento**: división de código, imágenes optimizadas y soporte para SEO.
- **API Routes** para crear endpoints backend dentro del mismo proyecto.

---

## ¿Cómo se organizan las carpetas?

> /pages -> Rutas y vistas (cada archivo es una ruta) 

> /components -> Componentes reutilizables 

> /styles -> Archivos CSS o módulos de estilo 

> /public -> Recursos estáticos (imágenes, fuentes) 

> /lib o /utils -> Funciones auxiliares y lógica compartida 

> /hooks -> Custom hooks 

> /api -> Endpoints internos (si se usan API Routes)

---

## ¿Qué arquitectura se recomienda?

Como tal, no existe una arquitectura única que sea mejor al usar Next.js, ya que el framework trabaja con un orden en sus carpetas donde sus nombres tienen una razón de ser.  
Aunque, actualmente hay dos arquitecturas populares: **Screaming** y **Modular**.

| Arquitectura | Organización | Ventajas | Ideal para | Desventajas |
|--------------|--------------|----------|------------|-------------|
| **Screaming Architecture** | Carpetas organizadas por **dominio o funcionalidad** (ej. `/users`, `/products`, `/orders`) | - Claridad en el propósito del proyecto<br>- Fácil de entender la lógica de negocio | Proyectos grandes donde la **lógica de negocio** es más importante que la tecnología | - Puede generar duplicación de código<br>- Menos reutilización de componentes<br>- Escalabilidad más difícil si no se controla bien |
| **Modular** | Proyecto dividido en **módulos independientes** que incluyen sus propios componentes, hooks, estilos y servicios | - Reutilización de código<br>- Aislamiento de dependencias<br>- Escalabilidad | Equipos grandes y proyectos que requieren **alta mantenibilidad y crecimiento** | - Puede ser más complejo de configurar<br>- Riesgo de sobre‑modularización<br>- Curva de aprendizaje mayor para nuevos integrantes |

