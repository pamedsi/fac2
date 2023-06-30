import { mapeamentoAssociativoFIFO } from "./associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "./associativoLRU.ts";
import { T, tipoDeMapeamento } from "./model/tipoDeMapeamento.ts";
import { comparar } from "./utils/compararEnderecos.ts";

export class Cache {
  // deno-lint-ignore no-explicit-any
  linhas: any[]
  // linhas: mapeamentoDireto[] | mapeamentoAssociativo [] | (mapeamentoAssociativo & mapeamentoDireto)[] | (mapeamentoAssociativo | mapeamentoDireto)[]
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

  buscar (bloco: T) {
    // Meta agora é endenter o que vai ser guardado nesse array
    // Se a linha ou se a palavra

    // COrrigir a função de comparar os objetos no compararEnderecos.ts
      switch (this.mapeamento) {
      case "direto": {
        // const {tag, linha, palavra} = new mapeamentoDireto(endereco)
        // const index = parseInt(tag, 2) % this.numeroDeLinhas
        // const achou = Boolean()

        // if (achou) return true
        // else {
        //   this.guardar(endereco, index) 
        //   return false
        // }
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

  guardar(bloco: T) {
    switch (this.mapeamento) {
      case "direto": {
        
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
        break
      }
    }
  }

  estaCheia() {
    return this.espacosUsados !== this.numeroDeLinhas
  }
}