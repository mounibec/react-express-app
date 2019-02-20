import * as winston from 'winston';
import * as moment from 'moment-timezone';

const loggerTransports = [
  new (winston.transports.Console)({
    handleExceptions: true,
    humanReadableUnhandledException: true,
    timestamp: () => {
      return moment(new Date).format();
    },
    formatter: (options) => {
      return `${options.level.toUpperCase()} - ${options.timestamp()} - pid ${process.pid} - ${options.message ? options.message : ''}` +
        ` ${(options.meta && Object.keys(options.meta).length) ? JSON.stringify(options.meta) : ''}`;
    },
  })
];

class LoggerService {
  winstonLogger: any = null;
  private static instance: LoggerService;

  private constructor() {
    this.winstonLogger = new (winston.Logger)({
      transports: loggerTransports
    });

    this.winstonLogger.stream = {
      write: (message: string) => {
        this.winstonLogger.info(message);
      },
    };
  }

  static getInstance(){
    if(!LoggerService.instance){
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }
}

export default LoggerService.getInstance().winstonLogger;
