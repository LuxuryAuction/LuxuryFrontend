"use client";

import { useState, useMemo, useEffect } from "react";
import { MOCK_NOTIFICATIONS } from "./notifications.config";
import { INotification } from "./types";
import PageHeader from "@/src/components/ui/PageHeader";

import { NotificationItem } from "./components/NotificationItem";

import { Tabs } from "@/src/components/ui/Tabs";

import { Button } from "@/src/components/ui/Button";
import { NoData } from "@/src/components/ui/NoData";
import { useToast } from "@/src/components/ui/Toast";
import { Pagination } from "@/src/components/ui/Pagination";
import { usePaginationScroll } from "@/src/hooks/usePaginationScroll";

const ITEMS_PER_PAGE = 5;



type FilterTab = "all" | "outbid" | "win" | "payment" | "system";

export const NotificationsView = () => {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<INotification[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [page, setCurrentPage] = useState(1);

  usePaginationScroll(page);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast("success", "All notifications marked as read");

  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    showToast("success", "Notification marked as read");
  };

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications;
    return notifications.filter(n => {
      if (activeTab === "payment") return n.type === "payment";
      if (activeTab === "win") return n.type === "win" || n.type === "approval";
      if (activeTab === "system") return n.type === "system" || n.type === "ended";
      return n.type === activeTab;
    });
  }, [notifications, activeTab]);

  const paginatedNotifications = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredNotifications.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNotifications, page]);

  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);

  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const counts = useMemo(() => {
    return {
      all: notifications.length,
      outbid: notifications.filter(n => n.type === "outbid").length,
      win: notifications.filter(n => n.type === "win" || n.type === "approval").length,
      payment: notifications.filter(n => n.type === "payment").length,
      system: notifications.filter(n => n.type === "system" || n.type === "ended").length,
    };
  }, [notifications]);

  const tabsConfig = useMemo(() => [
    { id: "all" as FilterTab, label: `All (${counts.all})` },
    { id: "outbid" as FilterTab, label: `Outbid (${counts.outbid})` },
    { id: "win" as FilterTab, label: `Won (${counts.win})` },
    { id: "payment" as FilterTab, label: `Payments (${counts.payment})` },
    { id: "system" as FilterTab, label: `System (${counts.system})` },
  ], [counts]);


  return (
    <div className="p-5 md:p-7 mx-auto max-w-7xl">
      <PageHeader
        label="Activities"
        title="Notification Center"
        description={
          <span className="font-mono text-[10px] text-content-tertiary uppercase tracking-[0.15em]">
            {unreadCount} unread notifications
          </span>
        }
        actions={
          <Button
            variant="secondary"
            onClick={markAllAsRead}
            className="font-mono text-[8px] uppercase tracking-widest"
          >
            Mark All Read
          </Button>
        }
      />

      <Tabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={handleTabChange}
        className="mb-6"
      />

      <div className="bg-[#0d0f14] border border-white/[0.05] rounded-[24px] overflow-hidden shadow-2xl">
        {paginatedNotifications.length > 0 ? (
          <div className="divide-y divide-white/[0.03]">
            {paginatedNotifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                index={index}
              />
            ))}
          </div>
        ) : (
          <NoData description="No notifications in this category" />
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-5"
      />
    </div>
  );
};