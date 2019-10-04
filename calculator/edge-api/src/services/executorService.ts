import {Operand} from "../models/operand";
import {Executor} from "../models/executor";
import {Expression} from "../models/expression";
import logger from "../logger";
import NoAvailableExecutorError from "../errors/no_available_executor_error";

const executorsMap: Map<Operand, Set<Executor>> = new Map();

export function registerExecutor(executor: Executor): void {
    const operand = executor.operand;
    const executorList = getExecutors(operand);
    executorList.add(executor);
    executorsMap.set(operand, executorList);
    logger.info('executor_service.register.success', {
        operand,
        executorLength: executorList.size,
    });
}

export function unregisterExecutor(executor: Executor): void {
    const operand = executor.operand;
    const executorList = getExecutors(operand);
    executorList.delete(executor);

    logger.info('executor_service.unregister.success', {
        operand,
        executorLength: executorList.size,
    });
}

export function getExecutors(operand: Operand): Set<Executor> {
    logger.info('elems', {
        values: [...executorsMap.get(operand) || new Set()],
        operand
    });

    return executorsMap.get(operand) || new Set();
}

export function getRandomExecutor(operand: Operand): Executor {
    const executors = getExecutors(operand);

    const random = Math.floor(Math.random() * executors.size);

    return [...executors][random];
}

export function executeExpression(exp: Expression): Promise<number> {
    const executor = getRandomExecutor(exp.operand);

    if (!executor) {
        throw new NoAvailableExecutorError(exp.operand);
    }

    logger.info('executor_service.execute.starting', {
        executor: executor.name,
        expression: exp.serialize(),
    });

    return exp.callExecutor(executor)
        .then((res) => {
            logger.info('executor_service.execute.done', {
                executor: executor.name,
                expression: exp.serialize(),
                result: res
            });

            return res;
        })
        .catch((error) => {
            unregisterExecutor(executor);

            logger.info('executor_service.execute.error', {
                executor: executor.name,
                expression: exp.serialize(),
                error,
            });

            throw error;
        })
}