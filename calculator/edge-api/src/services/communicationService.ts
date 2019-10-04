import {Executor} from "../models/executor";
import {ApiClient} from "../clients/api_client";
import {Operand} from "../models/operand";


export function makeRequest(executor: Executor, operand: Operand, body: any): any {
    const apiClient = new ApiClient(executor.url, {
        timeout: 2000,
        json: true
    }, operand);

    return apiClient.post('', body);
}
