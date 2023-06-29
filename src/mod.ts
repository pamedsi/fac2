// o número de linhas da memória cache
// o tamanho de cada linha da memória cache em bytes.
// Em mapeamento associativo: tamanhoDoBloco = tamanhoDaLinha

// Tamanho de cada linha = 4MB ou 4096B
// Quantidade de linhas = 1024 ou 1B
// Cada bloco tem 4096 Bytes ou 4KB ou 2^12
// Tamanho da RAM = 2GB

// Mapeamento associativo:
  // endereço = tag e palavra
  // A palavra vai ter 12 bits
  // A tag vai ter 20 bits
  // blocosDaMP = 2^20
  // Tamanho da RAM = 2GB

  // Do bit 0 até o 19 = TAG
  // DO bit 20 até o 31 = PALAVRA

// Mapeamento direto:
  // endereço = tag, linha e palavra
  // bitsDaTag = log2 de (blocosDaMP / linhasDaCache)
  // bitsDaTag = log2 de (2^20 / 2^10) => log2 de 2^10
  // bitsDaTag = 10
  // bitsDaLinha = log2 quantidadeDeLinhasDaCache => log2 de 2^10
  // bitsDaLinha = 10
  // bitsDaPalavra = mesmo do mapeamento associativo (12 também)
  
  // Do bit 0 até o 9 = TAG
  // DO bit 10 até o 19 = LINHA
  // DO bit 20 até o 21 = PALAVRA


const nomeDoArquivo = Deno.args[0]
const entrada: string[] = (await Deno.readTextFile(`./${nomeDoArquivo}`)).split('\n')
const [numeroDeLinhas, tamanhoDaLinha] = entrada.shift()!.split(' ').map(Number)
const _tamanhoDaCacheEmBytes = numeroDeLinhas * tamanhoDaLinha

