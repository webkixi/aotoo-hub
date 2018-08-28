function* sleep(delay, desc) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (desc) {
        console.log(desc);
      }
      console.log(`waiting for ${delay} millisecond to next`);
      return res(true)
    }, delay);
  })
}

// 通过生成器延时几秒
module.exports = sleep