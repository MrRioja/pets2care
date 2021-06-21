import Donation from "../models/Donation";
import adverts_view from "./adverts_view";
import users_view from "./users_view";

export default {
  render(donation: Donation) {
    return {
      id: donation.id,
      userId: users_view.render(donation.userId, undefined, donation.accepted),
      ownerId: users_view.render(
        donation.ownerId,
        undefined,
        donation.accepted
      ),
      advertId: adverts_view.render(donation.advertId),
      accepted: donation.accepted,
      createdAt: 1624131582062,
    };
  },

  renderMany(donation: Donation[]) {
    return donation.map((donation) => this.render(donation));
  },
};
