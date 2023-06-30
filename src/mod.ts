const nomeDoArquivo = Deno.args[0]
const entrada: string[] = (await Deno.readTextFile(`./${nomeDoArquivo}`)).split('\n')
const [numeroDeLinhas, tamanhoDaLinha] = entrada.shift()!.split(' ').map(Number)
const _tamanhoDaCacheEmBytes = numeroDeLinhas * tamanhoDaLinha
const _tamanhoDaMemoriaPrincipal = 2147483648