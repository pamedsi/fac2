export function agora(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now());
    }, 10);
  });
}