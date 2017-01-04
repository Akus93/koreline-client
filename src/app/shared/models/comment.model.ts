import {UserProfile} from "./userProfile.model";

export class Comment {
  author: UserProfile;
  teacher: UserProfile;
  text: string;
  rate: number;
  create_date: string;
}
