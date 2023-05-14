import ErrorBase from './ErrorBase';

class BadRequest extends ErrorBase {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequest;
