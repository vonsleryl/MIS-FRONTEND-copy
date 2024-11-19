import * as React from "react";

// import { cn } from "@/lib/utils"
import { cn } from "../../lib/utils";
// import { Input } from "@/components/ui/input"
import { Input } from "./input";
// import { Label } from "@/components/ui/label"
import { Label } from "./label";

const FloatingInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Input
      placeholder=" "
      className={cn("peer", className)}
      ref={ref}
      {...props}
    />
  );
});
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "peer-focus:secondary peer-focus:dark:secondary bg-background text-gray-500 dark:bg-background absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

const FloatingLabelInput = React.forwardRef(({ id, label, ...props }, ref) => {
  return (
    <div className="relative">
      <FloatingInput ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
