import { mapeamentoAssociativoFIFO } from "../associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "../associativoLRU.ts";
import { mapeamentoDireto } from "../direto.ts";
import { T, tipoDeMapeamento } from "../model/tipoDeMapeamento.ts"

export const comparar = (enderecoAProcurar: T, enderecoEncontrado: T, tipo: tipoDeMapeamento) => {
  switch (tipo) {
    case "dir":{
      const blocoAProcurar = enderecoAProcurar as mapeamentoDireto
      const blocoEncontrado = enderecoEncontrado as mapeamentoDireto
      delete blocoAProcurar.index
      delete blocoAProcurar.blocoNaMP
      delete blocoEncontrado.index
      delete blocoEncontrado.blocoNaMP
      return JSON.stringify(blocoAProcurar) === JSON.stringify(blocoEncontrado)
    }
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