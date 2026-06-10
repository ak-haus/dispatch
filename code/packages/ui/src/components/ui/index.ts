// Prime DISpatch — F5 primitives barrel.
//
// shadcn-canonical components (button, card, separator) + Radix wrappers
// (dialog, dropdown-menu, tooltip, popover, select, accordion, tabs)
// + cmdk (Command) + vaul (Drawer) + sonner (Toaster) + Floating UI utils.
//
// button/card/separator carry Tailwind utility defaults mapped to Prime
// tokens; Radix wrappers stay class-hooked for surface CSS application
// per Mayor's form-after-function discipline.

export * from "./button";
export * from "./card";
export * from "./separator";
export * from "./badge";
export * from "./avatar";
export * from "./hover-card";
export * from "./aspect-ratio";
export * from "./skeleton";
export * from "./dialog";
export * from "./dropdown-menu";
export * from "./tooltip";
export * from "./popover";
export * from "./select";
export * from "./accordion";
export * from "./tabs";
export * from "./command";
export * from "./drawer";
export * from "./toaster";
export * as Floating from "./floating";
