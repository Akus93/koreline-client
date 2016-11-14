class User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;

  // constructor(username: string, firstName: string = '', lastName: string = '', email: string) {
  //   this.username = username;
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  //   this.email = email;
  // }

  // getfullName(): string {
  //   let result: string;
  //   if (this.firstName && this.lastName)
  //     result = this.firstName + this.lastName;
  //   else
  //     result = this.username;
  //   return result
  // }

}

export class UserProfile {
    user: User;
    birthDate: string;

  constructor() {
    this.user = new User();
  }

  // constructor(user: User, birthDate: string = '') {
  //   this.user = user;
  //   this.birthDate = birthDate;
  // }


}
