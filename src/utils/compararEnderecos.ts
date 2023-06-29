// import { mapeamentoAssociativoFIFO } from "../associativoFIFO.ts"

export const comparar = (enderecoAProcurar: Object, enderecoEncontrado: Object) => {
  return JSON.stringify(enderecoAProcurar) === JSON.stringify(enderecoEncontrado)
}