class HttpException extends Error {
    public stack: string

    constructor(stack: string) {
      super()
      this.stack = stack
    }
  }

export = HttpException;
