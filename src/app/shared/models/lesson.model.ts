import {UserProfile} from "./userProfile.model";

export class Lesson {
  teacher: UserProfile;
  title: string;
  slug: string;
  subject: string;
  stage: string;
  price: number;
  students: UserProfile[];
  shortDescription: string;
  longDesription: string;
}
