// Faux serveur Supabase (API REST) pour les tests : enregistre les insertions reçues.
import http from 'node:http';

const received = [];
http
  .createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/__requests') {
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify(received));
    }
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      received.push({ method: req.method, url: req.url, apikey: req.headers.apikey, prefer: req.headers.prefer, body: body ? JSON.parse(body) : null });
      if (req.headers.apikey !== 'test-secret') {
        res.writeHead(401, { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ code: '401', message: 'Invalid API key' }));
      }
      res.writeHead(201);
      res.end();
    });
  })
  .listen(4340, '127.0.0.1');
