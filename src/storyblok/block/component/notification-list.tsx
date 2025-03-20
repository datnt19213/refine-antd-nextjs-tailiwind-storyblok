import React from "react";

import {AlertTriangle, Check, History, Info} from "lucide-react";

import {cn} from "@/lib/cn";

const notifications: any[] = [
  {
    id: "1",
    title: "Order Confirmed",
    message: "Your order has been successfully placed.",
    type: "success",
    timestamp: Date.now(),
  },
  {
    id: "2",
    title: "Payment Failed",
    message: "There was an issue with your payment. Please try again.",
    type: "error",
    timestamp: Date.now() - 5000,
  },
  {
    id: "3",
    title: "New Feature Available",
    message: "Check out the latest update in your dashboard!",
    type: "info",
    timestamp: Date.now() - 10000,
  },
  {
    id: "4",
    title: "Low Storage Warning",
    message: "Your available storage is running low. Consider upgrading.",
    type: "warn",
    timestamp: Date.now() - 20000,
  },
  {
    id: "5",
    title: "Low Storage Warning",
    message: "Your available storage is running low. Consider upgrading.",
    type: "warn",
    timestamp: Date.now() - 20000,
  },
  {
    id: "6",
    title: "Low Storage Warning",
    message: "Your available storage is running low. Consider upgrading.",
    type: "info",
    timestamp: Date.now() - 20000,
  },
];
const NotificationList = ({block}: any) => {
  return (
    <div className="min-w-[350px] max-h-[500px] bg-white  rounded-lg p-4 ">
      <span className="font-semibold text-xl">Notifications</span>
      <div className="h-[calc(100%-28px)] overflow-y-auto flex flex-col gap-2 py-2">
        {notifications.map((notification: any) => (
          <div
            key={notification.id}
            className={cn(
              "p-4 rounded-lg relative h-[84px] ",
              notification.type === "error"
                ? "bg-red-200/50"
                : notification.type === "success"
                ? "bg-green-200/50"
                : notification.type === "info"
                ? "bg-blue-200/50"
                : notification.type === "warn"
                ? "bg-yellow-200/50"
                : ""
            )}
          >
            <div className="flex items-center w-full gap-2 h-full">
              {notification.type === "error" && <History size={20} />}
              {notification.type === "success" && <Check size={20} />}
              {notification.type === "info" && <Info size={20} />}
              {notification.type === "warn" && <AlertTriangle size={20} />}
              <div className="w-full flex-col h-full flex gap-0.5 ">
                <span className="font-medium text-sm text-[#27272A]">
                  {notification.title}
                </span>
                <span className="font-medium text-gray-700 text-xs">
                  {notification.message}
                </span>
                <span className="font-medium text-gray-500 text-[10px] absolute top-2 right-2">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
