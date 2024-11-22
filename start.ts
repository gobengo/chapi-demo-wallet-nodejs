import { fileURLToPath } from "url"
import { createChapiDemoWalletServer } from "./server.js"
import serveStatic from "serve-static"

// return whether the current process is running this file as its main script
const isProcessMain = () => fileURLToPath(import.meta.url) === process.argv[1]

if (isProcessMain()) {
  await main(...process.argv)
}

async function main(...args:unknown[]) {
  const [node, scriptPath] = args
  console.debug('creating node.js server to serve wallet html')
  {
    const server = createChapiDemoWalletServer()
    const port = process.env.PORT || 0

    // start listening on an open port, wait
    await new Promise((resolve, reject) => {
      server.listen(port, () => {
        resolve(undefined)
      })
    })

    // determine serverUrl from server address info
    const addressInfo = server.address()
    if ( ! addressInfo) throw new Error('unexpected missing addressInfo')
    if (typeof addressInfo === "string") throw new Error('unexpected string addressInfo')
    const serverUrl = new URL(`http://localhost:${addressInfo.port}`)

    console.debug('serverUrl', serverUrl.toString())
  }
}
