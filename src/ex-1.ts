import { logger } from './lib/logger';

const start = 1,
    end = 100;
for (let value = start; value <= end; value++) {
    if (value % 15 === 0) {
        logger.info('FizzBuzz');
    } else if (value % 3 === 0) {
        logger.info('Fizz');
    } else if (value % 5 === 0) {
        logger.info('Buzz');
    } else {
        logger.info(value);
    }
}
