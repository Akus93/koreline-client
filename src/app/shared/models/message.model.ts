import {UserProfile} from "./userProfile.model";

export class Message {
  id: string;
  sender: UserProfile;
  reciver: UserProfile;
  title: string;
  text: string;
  isRead: boolean;
  createDate: string;
}
