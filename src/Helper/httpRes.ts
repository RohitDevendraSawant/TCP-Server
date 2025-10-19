export class HttpRes {
  body: string = "";
  statusCode: number = 200;
  type: string = "text/plain";
  send(body: string) {
    this.body = body;
    return;
  }
  status(status: number) {
    this.statusCode = status;
    return this;
  }
  json(body: Object) {
    this.body = JSON.stringify(body);

    this.type = "application/json";
    return;
  }
}