import React, { useState, useCallback, useContext, useMemo, useEffect, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// Sidebar context
const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

// SidebarProvider
const SidebarProvider = forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) setOpenProp(openState);
    else _setOpen(openState);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [setOpenProp, open]);

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
  }, [isMobile, setOpen, setOpenMobile]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo(() => ({
    state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style }}
          className={cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

// Sidebar component
const Sidebar = forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return <div className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)} ref={ref} {...props}>{children}</div>;
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div ref={ref} className="group peer hidden text-sidebar-foreground md:block" data-state={state} data-collapsible={state === "collapsed" ? collapsible : ""} data-variant={variant} data-side={side}>
      <div
        className={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";

// SidebarTrigger
const SidebarTrigger = forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(e) => { onClick?.(e); toggleSidebar(); }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

// SidebarInput
const SidebarInput = forwardRef(({ className, ...props }, ref) => (
  <Input ref={ref} data-sidebar="input" className={cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className)} {...props} />
));
SidebarInput.displayName = "SidebarInput";
// SidebarHeader & Footer
const SidebarHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
));
SidebarFooter.displayName = "SidebarFooter";

// SidebarContent
const SidebarContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="content" className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)} {...props} />
));
SidebarContent.displayName = "SidebarContent";

// SidebarGroup & related
const SidebarGroup = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp ref={ref} data-sidebar="group-label" className={cn("flex h-8 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none focus-visible:ring-2", className)} {...props} />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} data-sidebar="group-action" className={cn("absolute right-3 top-3.5 flex aspect-square items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none focus-visible:ring-2", className)} {...props} />;
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

// SidebarMenu & items
const SidebarMenu = forwardRef(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full flex-col gap-1", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

// SidebarMenuButton
const SidebarMenuButton = forwardRef(({ asChild = false, isActive = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp ref={ref} data-sidebar="menu-button" data-active={isActive} className={cn("flex w-full items-center gap-2 rounded-md px-2 text-left text-sm outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)} {...props} />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

// SidebarMenuSub
const SidebarMenuSub = forwardRef(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu-sub" className={cn("mx-3.5 flex flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", className)} {...props} />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = forwardRef(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = forwardRef(({ asChild = false, isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return <Comp ref={ref} data-sidebar="menu-sub-button" data-active={isActive} className={cn("flex h-7 items-center gap-2 rounded-md px-2 text-sidebar-foreground outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)} {...props} />;
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
};

