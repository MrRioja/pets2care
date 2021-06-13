import * as Yup from "yup";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { deleteAvatar } from "../utils/deleteImages";
import highlights_view from "../views/highlights_view";
import { stringToBoolean } from "../utils/stringToBoolean";
import { HighlightsRepository } from "../repositories/HighlightsRepository";

class HighlightsController {
  async index(req: Request, res: Response) {
    const highlightsRepository = getCustomRepository(HighlightsRepository);

    const highlights = await highlightsRepository.find({
      where: { isSpotlight: true },
    });

    return res.json(highlights_view.renderMany(highlights));
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const highlightsRepository = getCustomRepository(HighlightsRepository);

    const highlight = await highlightsRepository.findOneOrFail(id);

    return res.json(highlights_view.render(highlight));
  }

  async create(req: Request, res: Response) {
    const highlightsRepository = getCustomRepository(HighlightsRepository);

    const createdAt = Date.now();
    const { title, content } = req.body;

    const isSpotlight =
      req.body.isSpotlight !== undefined && req.body.isSpotlight !== ""
        ? await stringToBoolean(req.body.isSpotlight)
        : false;

    const requestImages = req.files as Express.Multer.File[];

    const [{ path: image }] =
      requestImages.length > 0
        ? requestImages.map((image) => {
            return { path: image.filename };
          })
        : [{ path: undefined }];

    const data = {
      title,
      content,
      isSpotlight,
      image,
      createdAt,
    };

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().required(),
      isSpotlight: Yup.boolean(),
      image: Yup.string().nullable(),
      createdAt: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const highlight = highlightsRepository.create(data);

    await highlightsRepository.save(highlight);

    return res.status(201).json(highlights_view.render(highlight));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const requestImages = req.files as Express.Multer.File[];

    const highlightsRepository = getCustomRepository(HighlightsRepository);
    const highlight = await highlightsRepository.findOneOrFail(id);

    const oldImage = highlight.image;

    let image = highlight.image;

    if (requestImages.length > 0) {
      [{ path: image }] = requestImages.map((image) => {
        return { path: image.filename };
      });
    } else if (req.body.image === "") {
      image = "";
    }

    if (oldImage?.length > 0 && oldImage !== image) {
      deleteAvatar(oldImage);
    }

    const isSpotlight =
      req.body.isSpotlight !== undefined && req.body.isSpotlight !== ""
        ? await stringToBoolean(req.body.isSpotlight)
        : false;

    const data = {
      title: req.body.title,
      content: req.body.content,
      isSpotlight: req.body.isSpotlight !== undefined ? isSpotlight : undefined,
      image,
    };

    highlightsRepository.merge(highlight, data);

    const highlightUpdated = await highlightsRepository.save(highlight);

    return res.json(highlights_view.render(highlightUpdated));
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const highlightsRepository = getCustomRepository(HighlightsRepository);

    const highlight = await highlightsRepository.findOneOrFail(id);

    const image = highlight.image;

    if (image?.length > 0) {
      deleteAvatar(image);
    }

    await highlightsRepository.delete(id);

    return res.json({ message: "Deletado com sucesso!" });
  }
}

export { HighlightsController };
