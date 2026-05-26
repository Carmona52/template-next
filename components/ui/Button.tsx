import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    {
        variants: {
            variant: {
                default: 'shadow-md border border-gray-700/10',
                primary: 'bg-primary text-primary-foreground font-bold text-base shadow-md hover:bg-primary/90',
                secondary: 'bg-secondary text-secondary-foreground font-bold text-base shadow-md hover:bg-secondary/80',
                destroy: 'bg-transparent text-red-500 font-bold text-base hover:text-red-600 hover:shadow-md',
                kevinespecial: 'animate-rainbow bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white font-bold text-base shadow-md',
                sidebar: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg shadow-md border border-gray-700/10 hover:shadow-lg transition duration-150 ease-in-out text-2xl',
            },
            size: {
                default: 'h-10 px-4 py-2',
                xs: 'h-8 p-2 rounded-sm',
                sm: 'h-9 p-2 rounded-md',
                lg: 'h-11 py-2 px-5',
                xl: 'h-12 py-2 px-8',
                sidebar: 'h-14 px-4 py-3 text-base'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, icon, iconPosition = "left", children, ...props }, ref) => {
        return (
            <button className={cn(buttonVariants({ variant, size, className }))} ref={ref}{...props}>
                {icon && iconPosition === "left" && icon}
                {children}
                {icon && iconPosition === "right" && icon}
            </button>
        )
    }
)

Button.displayName = "Button"

export {Button, buttonVariants}