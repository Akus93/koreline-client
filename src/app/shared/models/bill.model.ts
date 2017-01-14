import {UserProfile} from "./userProfile.model";
import {Lesson} from "./lesson.model";

export class Bill {
  id: number;
  user: UserProfile;
  lesson: Lesson;
  amount: number;
  isPaid: boolean;
  createDate: string;
  paidDate: string;
}
