"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, LogOut, RefreshCcw, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DashboardHeader() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  return (
    <div className="border-b bg-white px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              className="pl-10 w-80 bg-white"
            />
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center text-sm text-muted-foreground">
            <RefreshCcw className="h-4 w-4 mr-1" />
            <span>Last updated 2 min ago</span>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex rounded-lg border-[0.5px] border-[#F3F4F6] p-3 font-mono">
                <Clock className="h-4 w-4 mr-1 pt-0.5" />
                {formatTime(elapsed)}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <Button className="border-[0.5px] border-[#F3F4F6] bg-white cursor-pointer text-muted-foreground no-hover">
                Break
              </Button>
              <Button className="gap-2 bg-[#fef2f2] text-destructive cursor-pointer hover:bg-destructive hover:text-white">
                <LogOut className="h-4 w-4 mr-1" /> Clock Out
              </Button>
            </div>

            <div className="flex items-center">
              <Avatar className="ml-2">
                <AvatarFallback>
                  <User className="h-4 w-4"  />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start leading-tight ml-2">
                <span className="text-sm font-medium">Support Agent</span>
                <span className="text-xs text-success">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
