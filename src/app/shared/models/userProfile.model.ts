class User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;

}

export class UserProfile {
    user: User;
    birthDate: string;
    isTeacher: boolean;
    photo: string;

  constructor() {
    this.user = new User();
  }

}
