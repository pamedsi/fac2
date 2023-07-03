import { mapeamentoAssociativoFIFO } from "./associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "./associativoLRU.ts";
import { Cache } from "./cache.ts"
import { mapeamentoDireto } from "./direto.ts";
import { tipoDeMapeamento } from "./model/tipoDeMapeamento.ts"
import { agora } from "./utils/gerarMomento.ts";

try {
  const [nomeDoArquivo,tipoDoMapeamento]  = Deno.args
  if (!nomeDoArquivo || !tipoDoMapeamento) throw new Error("Insira o nome do arquivo de entrada (Ex: 'input.txt') e o tipo do mapeamento! Ex: 'LRU', 'FIFO, ou 'DIR'");

  const mapeamento = tipoDoMapeamento.toLowerCase() as tipoDeMapeamento
  const entradas = (await Deno.readTextFile(`./${nomeDoArquivo}`)).split('\n')
  const [numeroDeLinhas, tamanhoDaLinha] = entradas.shift()!.split(' ').map(Number)
  const cache = new Cache(numeroDeLinhas, mapeamento)

  entradas.forEach(async endereco => {
    switch (tipoDoMapeamento) {
      case "dir": {
        const bloco = new mapeamentoDireto(endereco, numeroDeLinhas, tamanhoDaLinha)
        if(cache.buscar(bloco)) console.log('HIT')
        else console.log('MISS')
        break
      }
      case "fifo": {
        const bloco = new mapeamentoAssociativoFIFO(endereco, await agora(), tamanhoDaLinha)
        if(cache.buscar(bloco)) console.log('HIT')
        else console.log('MISS')
        break
      }
      case "lru": {
        const bloco = new mapeamentoAssociativoLRU(endereco, tamanhoDaLinha, await agora())
        if(cache.buscar(bloco)) console.log('HIT')
        else console.log('MISS')
        break
      }
      default:
        throw new Error("Modelo de mapeamento não reconhecido!")
    }
  })
} catch (error) {
  console.log(error)
}