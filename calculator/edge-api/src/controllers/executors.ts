import {NextFunction, Request, Response} from "express";
import {Executor} from "../models/executor";
import {requestToExecutorMapper} from "../mappers/requestToExecutorMapper";
import {registerExecutor} from "../services/executorService";
import errorView from "../views/error_view";
import ValidationError from "../errors/validation_error";

export default class ExecutorController {

    public static async register(req: Request, res: Response, next: NextFunction) {
        req.log.info('executor_controller.registering_executor', { body: req.body });

        try {
            const executor: Executor = requestToExecutorMapper(req.body);
            registerExecutor(executor);
            return res.status(201).json();
        }
        catch (error) {
            req.log.error('executor_controller.register_executor.error', {
                error
            });

            if (error instanceof ValidationError) {
                return res.status(400).json(errorView(error));
            }

            throw error;
        }
    }

}
