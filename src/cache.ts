import { mapeamentoAssociativoFIFO } from "./associativoFIFO.ts";
import { mapeamentoDireto } from "./direto.ts"
import { tipoDeMapeamento } from "./model/tipoDeMapeamento.ts";
import { comparar } from "./utils/compararEnderecos.ts";

export class Cache {
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

  buscar(bloco: mapeamentoDireto | mapeamentoAssociativoFIFO) {
    // Meta agora é endenter o que vai ser guardado nesse array
    // Se a linha ou se a palavra
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
      case "fifo": {
        const achou = this.linhas.find(linhaDeCache => comparar(linhaDeCache, bloco))
        if (achou) return true
        else {
          this.guardar(bloco)
          return false
        }
      }
      case "lru": {
        
        break
      }
    }

    return false
  }

  guardar(bloco: mapeamentoAssociativoFIFO | mapeamentoDireto) {
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
          const maisAntigo = this.linhas.reduce((menor, atual) => {
            return atual.createdAt < menor.createdAt ? atual : menor
          })
          this.linhas = this.linhas.filter(bloco => !comparar(bloco, maisAntigo))
        }
        
        console.log(`
        Guardando endereço na cache.
        Espaços usados: ${this.espacosUsados}\n
        Espaços disponíveis:${this.numeroDeLinhas - this.espacosUsados}`)
        break
      }
      case "lru": {
        
        break
      }
    }
  }

  estaCheia() {
    return this.espacosUsados !== this.numeroDeLinhas
  }
}