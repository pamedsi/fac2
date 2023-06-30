import { mapeamento } from "./model/mapeamento.ts";

export class mapeamentoAssociativoFIFO extends mapeamento{
  criadoEm?: number

  constructor (endereco: string) {
    super()
    const enderecoEmBits = parseInt(endereco, 16).toString(2).padStart(32, '0')

    this.tag = enderecoEmBits.substring(0,20)
    this.palavra = enderecoEmBits.substring(20,32)
    this.criadoEm = Date.now()
  }
}