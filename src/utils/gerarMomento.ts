export function moment() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now());
    }, 10);
  });
}