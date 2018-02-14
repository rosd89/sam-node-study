const error400BadRequest = (res, code, data) => res.status(400).json({code, data});

const error401Unauthorized = (res, code) => {
  if (code) res.status(401).send();
  else res.status(401).json({code});
};

const error403Forbidden = res => res.status(403).send();

const error404NotFound = res => res.status(404).send();

module.exports = (err, req, res, next) => {
  if (!(err instanceof Map)) {
    error404NotFound(res);
  } else {
    const statusCode = err.get('statusCode');
    const message = err.get('message');
    const code = err.get('code');
    const data = err.get('data');

    if (message) res.statusMessage = message;

    switch (statusCode) {
      case 400:
        error400BadRequest(res, code, data);
        break;
      case 401:
        error401Unauthorized(res, code, data);
        break;
      case 403:
        error403Forbidden(res);
        break;
      case 404:
        error404NotFound(res);
        break;
    }
  }
};
