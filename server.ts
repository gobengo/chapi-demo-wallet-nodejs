import { createServer }from 'node:http'
import serveStatic from 'serve-static'


const serveChapiDemoWallet = serveStatic('chapi-demo-wallet', {
  index: ['index.html'],
})

// creaet a node http listener that serves a chapi wallet
export function createChapiDemoWalletServer() {
  const server = createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    serveChapiDemoWallet(request, response, (err) => {
      if (err) {
        throw err
      }
      console.debug('serveChapiDemoWallet callback called without error', {
        url: request.url,
      })
      response.writeHead(404)
      response.end(`${request.url} Not found`)
    })
    // response.writeHead(200)
    // response.write(`<!doctype html>
    //   <h1>Chapi Demo Wallet</h1>
    // `)
    // response.end()
  })
  return server
}
