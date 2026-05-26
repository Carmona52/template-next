'use client'
import * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {ChevronLeft} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/Button"

interface SidebarContextValue {
    collapsed: boolean
    setCollapsed: (v: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
    collapsed: false,
    setCollapsed: () => {
    },
})

export function SidebarProvider({children}: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = React.useState(false)
    return (
        <SidebarContext.Provider value={{collapsed, setCollapsed}}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    return React.useContext(SidebarContext)
}

const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
    ({ className, children, ...props }, ref) => {
        const { collapsed, setCollapsed } = useSidebar();

        return (
            <aside
                ref={ref}
                className={cn("relative flex flex-col h-full bg-background border-r border-gray-200 dark:border-gray-700",
                    "transition-[width] duration-300 ease-in-out",
                    collapsed ? "w-20" : "w-80",
                    className
                )}
                {...props}>

                {children}

                <Button
                    onClick={() => setCollapsed(!collapsed)}
                    icon={<ChevronLeft className="w-5 h-5"/>}
                    className={cn(
                        "absolute top-6 -right-3 z-50",
                        "flex items-center justify-center",
                        "w-8 h-8 rounded-full",
                        "bg-background border border-gray-200 dark:border-gray-700",
                        "text-muted-foreground hover:text-foreground",
                        "shadow-sm",
                        "transition-transform duration-300",
                        collapsed && "rotate-180"
                    )}
                    aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}>
                </Button>
            </aside>
        );
    }
);
Sidebar.displayName = "Sidebar";

const SidebarSectionHeader = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({className, ...props}, ref) => {
        const {collapsed} = useSidebar()
        return (
            <h2
                ref={ref}
                className={cn(
                    "text-lg font-semibold text-foreground p-6 pb-4",
                    "transition-opacity duration-150",
                    collapsed ? "opacity-0 px-5 pt-6 pb-2 select-none pointer-events-none" : "opacity-100 px-5 pt-6 pb-2",
                    className
                )}
                {...props}
            />
        )
    }
)
SidebarSectionHeader.displayName = "SidebarSectionHeader"

const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
    ({className, ...props}, ref) => (
        <ul ref={ref} className={cn("space-y-1 px-3 pb-6", className)} {...props} />
    )
)
SidebarMenu.displayName = "SidebarMenu"

interface SidebarMenuButtonProps extends React.HTMLAttributes<HTMLLIElement> {
    children: React.ReactNode
    href: string
    icon?: React.ReactNode
    isActive?: boolean
}

const SidebarMenuButton = React.forwardRef<HTMLLIElement, SidebarMenuButtonProps>(
    ({className, children, href, icon, isActive, ...props}, ref) => {
        const pathname = usePathname()
        const {collapsed} = useSidebar()
        const active = isActive ?? pathname === href

        return (
            <li ref={ref} className={cn("w-full", className)} {...props}>
                <Link href={href} className="block w-full" title={collapsed ? String(children) : undefined}>
                    <Button
                        variant="sidebar"
                        size="sidebar"
                        data-active={active}
                        className={cn(
                            "w-full gap-4",
                            collapsed ? "justify-center px-0" : "justify-start px-4",
                            active && "bg-accent text-accent-foreground font-semibold"
                        )}>
                        {icon && (<span className="shrink-0 flex items-center justify-center">{icon}</span>)}
                        {!collapsed && (<span className="text-base leading-none truncate">{children}</span>)}
                    </Button>
                </Link>
            </li>
        )
    }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarDivider = () => (
    <div className="mx-4 my-2 border-t border-gray-200 dark:border-gray-700"/>
)

export {Sidebar, SidebarSectionHeader, SidebarMenu, SidebarMenuButton, SidebarDivider}