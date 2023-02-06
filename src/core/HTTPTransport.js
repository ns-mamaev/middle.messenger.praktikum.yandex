const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const params = [];
  for (const [key, value] of Object.entries(data)) {
    params.push(`${key}=${value}`);
  }
  return `?${params.join('&')}`;
}

class HTTPTransport {
  get = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  // options:
  // headers — obj
  // data — obj
  request = (url, options, timeout = 5000) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      // добавление query параметров в url в случае GET - запроса
      if (isGet && data) {
        xhr.open(method, url + queryStringify(data));
      } else {
        xhr.open(method, url);
      }
      // добавление пользовательских заголовков
      if (options.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet) {
        xhr.send();
      } else {
        // xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
