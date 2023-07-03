import { mapeamentoAssociativoFIFO } from "../mapeamentos/associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "../mapeamentos/associativoLRU.ts";
import { mapeamentoDireto } from "../mapeamentos/direto.ts";

export type tipoDeMapeamento = "dir" | "fifo" | "lru"
export type T = mapeamentoAssociativoFIFO | mapeamentoAssociativoLRU | mapeamentoDireto