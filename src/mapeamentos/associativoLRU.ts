import { mapeamentoAssociativo } from "../model/mapeamentoAssociativo.ts";
import { agora } from "../utils/gerarMomento.ts";

export class mapeamentoAssociativoLRU extends mapeamentoAssociativo{
  ultimoAcesso?: number

  constructor (endereco: string, tamanhoDoBlocoEmBytes: number, ultimoAcesso: number) {
    super(endereco, tamanhoDoBlocoEmBytes)
    this.ultimoAcesso = ultimoAcesso
  }

  async acessar() {
    this.ultimoAcesso = await agora()
  }
}