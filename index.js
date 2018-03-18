const path = require('path');
const fs = require('fs');

module.exports = express => {
  const put = dirname => {
    const staticServer = express.static();

    return (req, res, next) => {
      if (req.method === 'PUT') {
        const filePath = path.join(dirname, req.path);
        const ws = fs.createWriteStream(filePath);
        req.pipe(ws);
        ws.on('finish', () => {
          res.end();
        });
        ws.on('error', err => {
          res.status(500);
          res.end(http.STATUS_CODES[500]);
        });
      } else {
        staticServer(req, res, next);
      }
    };
  };
  return put;
};
