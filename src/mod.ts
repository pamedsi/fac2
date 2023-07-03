import { mapeamentoAssociativoFIFO } from "./mapeamentos/associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "./mapeamentos/associativoLRU.ts";
import { Cache } from "./cache.ts"
import { mapeamentoDireto } from "./mapeamentos/direto.ts";
import { tipoDeMapeamento } from "./model/tipoDeMapeamento.ts"
import { agora } from "./utils/gerarMomento.ts";
import { entradaValida } from "./validation/validadorDeEntrada.ts";
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