import Fastify from 'fastify'

const app = Fastify({
  logger: true,
})

app.get('/', async (req, reply) => {
  return reply.status(200).type('text/html').send(html)
})

app.get('/hello-nordics', async (req, reply) => {
  return reply.status(200).type('text/html').send(nordicsHtml)
})

app.get('/edge-latency', async (req, reply) => {
  const timestamp = Date.now()
  return reply.status(200).type('application/json').send({ timestamp })
})

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>Vercel + Fastify Hello World</title>
    <meta
      name="description"
      content="This is a starter template for Vercel + Fastify."
    />
  </head>
  <body>
    <h1>Vercel + Fastify Hello World</h1>
    <p>
      This is a starter template for Vercel + Fastify. Requests are
      rewritten from <code>/*</code> to <code>/api/*</code>, which runs
      as a Vercel Function.
    </p>
    <p>
        For example, here is the boilerplate code for this route:
    </p>
    <pre>
<code>import Fastify from 'fastify'

const app = Fastify({
  logger: true,
})

app.get('/', async (req, res) => {
  return res.status(200).type('text/html').send(html)
})

export default async function handler(req: any, res: any) {
  await app.ready()
  app.server.emit('request', req, res)
}</code>
    </pre>
    <p>
    <p>
      <a href="https://vercel.com/templates/other/fastify-serverless-function">
      Deploy your own
      </a>
      to get started.
  </body>
</html>
`


const nordicsHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>Hello Nordics Technical Architects</title>
    <style>
      .emoji {
        font-size: 2em;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      .button:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body>
    <h1>Hello Nordics Technical Architects! 👋🇫🇮🇳🇴🇸🇪🇩🇰🇪🇺</h1>
    <p class="emoji">👨‍💻👩‍💻🖥️🌐</p>
    <p>Welcome to our amazing world of serverless functions and edge computing!</p>
    <a href="https://vercel.com/docs/concepts/functions/edge-functions" class="button">Learn More About Edge Functions</a>
    <h1>Edge Latency Test</h1>
    <p>Click the button to measure the round-trip time to the edge server:</p>
    <button id="testButton" class="button">Run Latency Test</button>
    <p>Result: <span id="result">-</span> ms</p>

    <script>
      const testButton = document.getElementById('testButton');
      const resultSpan = document.getElementById('result');

      testButton.addEventListener('click', async () => {
        const start = performance.now();
        const response = await fetch('/edge-latency');
        const data = await response.json();
        const end = performance.now();

        const latency = Math.round(end - start);
        resultSpan.textContent = latency;
      });
    </script>
  </body>
</html>
`


app.get('/latency-test', async (req, reply) => {
  return reply.status(200).type('text/html').send(latencyHtml)
})