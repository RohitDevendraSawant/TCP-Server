import { HttpRes } from "../Helper/httpRes";

export class HttpResponseGenerator {
    private static instance: HttpResponseGenerator;

    private constructor() { }

    public static getInstance(): HttpResponseGenerator {
        if (!HttpResponseGenerator.instance) {
            HttpResponseGenerator.instance = new HttpResponseGenerator();
        }
        return HttpResponseGenerator.instance;
    }

    public generateResponse(httpRes: HttpRes): string {
         return `HTTP/1.1 ${httpRes.statusCode} OK\r\nContent-Type: ${httpRes.type}\r\n\r\n${httpRes.body}\r\n`;
    }

    public generateNotFoundResponse(): string {
        return `HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\n404 Not Found\r\n`;
    }


}
