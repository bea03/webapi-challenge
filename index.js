/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/
const express = require('express');
const helmet = require('helmet');
const projectRouter = require('./Routers/projectRouter.js');

//custom middleware
function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const date = new Date(Date.now());
    console.log(`${date} you made a ${method} request to ${url}`);
    next(); //no res so you need next to move on
}

const server = express();
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/projects', logger, projectRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>Sprint Challenge: Express and Node.js - Projects & Actions</h>
      <p>Welcome to the Lambda Sprint Challenge: Express and Node.js - Projects & Actions</p>
    `);
  });

  //setting up if want to do Heroku, process.env.PORT is taking the port that heroku assigns it to run
  const port = process.env.PORT || 8000;
  server.listen(port, () => {
    console.log(`\n*** Server Running on Port: ${port} ***\n`);
  });