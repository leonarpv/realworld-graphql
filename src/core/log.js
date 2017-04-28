import Good from 'good';

exports.register = (server, options, next) => {
  const opts = {
    ops: {
      interval: 1000
    },
    reporters: {
      myConsoleReporter: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*', request: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  };

  server.register({
    register: Good,
    options: opts
  }, (err) => {
    return next(err);
  });
};

exports.register.attributes = {
  name: 'logs',
  version: '1.0.0'
};

