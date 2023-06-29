import { mapeamento } from "./model/mapeamento.ts";

export class mapeamentoAssociativoFIFO extends mapeamento{
  createdAt: number

  constructor (endereco: string) {
    super()
    const enderecoEmBits = parseInt(endereco, 16).toString(2).padStart(32, '0')

    this.tag = enderecoEmBits.substring(0,20)
    this.palavra = enderecoEmBits.substring(20,32)
    this.createdAt = Date.now()
  }
}