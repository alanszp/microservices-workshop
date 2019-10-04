import * as _ from "lodash";
import * as requestPromise from "request-promise";
import Non200ResponseError from "../errors/api_client_errors/non_200_response_error";
import ServiceUnavailableError from "../errors/api_client_errors/service_unavailable_error";
import log from "../logger";

interface ApiClientConfiguration {
    timeout?: number;
    queryParams?: object;
    headers?: object;
    auth?: object;
    json?: boolean;
}

interface ApiClientRequestOptions {
    timeout?: number;
    queryParams?: object;
    headers?: object;
    auth?: object;
    json?: boolean;
    body?: object;
}

enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
}

export class ApiClient {

    public baseUrl: string;
    public config: any;
    public senderName: string;

    constructor(baseUrl: string, config: ApiClientConfiguration, sender: string) {
        this.baseUrl = baseUrl;
        this.config = _.merge(this.getDefaults(), config);
        this.senderName = sender;
    }

    public getDefaults(): ApiClientConfiguration {
        return {
            timeout: 10000,
            json: true,
        };
    }

    public getSuccessStatusCodes(): number[] {
        return [200, 201];
    }

    public makeUrl(path: string, opts?: object) {
        let url;

        if (!path) {
            url = _.trimEnd(this.baseUrl, "/");
            path = "";
        } else {
            url = _.trimEnd(this.baseUrl, "/") + "/";
            url += _.trimStart(path, "/");
        }

        const queryParams = _.merge({}, this.config.queryParams || {}, _.get(opts, "queryParams", {}));
        if (!_.isEmpty(queryParams) && _.isObject(queryParams)) {
            const separator = (path.indexOf("?") >= 0) ? "&" : "?";
            let queryParam = _.reduce(queryParams, (acc, val, key) => {
                acc += `${key}=${val}&`;
                return acc;
            }, "");

            queryParam = queryParam.slice(0, -1);
            url += separator + queryParam;
        }
        return url;
    }

    public throwConnectionError(err, context: any): Promise<any> {
        return Promise.reject(new ServiceUnavailableError(this.senderName, err, context));
    }

    public throwFailedResponseError(response, context: any): Promise<any> {
        return Promise.reject(new Non200ResponseError(this.senderName, response.statusCode, {
            responseBody: response.body,
            responseHeaders: response.headers,
            requestContext: context,
        }));
    }

    public request(method: METHODS = METHODS.GET, uri: string, options: ApiClientRequestOptions = {}) {

        const fullUrl = this.makeUrl(uri, options);
        const allHeaders = _.merge({}, this.config.headers, options.headers);
        let auth;
        if (options.auth) {
            auth = options.auth;
        } else if (this.config.auth) {
            auth = this.config.auth;
        }

        const requestOptions = {
            method,
            auth,
            url: fullUrl,
            headers: allHeaders,
            json: options.json ? options.json : this.config.json,
            timeout: options.timeout ? options.timeout : this.config.timeout,
            body: options.body,
            resolveWithFullResponse: true,
            simple: false,
        };

        log.debug("api_client.request.starting_request", {
            url: fullUrl,
            requestOptions,
            apiClientConfig: this.config,
        });

        return requestPromise(requestOptions).catch((err) => {
            // Request failed for technical reasons
            log.error("api_client.request.request_failed.service_unavailable", {
                url: fullUrl,
                requestOptions: options,
                apiClientConfig: this.config,
                error: err,
            });
            return this.throwConnectionError(err, requestOptions);
        })
            .then((res) => {
                if (!_.includes(this.getSuccessStatusCodes(), res.statusCode)) {
                    // Request did not fail for technical reasons but it returned a non-success status code
                    log.error("api_client.request.request_failed.non_200_response", {
                        url: fullUrl,
                        requestOptions: options,
                        responseBody: res.body,
                        responseStatusCode: res.statusCode,
                    });
                    return this.throwFailedResponseError(res, requestOptions);
                } else {
                    log.debug("api_client.request.request_success", {
                        url: fullUrl,
                        requestOptions: options,
                        responseBody: res.body,
                        responseStatusCode: res.statusCode,
                    });
                    return res;
                }
            });
    }

    public post(path: string, body: object, headers?: object, opts: ApiClientRequestOptions = {}) {
        return this.request(METHODS.POST, path, _.merge(opts, {
            body,
            headers,
        }));
    }

    public put(path: string, body: object, headers?: object, opts: ApiClientRequestOptions = {}) {
        return this.request(METHODS.PUT, path, _.merge(opts, {
            body,
            headers,
        }));
    }

    public patch(path: string, body: object, headers?: object, opts: ApiClientRequestOptions = {}) {
        return this.request(METHODS.PATCH, path, _.merge(opts, {
            body,
            headers,
        }));
    }

    public get(path: string, body: object, headers?: object, opts: ApiClientRequestOptions = {}) {
        return this.request(METHODS.GET, path, _.merge(opts, {
            headers,
        }));
    }

    public delete(path: string, body: object, headers?: object, opts: ApiClientRequestOptions = {}) {
        return this.request(METHODS.DELETE, path, _.merge(opts, {
            headers,
        }));
    }

    public head(path: string, body: object, headers?: object, opts: ApiClientRequestOptions = {}) {
        return this.request(METHODS.HEAD, path, _.merge(opts, {
            headers,
        }));
    }

}
