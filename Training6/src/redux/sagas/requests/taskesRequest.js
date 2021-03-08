import delay from 'delay'

export const requestSubmitTask = (id) => {
  return (new Promise(async (resolve) => {
    await delay(1500);
    const rand = Math.floor(Math.random() * 2);
    const successed = rand === 0;
    resolve(successed);
  }));
}