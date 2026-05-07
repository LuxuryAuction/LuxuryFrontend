"use client";

import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "./useIsMobile";

const STORAGE_KEY = "bidvault:sidebar:collapsed";
const MOBILE_BP = 900;

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) === "true";
    setIsCollapsed(stored);
    setIsMounted(true);
  }, []);

  const isMobile = useIsMobile(MOBILE_BP);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const toggleDrawer = useCallback(() => setIsOpen(p => !p), []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return {
    isOpen,
    isCollapsed,
    isMounted,
    isMobile,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    toggleCollapse,
  };
}