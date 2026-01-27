import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'social'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
        const variants = {
            primary: "bg-[#0C6FFF] text-white hover:bg-[#1D61F2]/90 shadow-sm",
            secondary: "bg-muted text-foreground hover:bg-muted/80",
            outline: "border border-border bg-background hover:bg-muted text-foreground",
            ghost: "hover:bg-muted text-foreground",
            social: "border border-[#E5E5E5] bg-white hover:bg-gray-50 text-[#1D1D1F] text-sm font-medium",
        }

        const sizes = {
            default: "h-[40px] px-6 py-2",
            sm: "h-8 px-3",
            lg: "h-11 px-8 text-lg",
            icon: "h-9 w-9",
        }

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D61F2] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
