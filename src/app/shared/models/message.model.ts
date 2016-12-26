import {UserProfile} from "./userProfile.model";

export class Message {
  sender: UserProfile;
  reciver: UserProfile;
  text: string;
  isRead: boolean;
  createDate: string;
}
