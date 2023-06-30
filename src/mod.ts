import { mapeamentoAssociativoFIFO } from "./associativoFIFO.ts";
import { mapeamentoAssociativoLRU } from "./associativoLRU.ts";
import { Cache } from "./cache.ts"
import { mapeamentoDireto } from "./direto.ts";
import { tipoDeMapeamento } from "./model/tipoDeMapeamento.ts"
import { agora } from "./utils/gerarMomento.ts";

try {
  const nomeDoArquivo: string = Deno.args[0]
  const tipoDoMapeamento = Deno.args[1].toLowerCase() as tipoDeMapeamento
  if (!nomeDoArquivo) throw new Error("Insira o nome do arquivo de entrada!");
  if (!tipoDoMapeamento) throw new Error("Insira o tipo do mapeamento! Ex: 'LRU', 'FIFO, ou 'DIR'");
  
  const entradas = (await Deno.readTextFile(`./${nomeDoArquivo}`)).split('\n')
  const [numeroDeLinhas, _tamanhoDaLinha] = entradas.shift()!.split(' ').map(Number)
  const cache = new Cache(numeroDeLinhas, tipoDoMapeamento)

  entradas.forEach(async endereco => {
    switch (tipoDoMapeamento) {
      case "dir": {
        const bloco = new mapeamentoDireto(endereco, numeroDeLinhas)
        if(cache.buscar(bloco)) console.log('HIT')
        else console.log('MISS')
        break
      }
      case "fifo": {
        const bloco = new mapeamentoAssociativoFIFO(endereco, await agora())
        if(cache.buscar(bloco)) console.log('HIT')
        else console.log('MISS')
        break
      }
      case "lru": {
        const bloco = new mapeamentoAssociativoLRU(endereco, await agora())
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