import { mapeamento } from "../model/mapeamento.ts"

export class mapeamentoDireto extends mapeamento {
  linha: string
  index: number

  constructor (endereco: string, numeroDeLinhasDaCache: number, tamanhoDoBlocoEmBytes: number) {
    super(endereco, tamanhoDoBlocoEmBytes)
    const bitsDaLinha = Math.log2(numeroDeLinhasDaCache)
    const fimDaLinha = this.enderecoEmBits.length - this.bitsDaPalavra
    this.linha = this.enderecoEmBits.substring(fimDaLinha - bitsDaLinha, fimDaLinha)
    this.tag = this.enderecoEmBits.substring(0, fimDaLinha - bitsDaLinha)
    
    this.index = parseInt(this.tag + this.linha, 2) % numeroDeLinhasDaCache
  }
}