import { mapeamentoAssociativoFIFO } from "./associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "./associativoLRU.ts";
import { mapeamentoDireto } from "./direto.ts";
import { T, tipoDeMapeamento } from "./model/tipoDeMapeamento.ts";
import { comparar } from "./utils/compararEnderecos.ts";

export class Cache {
  // deno-lint-ignore no-explicit-any
  linhas: any[]
  numeroDeLinhas: number
  mapeamento: tipoDeMapeamento
  espacosUsados: number
  
  constructor (linhas: number, mapeamento: tipoDeMapeamento) {
    const errorMessage = "Tipo de mapeamento inválido! Insira 'direto', 'FIFO' ou 'LRU'!"
    const minuscula = mapeamento.toLowerCase()
    const entradaCorreta = minuscula === "direto" || minuscula === "fifo" || minuscula === "lru"
    if (!entradaCorreta) throw new Error(errorMessage)
    
    this.linhas = []
    this.numeroDeLinhas = linhas
    this.mapeamento = minuscula
    this.espacosUsados = 0
  }

  buscar (bloco: T, linhasDaCache: number) {
      switch (this.mapeamento) {
      case "direto": {
        const blocoConvertido = bloco as mapeamentoDireto
        const indexOcupado = this.linhas.find(bloco => bloco.index === blocoConvertido.gerarIndex(linhasDaCache))
        if (indexOcupado) return comparar(indexOcupado, blocoConvertido, "direto")
        else {
          this.guardar(blocoConvertido)
          return false
        }
      }
      case "fifo" :{
        const achou = this.linhas.find(linhaDeCache => comparar(linhaDeCache, bloco, "fifo"))
        if (achou) return true
        else {
          this.guardar(bloco)
          return false
        }
      }
      case "lru" :{
        const achou = this.linhas.find(linhaDeCache => comparar(linhaDeCache, bloco, "lru"))
        if (achou) { 
          achou.acessar()
          return true
        }
        else {
          this.guardar(bloco)
          return false
        }
      }
    }
  }

  guardar(bloco: T): void {
    switch (this.mapeamento) {
      case "direto": {
        this.linhas.push(bloco)
        this.imprimirConfirmacao()
        break;
      }
      case "fifo": {
        if (!this.estaCheia()) {
          this.linhas.push(bloco)
          this.espacosUsados++
        }
        else {
          const maisAntigo: mapeamentoAssociativoFIFO = this.linhas.reduce((menor, atual) => {
            return atual.criadoEm < menor.criadoEm ? atual : menor
          })
          this.linhas = this.linhas.filter(bloco => !comparar(bloco, maisAntigo, "fifo"))
        }

        console.log(`
        Guardando endereço na cache.
        Espaços usados: ${this.espacosUsados}\n
        Espaços disponíveis:${this.numeroDeLinhas - this.espacosUsados}`)
        break
      }
      case "lru": {
        if (!this.estaCheia()) {
          this.linhas.push(bloco)
          this.espacosUsados++
        }
        else {
          const acessadoMenosRecentemente: mapeamentoAssociativoLRU = this.linhas.reduce((acessadoMenosRecentemente, atual) => {
            return acessadoMenosRecentemente.ultimoAcesso < acessadoMenosRecentemente.ultimoAcesso ? atual : acessadoMenosRecentemente
          })
          this.linhas = this.linhas.filter(bloco => !comparar(bloco, acessadoMenosRecentemente, "lru"))
        }
        this.imprimirConfirmacao()
        break
      }
    }
  }

  estaCheia(): boolean {
    return this.espacosUsados !== this.numeroDeLinhas
  }

  imprimirConfirmacao(): void {
    console.log(`
    Guardando endereço na cache.
    Espaços usados: ${this.espacosUsados}\n
    Espaços disponíveis:${this.numeroDeLinhas - this.espacosUsados}`)
  }
}