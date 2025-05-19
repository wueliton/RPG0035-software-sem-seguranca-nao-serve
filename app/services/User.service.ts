import users from "../data/users.json";

type User = (typeof users)[number];

class UserService {
  find(data: Partial<User>) {
    const keys = Object.keys(data) as (keyof User)[];
    const hasData = keys.length;
    if (!hasData) return null;

    return users.find((fields) =>
      keys.every((field) => data[field] === fields[field])
    );
  }

  findById(id: number) {
    return users.find((user) => user.id === id);
  }

  findAll() {
    return users.map(({ password, ...user }) => user);
  }
}

export default UserService;
