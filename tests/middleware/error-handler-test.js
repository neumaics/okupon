const ErrorHandler = require('../../middleware/error-handler');
const { JobNotFound, InvalidProgress } = require('../../models/errors');

describe('error handler middleware', () => {
  const errorHandlerMiddleware = new ErrorHandler();
  let res;

  beforeEach(() => {
    res = {
      status: jasmine.createSpy('status'),
      json: jasmine.createSpy('json')
    };
  });

  it('returns "not found" when JobNotFound is given', () => {
    errorHandlerMiddleware(new JobNotFound(1), null, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('returns "bad request" when InvalidProgress is given', () => {
    errorHandlerMiddleware(new InvalidProgress('nope'), null, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns "internal server error" for any other error', () => {
    errorHandlerMiddleware(new Error('could be anything'), null, res);
  });
});
