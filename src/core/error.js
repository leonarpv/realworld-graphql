import Boom from 'boom';

export default function handleError(error, reply) {
  if (true === error.isGraphQLError) {
    return reply(error.message)
      .code(error.statusCode)
      .type('application/json');
  }

  const err = Boom.create(error.statusCode || 500);

  err.output.payload.message = error.message;

  if (error.headers) {
    Object.keys(error.headers).forEach(function (header) {
      err.output.headers[header] = error.headers[header];
    });
  }

  return reply(err);
}

