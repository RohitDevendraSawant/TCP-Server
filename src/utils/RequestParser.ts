import { HttpReq } from "../Helper/httpReq";

export class RequestParser {
  public parse(raw: string): HttpReq {
    const req = new HttpReq();
    console.log("0101", raw);
    
    // Split headers/body
    const [headerPart, bodyPart] = raw.split("\r\n\r\n");
    const lines = headerPart.split("\r\n");

    // Request line
    const [method, path, version] = lines[0].split(" ");
    req.setMethod(method);
    req.setPath(path);
    req.setVersion(version);

    // Headers
    const headers: Record<string,string> = {};
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const [key, ...valueParts] = line.split(":");
      if (!key || !valueParts.length) continue;
      const value = valueParts.join(":").trim();
      headers[key.toLowerCase()] = value;
      req.addHeader(key, value);
    }

    // Body
    const contentLength = headers["content-length"] ? parseInt(headers["content-length"]) : 0;

    if (contentLength > 0) {
      // Use only the first `contentLength` bytes from bodyPart
      req.setBody(bodyPart.slice(0, contentLength));
    }

    return req;
  }
}
