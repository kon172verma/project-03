import { logger } from './logger';

const fizzbuzz = () => {
    const start = 1,
        end = 100;
    let result = '';
    for (let value = start; value <= end; value++) {
        if (value % 15 === 0) {
            result += 'FizzBuzz\n';
        } else if (value % 3 === 0) {
            result += 'Fizz\n';
        } else if (value % 5 === 0) {
            result += 'Buzz\n';
        } else {
            result += `${value}\n`;
        }
    }
    return result;
};

export default fizzbuzz;
