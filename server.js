'use strict';

const mongodb = require('mongodb');
const http = require('http');
const nconf = require('nconf');
let uri = `mongodb+srv://RoseHacks2021:RoseHacks2021@rhcluster.aakcm.mongodb.net/RoseHacks2021?retryWrites=true&w=majority&useUnifiedTopology=true`;
if (nconf.get('mongoDatabase')) {
  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);

const client = mongodb.MongoClient(uri)
client.connect((err) => {
  if (err) {
    throw err;
  }
  const db = client.db("RoseHacks2021"); 
  // Create a simple little server.
  http.createServer((req, res) => {
    if (req.url === '/_ah/health') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('OK');
      res.end();
      return;
    }

    const collection = db.collection('Messages');
    var datetime = new Date();
    const msg = {
      msgDescription: '\nHello World received on ' + datetime
    };

    collection.insert(msg, (err) => {
      if (err) {
        throw err;
      }

      // push out a range
      let msglist = '';
      collection.find().toArray((err, data) => {
        if (err) {
          throw err;
        }
        data.forEach((msg) => {
          msglist += `${msg.msgDescription}; `;
        });

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
res.write('Messages received so far:\n');
        res.end(msglist);
      });
    });
  }).listen(process.env.PORT || 8080, () => {
    console.log('started web process');
  });
});
