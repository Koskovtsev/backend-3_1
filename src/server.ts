import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
enum button {
  plus = 'plus',
  minus = 'minus',
}

const minusClicksHistory: button[] = [];
const plusClicksHistory: button[] = [];
const server = createServer((req: IncomingMessage, res: ServerResponse) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }
  if (req.url === '/api/counter' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ countMinus: minusClicksHistory.length, countPlus: plusClicksHistory.length }));
  }
  if (req.url === '/api/counter' && req.method === 'POST') {
    let rawData = '';

    req.on('data', (chunk) => {
      rawData += chunk;
    });
    req.on('end', () => {
      const body = JSON.parse(rawData);
      if (body.button === button.plus) {
        plusClicksHistory.push(body.button);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: button.plus }));
      } else
        if (body.button === button.minus) {
          minusClicksHistory.push(body.button);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ok: button.minus }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ notOK: `halepa` }));
        }
    });
  }
});

server.listen(3000, () => {
  console.log('Сервер запущено на http://localhost:3000');
});