export default class User {
  constructor(name, email, image, emailVerified) {
    if (name) {
      this.name = name;
    }
    if (email) {
      this.email = email;
    }
    if (image) {
      this.image = image;
    }
    if (emailVerified) {
      const currentDate = new Date();
      this.emailVerified = currentDate;
    }
  }
}

export const UserSchema = {
  name: "User",
  target: User,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: true,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: true,
    },
    emailVerified: {
      type: "timestamp",
      nullable: true,
    },
    image: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
    // Extend the default model with uuid
    uuid: {
      type: "varchar",
      nullable: true,
    },
    team: {
      type: "varchar",
      nullable: true,
    },
  },
};
