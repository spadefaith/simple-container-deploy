export const  escapeNewlines = (str)=> {
    return str ? String(str).replace(/\n/g, '\\n') : ""
  }
  
export const  format =  (key, value)=> {
    return `${key}=${escapeNewlines(value)}`
  }


export const toEnv = (obj)=>{
    const joined = Object.keys(obj).map(key=>{
        const val = obj[key];
        return format(key ,val);
    }).join('\n');

    return joined;
}

export const isPortFree = port =>
  new Promise(resolve => {
    const server = require('http')
      .createServer()
      .listen(port, () => {
        server.close()
        resolve(true)
      })
      .on('error', () => {
        resolve(false)
      })
  })