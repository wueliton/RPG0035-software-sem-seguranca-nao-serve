import ContractsService from "../services/Contacts.service";
import { Request, Response } from "express";
import queryParse from "../utils/query-parse";

class ContractsController {
  #contractsService: ContractsService;

  constructor(contractsService: ContractsService) {
    this.#contractsService = contractsService;
  }

  getContracts = async (req: Request, res: Response) => {
    const { empresa = "", inicio = "" } = req.params ?? {};
    const query = `Select * from contracts Where empresa = '${queryParse(
      empresa
    )}' And data_inicio = '${queryParse(inicio)}'`;
    const result = this.#contractsService.execute(query);
    res.json({
      result,
      query,
    });
  };
}

export default ContractsController;
