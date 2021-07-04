import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("Incoming Requests");

  use(req: Request, res: Response, next: NextFunction) {
    const { method, query, body, baseUrl: url } = req;

    res.on('close', () => {
      const { statusCode } = res;

      if (process.env['USE_FASTIFY'] === 'false') {
        this.logger.log(
          `${method} ${url} ${JSON.stringify(query)} ${JSON.stringify(body)} ${statusCode}`
        );
      };
    });

    next();
  }
}

