import { HttpReq } from "../Helper/httpReq";
import { HttpRes } from "../Helper/httpRes";
import { HttpResponseGenerator } from "./HttpReponseGenerator";
import { RouteStore } from "./RouteStore";

export class RequestHandler {
    public static instance: RequestHandler;
    private constructor() { }

    public static getInstance(): RequestHandler {
        if (!RequestHandler.instance) {
            RequestHandler.instance = new RequestHandler();
        }
        return RequestHandler.instance;
    }

    routeStore = RouteStore.getInstance();

    public handleRequest(parsedRequest: HttpReq): string {
        let response: string = "";
        const httpRes = new HttpRes();
        const responsegenerator = HttpResponseGenerator.getInstance();

        switch (parsedRequest.getMethod()) {
            case "GET": {
                if (this.routeStore.getHandler("GET", parsedRequest.getPath())) {
                    const handler = this.routeStore.getHandler("GET", parsedRequest.getPath())!;
                    handler(parsedRequest, httpRes);
                    response = responsegenerator.generateResponse(httpRes);
                }
                else response = responsegenerator.generateNotFoundResponse();
                break;
            }

            case "POST": {
                if (this.routeStore.getHandler("POST", parsedRequest.getPath())) {
                    const handler = this.routeStore.getHandler("POST", parsedRequest.getPath())!;
                    handler(parsedRequest, httpRes);
                    response = responsegenerator.generateResponse(httpRes);
                }
                else response = responsegenerator.generateNotFoundResponse();
                break;
            }
        }
        return response;
    }
}
