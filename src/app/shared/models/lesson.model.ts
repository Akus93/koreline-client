import {UserProfile} from "./userProfile.model";
import {Conversation} from "./conversation.model";

export class Lesson {
  teacher: UserProfile;
  title: string;
  slug: string;
  subject: string;
  stage: string;
  price: number;
  students: UserProfile[];
  conversation: Conversation;
  shortDescription: string;
  longDescription: string;
}
