export {};
declare global {
    namespace Express { // tslint:disable-line no-namespace
        export interface Request {
            context: {
                flow_reference?: string[] | string;
                request_id: string;
            };
            log?: any;
        }
    }
}
