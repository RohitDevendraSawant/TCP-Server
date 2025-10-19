import * as net from "net";
import { Socket } from "net";
import { RequestParser } from "./utils/RequestParser";
import { HttpReq } from "./Helper/httpReq";
import { HttpRes } from "./Helper/httpRes";
import { RouteStore } from "./utils/RouteStore";
import { RequestHandler } from "./utils/RequestHandler";

class TCPServer {
  private static instance: TCPServer;
  private server: net.Server | null = null;
  private requestParser: RequestParser = new RequestParser()
  private routeStore = RouteStore.getInstance();
  private requestHandler = RequestHandler.getInstance();

  private constructor() {}

  public static getInstance(): TCPServer {
    if (!TCPServer.instance) {
      TCPServer.instance = new TCPServer();
    }
    return TCPServer.instance;
  }

  public listen(port: number, cb: () => void): void {
    if (this.server) {
      console.log("Server already running");
      return;
    }

    this.server = net.createServer((socket: Socket) => {
      console.log("Client connected");

      socket.on("data", (data: Buffer) => {
        const httpRequest = this.requestParser.parse(data.toString());
        
        const response = this.requestHandler.handleRequest(httpRequest);
        socket.write(response);
      });

      socket.on("end", () => {
        console.log("Client disconnected");
      });

      socket.on("error", (err) => {
        console.error("Socket error:", err.message);
        socket.destroy();
      });
    });

    this.server.listen(port, cb);
  }

  public get(path: string, handler: (req: HttpReq, res: HttpRes) => void): void {
    this.routeStore.add('GET', path, handler)
  }

  public post(path: string, handler: (req: HttpReq, res: HttpRes) => void): void {
    this.routeStore.add('POST', path, handler)
  }
}

export const tcpServer = (): TCPServer => {
  return TCPServer.getInstance();
};