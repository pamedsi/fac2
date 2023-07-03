export const entradaValida = (entrada: string) => {
  const minusculo = entrada.toLowerCase()
  return minusculo === "dir" || minusculo === "fifo" || minusculo === "lru"
}