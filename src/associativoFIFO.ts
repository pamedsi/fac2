import { mapeamentoAssociativo } from "./model/mapeamentoAssociativo.ts";

export class mapeamentoAssociativoFIFO extends mapeamentoAssociativo{
  criadoEm?: number

  constructor (endereco: string, criadoEm: number, tamanhoDoBlocoEmBytes: number) {
    super(endereco, tamanhoDoBlocoEmBytes)
    this.criadoEm = criadoEm
  }
}