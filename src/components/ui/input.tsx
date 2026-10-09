import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref} // ⚡ This safely captures the React Hook Form register ref stream!
        data-slot="input"
        className={cn(
          "h-10 w-full min-w-0 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white transition-colors outline-none placeholder:text-neutral-500 focus-visible:border-[#D4AF37]/50 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
