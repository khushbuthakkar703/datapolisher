import Notification from "./models/notification.model";
import User from "./models/user.model";

export interface AppState {
    readonly user: User;
    readonly notification: Notification
}