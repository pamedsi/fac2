export const entradaValida = (entrada: string) => {
  if (!entrada) return false
  const minusculo = entrada.toLowerCase()
  return minusculo === "dir" || minusculo === "fifo" || minusculo === "lru"
}