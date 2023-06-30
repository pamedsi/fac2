import { mapeamento } from "./model/mapeamento.ts"

export class mapeamentoDireto extends mapeamento {
  linha: string
  blocoNaMP?: number
  index?: number

  constructor (endereco: string) {
    super()
    const enderecoEmBits = parseInt(endereco, 16).toString(2).padStart(32, '0')

    this.tag = enderecoEmBits.substring(0,10)
    this.linha = enderecoEmBits.substring(10,20)
    this.palavra = enderecoEmBits.substring(20,32)
    this.blocoNaMP = parseInt(this.tag + this.linha, 2)
  }

  gerarIndex(linhasDaCache: number) {
    this.index = this.blocoNaMP! % linhasDaCache
    return this.index
  }
}
