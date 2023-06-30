import { mapeamentoAssociativoFIFO } from "../associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "../associativoLRU.ts";
import { T, tipoDeMapeamento } from "../model/tipoDeMapeamento.ts"

export const comparar = (enderecoAProcurar: T, enderecoEncontrado: T, tipo: tipoDeMapeamento) => {
  switch (tipo) {
    case "direto":
      return JSON.stringify(enderecoAProcurar) === JSON.stringify(enderecoEncontrado)
    case "fifo": {
      const blocoAProcurar = enderecoAProcurar as mapeamentoAssociativoFIFO
      const blocoEncontrado = enderecoEncontrado as mapeamentoAssociativoFIFO
      delete blocoAProcurar.criadoEm
      delete blocoEncontrado.criadoEm
      return JSON.stringify(blocoAProcurar) === JSON.stringify(blocoEncontrado)
    }
    case "lru": {
      const blocoAProcurar = enderecoAProcurar as mapeamentoAssociativoLRU
      const blocoEncontrado = enderecoEncontrado as mapeamentoAssociativoLRU
      delete blocoAProcurar.ultimoAcesso
      delete blocoEncontrado.ultimoAcesso
      return JSON.stringify(blocoAProcurar) === JSON.stringify(blocoEncontrado)
    }
  }
}