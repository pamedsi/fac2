# Sobre o projeto:

Este é um projeto que simula o funcionamento de uma memória cache.
A cache é iniciada vazia, recebe-se um endereço de acesso do processador, e após serem separaddos os bits em tag e palavra (e linha, se mapeamento direto)
é instanciado um objeto que representa o bloco da memória principal e procurado na memória cache, caso não esteja lá, um evento de "cache miss" é disparado e o bloco é armazenado na memória cache.

# Dependência:

O ambiente de desenvolvimento escolhido foi o Deno, que roda Typescript.

Para instalá-lo cheque as instruções no site: https://deno.land/manual@v1.34.3/getting_started/installation

Ou utilize algum serviço que roda código online, como o [replit](https://replit.com/@PatrickMelo2/fac2) por exemplo, que oferece suporte ao Deno.
No botão "replit" acima você encontra este repositório clonado.

# Execução:

Para executar o projeto é necessário rodar o seguinte comando:

```
$ deno run --allow-read /src/mod.ts input.txt dir
```
Sobre o script acima:

"deno run" é o comando usado pelo Deno para executar algum arquivo Javascript ou Typescript.

"--allow-read" é a flag que autoriza o Deno ler arquivos de texto do seu computador.

"/src/mod.ts" é o arquivo principal do projeto que deve ser executado.

"input.txt" é o arquivo de entrada, contendo o número de linhas da cache, o tamanho de cada linha e os acessos do procesador.

"dir" que também pode ser substituído por "fifo" ou "lru" se refere ao tipo de mapeamento (direto ou associativo).

Também se refere ao tipo de algorítimo de troca de bloco da cache, caso ela esteja cheia. "LRU" significa "Least Recently Used" e "FIFO" significa "First In First Out".

O arquivo "instruções.txt" tem a descrição do trabalho, e o arquivo "notas.txt" tem as informações possíveis de se chegar sobre cache, bloco e outras propriedades que podem ser úteis ao algorítimo, a partir do arquivo de entrada.
