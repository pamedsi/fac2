import { mapeamentoDireto } from "../direto.ts";
import { T, tipoDeMapeamento } from "../model/tipoDeMapeamento.ts"

export const comparar = (enderecoDaMemoria: T, enderecoDoProcessador: T, tipo: tipoDeMapeamento) => {
  switch (tipo) {
    case "dir":{
      const bloco1 = enderecoDaMemoria as mapeamentoDireto
      const bloco2 = enderecoDoProcessador as mapeamentoDireto

      const endereco1 = bloco1.tag + bloco1.linha
      const endereco2 = bloco2.tag + bloco2.linha

      return endereco1 === endereco2
    }
    default: {
      return enderecoDaMemoria.tag === enderecoDoProcessador.tag
    }
  }
}