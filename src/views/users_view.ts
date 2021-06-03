import User from "../models/User";

export default {
  render(user: User, token?: string) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      cep: user.cep,
      street: user.street,
      number: user.number,
      complement: user.complement,
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
      birthDate: user.birthDate,
      telephone: user.telephone,
      description: user.description,
      website: user.website,
      avatar: `http://${process.env.IP}/uploads/${user.avatar}`,
      createdAt: user.createdAt,
      token: token,
    };
  },

  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};
