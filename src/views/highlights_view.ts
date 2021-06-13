import Highlight from "../models/Highlight";

export default {
  render(highlight: Highlight) {
    return {
      id: highlight.id,
      title: highlight.title,
      content: highlight.content,
      image: highlight.image,
      isSpotlight: highlight.isSpotlight,
      createdAt: highlight.createdAt,
    };
  },

  renderMany(highlights: Highlight[]) {
    return highlights.map((highlight) => this.render(highlight));
  },
};
