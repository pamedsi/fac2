export class mapeamento {
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