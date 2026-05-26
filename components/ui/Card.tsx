import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
    "rounded-xl bg-background text-foreground transition duration-300 ease-in-out hover:drop-shadow-xl ",
    {
        variants: {
            variant: {
                default: "flex flex-col w-96 m-2 p-2 items-center justify-center text-center shadow-lg cursor-pointer border border-primary/20 hover:border-primary/50",
                full:"flex flex-row items-center shadow-lg w-full my-2 p-2 border border-primary/20 hover:border-primary/50",
                flat: "shadow-none bg-secondary/20 border-transparent",
                interactive: "hover:bg-secondary/10 transition-colors cursor-pointer"
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
)

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, ...props }, ref) => (
        <div className={cn(cardVariants({ variant, className }))} ref={ref} {...props} />
    )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn("flex flex-col space-y-1 p-6", className)} ref={ref} {...props} />
    )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 className={cn("text-2xl font-semibold leading-none tracking-tight mb-2", className)} ref={ref} {...props} />
    )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p className={cn("text-sm text-clip p-2 text-secondary-foreground/70 mb-2 text-justify", className)} ref={ref} {...props} />
    )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn("p-6 pt-0 mb-2", className)} ref={ref} {...props} />
    )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn("flex items-center p-6 pt-0", className)} ref={ref} {...props} />
    )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }