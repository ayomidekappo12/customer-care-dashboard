"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Building2,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Coin Exchange",
    icon: ArrowLeftRight,
    href: "/coin-exchange",
  },
  {
    title: "Bank Management",
    icon: Building2,
    href: "/bank-management",
  },
  {
    title: "Inbox",
    icon: Mail,
    href: "/",
    active: true,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const SidebarNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col bg-primary border-r border-sidebar-border transition-all duration-300 h-full",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Image
                src={`https://res.cloudinary.com/dxvf9uqwe/image/upload/v1755263363/image_35_pafzfb.png`}
                alt="Logo"
                width={50}
                height={50}
                className="brightness-110 contrast-125"
                quality={90}
                priority
              />
            </div>
            <span className="text-sidebar-foreground font-semibold text-lg">
              BIBUAIN
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-primary-accent ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location === item.href || item.active;
            const Icon = item.icon;

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-primary-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-white/20 text-sidebar-accent-foreground"
                      : "text-sidebar-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNav;
