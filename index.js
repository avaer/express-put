const path = require('path');
const fs = require('fs');

module.exports = express => {
  const put = (dirname, mountPath = '') => {
    const staticServer = express.static(dirname);

    return (req, res, next) => {
      if (req.method === 'PUT') {
        if (req.path.indexOf(mountPath) === 0) {
          const filePath = path.join(dirname, req.path.slice(mountPath.length));
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
          next();
        }
      } else {
        staticServer(req, res, next);
      }
    };
  };
  return put;
};
