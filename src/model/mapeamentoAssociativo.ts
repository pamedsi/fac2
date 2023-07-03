import { mapeamento } from "./mapeamento.ts";

export class mapeamentoAssociativo extends mapeamento {
  constructor(endereco: string, tamanhoDoBlocoEmBytes: number){
    super(endereco, tamanhoDoBlocoEmBytes)
    this.tag = this.enderecoEmBits.substring(0, this.enderecoEmBits.length - this.bitsDaPalavra)
  }
}