import { mapeamentoAssociativoFIFO } from "../associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "../associativoLRU.ts";
import { mapeamentoDireto } from "../direto.ts";

export type tipoDeMapeamento = "dir" | "fifo" | "lru"
export type T = mapeamentoAssociativoFIFO | mapeamentoAssociativoLRU | mapeamentoDireto