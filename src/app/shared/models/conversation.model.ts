import {UserProfile} from "./userProfile.model";
import {Lesson} from "./lesson.model";

export class Conversation {
  lesson: Lesson;
  student: UserProfile;
  create_date: string;
}
