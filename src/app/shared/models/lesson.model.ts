import {UserProfile} from "./userProfile.model";

export class Lesson {
  teacher: UserProfile;
  title: string;
  slug: string;
  subject: string;
  price: number;

  // constructor(teacher: UserProfile, title: string, slug: string) {
  //   this.teacher = teacher;
  //   this.title = title;
  //   this.slug = slug;
  // }
}
