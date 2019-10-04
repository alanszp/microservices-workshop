import {NextFunction, Request, Response} from "express";
import {executeExpression} from "../services/executorService";
import {Expression} from "../models/expression";
import {requestToExpressionMapper} from "../mappers/requestToExpressionMapper";
import errorView from "../views/error_view";
import NoAvailableExecutorError from "../errors/no_available_executor_error";
import ValidationError from "../errors/validation_error";
import ComputationError from "../errors/computation_error";
import ApiClientError from "../errors/api_client_errors/api_client_error";

export default class CalculationsController {

    public static async calculate(req: Request, res: Response, next: NextFunction) {
        req.log.info('calculate_controller.calculate', { body: req.body });

        try {
            const expression: Expression = requestToExpressionMapper(req.body);
            const result = await executeExpression(expression);
            return res.status(200).json(result);
        }
        catch (error) {
            req.log.error('calculate_controller.register_executor.error', {
                error
            });

            if (error instanceof NoAvailableExecutorError) {
                return res.status(429).json(errorView(error));
            }

            if (error instanceof ValidationError) {
                return res.status(400).json(errorView(error));
            }

            if (error instanceof ComputationError) {
                return res.status(424).json(errorView(error));
            }

            if (error instanceof ApiClientError) {
                return res.status(424).json(errorView(error));
            }

            throw error;
        }
    }

}
