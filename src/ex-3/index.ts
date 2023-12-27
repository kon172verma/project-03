import { APIGatewayProxyHandler } from 'aws-lambda';
import fizzbuzz from '../lib/fizzbuzz';
import { logger } from '../lib/logger';

export const handler: APIGatewayProxyHandler = async (event, context) => {
    const result = fizzbuzz();
    logger.info(result);
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};
