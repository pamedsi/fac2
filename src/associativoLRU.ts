import { mapeamento } from "./model/mapeamento.ts";
import { agora } from "./utils/gerarMomento.ts";

export class mapeamentoAssociativoLRU extends mapeamento{
  ultimoAcesso?: number

  constructor (endereco: string, ultimoAcesso: number) {
    super()
    const enderecoEmBits = parseInt(endereco, 16).toString(2).padStart(32, '0')

    this.tag = enderecoEmBits.substring(0,20)
    this.palavra = enderecoEmBits.substring(20,32)
    this.ultimoAcesso = ultimoAcesso
  }

  async acessar() {
    this.ultimoAcesso = await agora()
  }
}