export class mapeamentoDireto {
  tag: string
  linha: string
  palavra: string

  constructor (endereco: string) {
    const enderecoEmBits = parseInt(endereco, 16).toString(2).padStart(32, '0')

    this.tag = enderecoEmBits.substring(0,10)
    this.linha = enderecoEmBits.substring(10,20)
    this.palavra = enderecoEmBits.substring(20,32)
  }
}