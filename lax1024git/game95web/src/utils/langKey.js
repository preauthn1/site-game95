export default (text,data)=>{
  // 截取变量
  if (data) {
    for (const objKey in data) {
      const reg = new RegExp(`{${objKey}}`, "g")
      text = text.replace(reg, data[objKey])
    }
    return text
  } else {
    return text
  }
}