import {UserProfile} from "./userProfile.model";
import {Lesson} from "./lesson.model";

export class Bill {
  user: UserProfile;
  lesson: Lesson;
  amount: number;
  isPaid: boolean;
  createDate: string;
  paidDate: string;
}
