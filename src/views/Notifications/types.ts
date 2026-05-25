import type { INotification } from "@/src/services/UsersService/types";
import { NotificationType } from "@/src/services/UsersService/types";

export type { INotification };
export { NotificationType };

export type NotificationFilterTab = "all" | NotificationType;
