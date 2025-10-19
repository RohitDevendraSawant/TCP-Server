export class HttpReq {
  private method: string = "";
  private path: string = "";
  private version: string = "";
  private headers: Record<string, string> = {};
  private body: string = "";

  public setMethod(method: string): void {
    this.method = method.trim().toUpperCase();
  }

  public setPath(path: string): void {
    this.path = path.trim();
  }

  public setVersion(version: string): void {
    this.version = version.trim();
  }

  public addHeader(key: string, value: string): void {
    this.headers[key.toLowerCase()] = value.trim();
  }

  public setBody(body: string): void {
    this.body = body;
  }

  // Optionally, getters for external read access
  public getMethod(): string {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }

  public getVersion(): string {
    return this.version;
  }

  public getHeaders(): Record<string, string> {
    return this.headers;
  }

  public getBody(): string {
    return this.body;
  }
}
