import ErrorBase from './ErrorBase';

class NotFound extends ErrorBase {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFound;
