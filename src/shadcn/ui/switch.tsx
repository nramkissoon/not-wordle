import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/utils";
import { ThemeContext } from "@/components/ThemeProvider";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { theme } = React.useContext(ThemeContext);
  function getClassname() {
    switch (theme) {
      case "dark": {
        return "data-[state=checked]:bg-correct-dark data-[state=unchecked]:bg-absent-dark";
      }
      case "high-contrast-dark": {
        return "data-[state=checked]:bg-correct-hc_dark data-[state=unchecked]:bg-absent-hc_dark";
      }
      case "high-contrast": {
        return "data-[state=checked]:bg-correct-hc data-[state=unchecked]:bg-absent-hc";
      }
      case "light": {
        return "data-[state=checked]:bg-correct-light data-[state=unchecked]:bg-absent-light";
      }
      default:
        return "";
    }
  }
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        getClassname(),
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
