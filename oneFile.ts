class mapeamento {
  tag!: string;
  palavra!: string;
  enderecoEmBits: string
  bitsDaPalavra: number

  constructor (endereco: string, tamanhoDoBlocoEmBytes: number) {
    const bitsDoEndereco = (endereco.length - 2) * 4
    this.enderecoEmBits = parseInt(endereco, 16).toString(2).padStart(bitsDoEndereco, '0')
    this.bitsDaPalavra = Math.log2(tamanhoDoBlocoEmBytes)
    const ultimoBit = this.enderecoEmBits.length
    this.palavra = this.enderecoEmBits.substring(ultimoBit - this.bitsDaPalavra, ultimoBit)
  }
}
class mapeamentoAssociativo extends mapeamento {
  constructor(endereco: string, tamanhoDoBlocoEmBytes: number){
    super(endereco, tamanhoDoBlocoEmBytes)
    this.tag = this.enderecoEmBits.substring(0, this.enderecoEmBits.length - this.bitsDaPalavra)
  }
}
class mapeamentoAssociativoFIFO extends mapeamentoAssociativo{
  criadoEm?: number

  constructor (endereco: string, criadoEm: number, tamanhoDoBlocoEmBytes: number) {
    super(endereco, tamanhoDoBlocoEmBytes)
    this.criadoEm = criadoEm
  }
}
class mapeamentoAssociativoLRU extends mapeamentoAssociativo{
  ultimoAcesso?: number

  constructor (endereco: string, tamanhoDoBlocoEmBytes: number, ultimoAcesso: number) {
    super(endereco, tamanhoDoBlocoEmBytes)
    this.ultimoAcesso = ultimoAcesso
  }

  async acessar() {
    this.ultimoAcesso = await agora()
  }
}
class mapeamentoDireto extends mapeamento {
  linha: string
  index: number

  constructor (endereco: string, numeroDeLinhasDaCache: number, tamanhoDoBlocoEmBytes: number) {
    super(endereco, tamanhoDoBlocoEmBytes)
    const bitsDaLinha = Math.log2(numeroDeLinhasDaCache)
    const fimDaLinha = this.enderecoEmBits.length - this.bitsDaPalavra
    this.linha = this.enderecoEmBits.substring(fimDaLinha - bitsDaLinha, fimDaLinha)
    this.tag = this.enderecoEmBits.substring(0, fimDaLinha - bitsDaLinha)
    
    this.index = parseInt(this.tag + this.linha, 2) % numeroDeLinhasDaCache
  }
}
type tipoDeMapeamento = "dir" | "fifo" | "lru"
type T = mapeamentoAssociativoFIFO | mapeamentoAssociativoLRU | mapeamentoDireto
const comparar = (enderecoDaMemoria: T, enderecoDoProcessador: T, tipo: tipoDeMapeamento) => {
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
function agora(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now());
    }, 10);
  });
}
const entradaValida = (entrada: string) => {
  if (!entrada) return false
  const minusculo = entrada.toLowerCase()
  return minusculo === "dir" || minusculo === "fifo" || minusculo === "lru"
}
class Cache {
  // deno-lint-ignore no-explicit-any
  linhas: any[]
  readonly numeroDeLinhas: number
  readonly mapeamento: tipoDeMapeamento
  espacosUsados: number
  
  constructor (linhas: number, mapeamento: tipoDeMapeamento) {
    this.linhas = []
    this.numeroDeLinhas = linhas
    this.mapeamento = mapeamento
    this.espacosUsados = 0
  }

  async buscar (bloco: T) {
      switch (this.mapeamento) {
      case "dir": {
        const blocoConvertido = bloco as mapeamentoDireto
        const indexOcupado = this.linhas.find(bloco => bloco.index === blocoConvertido.index)
        if (indexOcupado) return comparar(indexOcupado, blocoConvertido, "dir")
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
          await achou.acessar()
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
      case "dir": {
        this.linhas.push(bloco)
        this.espacosUsados++
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
          this.linhas.push(bloco)
        }
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
          this.linhas.push(bloco)
        }
        break
      }
    }
  }

  estaCheia(): boolean {
    return this.espacosUsados === this.numeroDeLinhas
  }
}
const { log } = console
try {
  const [nomeDoArquivo, tipoDoMapeamento]  = Deno.args
  if (!nomeDoArquivo) throw new Error("Insira o nome do arquivo de entrada (Ex: 'input.txt'")
  if (!entradaValida(tipoDoMapeamento)) throw new Error("Tipo de mapeamento inválido! Insira 'DIR', 'LRU' ou 'FIFO'.");
  
  const mapeamento = tipoDoMapeamento.toLowerCase() as tipoDeMapeamento
  const entradas = (await Deno.readTextFile(`./${nomeDoArquivo}`)).split('\n')
  const [numeroDeLinhas, tamanhoDaLinha] = entradas.shift()!.split(' ').map(Number)
  const cache = new Cache(numeroDeLinhas, mapeamento)

  entradas.forEach(async endereco => {
    switch (mapeamento) {
      case "dir": {
        const bloco = new mapeamentoDireto(endereco, numeroDeLinhas, tamanhoDaLinha)
        if(await cache.buscar(bloco)) log('HIT')
        else log('MISS')
        break
      }
      case "fifo": {
        const bloco = new mapeamentoAssociativoFIFO(endereco, await agora(), tamanhoDaLinha)
        if(await cache.buscar(bloco)) log('HIT')
        else log('MISS')
        break
      }
      case "lru": {
        const bloco = new mapeamentoAssociativoLRU(endereco, tamanhoDaLinha, await agora())
        if(await cache.buscar(bloco)) log('HIT')
        else log('MISS')
        break
      }
      default:
        throw new Error("Modelo de mapeamento não reconhecido!")
    }
  })
} catch (error) {
  log(error)
}