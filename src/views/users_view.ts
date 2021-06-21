import User from "../models/User";

export default {
  render(user: User, token?: string, accepted?: boolean) {
    return {
      id: user.id,
      name: user.name,
      email:
        accepted === true || accepted === undefined
          ? user.email
          : "Sem permissão para visualizar",
      gender: user.gender,
      cep:
        accepted === true || accepted === undefined
          ? user.cep
          : "Sem permissão para visualizar",
      street:
        accepted === true || accepted === undefined
          ? user.street
          : "Sem permissão para visualizar",
      number:
        accepted === true || accepted === undefined
          ? user.number
          : "Sem permissão para visualizar",
      complement:
        accepted === true || accepted === undefined
          ? user.complement
          : "Sem permissão para visualizar",
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
      birthDate: user.birthDate,
      telephone:
        accepted === true || accepted === undefined
          ? user.telephone
          : "Sem permissão para visualizar",
      description: user.description,
      website: user.website,
      avatar:
        user.avatar?.length > 0 && user.avatar !== null
          ? `http://${process.env.IP}/uploads/${user.avatar}`
          : null,
      isSpotlight: user.isSpotlight,
      createdAt: user.createdAt,
      token: token,
    };
  },

  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};
