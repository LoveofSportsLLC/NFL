import log4js from 'log4js';
import path from 'path';

const log4jsConfigPath = path.resolve('./log4js.json');
log4js.configure(log4jsConfigPath);

const logger = log4js.getLogger();
export default logger;
