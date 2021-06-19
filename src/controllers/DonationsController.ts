import { Request, Response } from "express";

class DonationsController {
  async create(req: Request, res: Response) {
    return res.json({
      message: "Solicitação de contato enviada para o dono do anúncio",
    });
  }

  async index(req: Request, res: Response) {
    return res.json({
      message: "Solicitações de contato recebidas",
    });
  }

  async accept(req: Request, res: Response) {
    return res.json({
      message: "Solicitação de contato aceita",
    });
  }
}

export { DonationsController };
