"use client";

import { useMemo, useState } from "react";
import { NotificationFilterTab } from "./types";
import { NotificationType } from "@/src/services/UsersService/types";
import PageHeader from "@/src/components/ui/PageHeader";
import { NotificationItem } from "./components/NotificationItem";
import { Tabs } from "@/src/components/ui/Tabs";
import { Button } from "@/src/components/ui/Button";
import { NoData } from "@/src/components/ui/NoData";
import { useToast } from "@/src/components/ui/Toast";
import { Pagination } from "@/src/components/ui/Pagination";
import { usePaginationScroll } from "@/src/hooks/usePaginationScroll";
import { useNotifications } from "@/src/hooks/useNotifications";
import { Alert } from "@/src/components/ui/Alert";

const ITEMS_PER_PAGE = 10;

export const NotificationsView = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<NotificationFilterTab>("all");
  const [page, setCurrentPage] = useState(1);

  usePaginationScroll(page);

  const listParams = useMemo(
    () => ({
      page,
      pageSize: ITEMS_PER_PAGE,
      notificationType: activeTab !== "all" ? activeTab : undefined,
    }),
    [page, activeTab],
  );

  const {
    items,
    unreadCount,
    totalPages,
    totalCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
  } = useNotifications(listParams);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      showToast("success", "All notifications marked as read");
    } catch {
      showToast("error", "Failed to mark notifications as read");
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id);
      showToast("success", "Notification marked as read");
    } catch {
      showToast("error", "Failed to mark notification as read");
    }
  };

  const handleTabChange = (tab: NotificationFilterTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const tabsConfig = useMemo(
    () => [
      { id: "all" as NotificationFilterTab, label: "All" },
      {
        id: NotificationType.Outbid,
        label: "Outbid",
      },
      {
        id: NotificationType.Win,
        label: "Won",
      },
      {
        id: NotificationType.Payment,
        label: "Payments",
      },
    ],
    [],
  );

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
            onClick={handleMarkAllAsRead}
            className="font-mono text-[8px] uppercase tracking-widest"
            disabled={unreadCount === 0 || isLoading}
          >
            Mark All Read
          </Button>
        }
      />

      {error && (
        <Alert variant="error" title="Failed to load notifications" className="mb-6">
          {error.message}
        </Alert>
      )}

      <Tabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={handleTabChange}
        className="mb-6"
      />

      <div className="bg-[#0d0f14] border border-white/5 rounded-[24px] overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-10 text-center font-mono text-[11px] text-content-tertiary uppercase tracking-widest">
            Loading notifications...
          </div>
        ) : items.length > 0 ? (
          <div className="divide-y divide-white/3">
            {items.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                index={index}
              />
            ))}
          </div>
        ) : (
          <NoData description="No notifications in this category" />
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-5"
        />
      )}

      {!isLoading && items.length > 0 && (
        <p className="mt-3 text-center font-mono text-[9px] text-content-tertiary uppercase tracking-widest">
          Showing {items.length} of {totalCount}
        </p>
      )}
    </div>
  );
};
