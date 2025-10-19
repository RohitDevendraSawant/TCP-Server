export type RouteHandler = (req: any, res: any) => void;

export class RouteStore {
  private static instance: RouteStore;
  private routes: Map<string, Map<string, RouteHandler>>;

  private constructor() {
    this.routes = new Map();
  }

  public static getInstance(): RouteStore {
    if (!RouteStore.instance) {
      RouteStore.instance = new RouteStore();
    }
    return RouteStore.instance;
  }

  public add(method: string, path: string, handler: RouteHandler): void {
    const upperMethod = method.toUpperCase();
    if (!this.routes.has(upperMethod)) {
      this.routes.set(upperMethod, new Map());
    }

    const methodMap = this.routes.get(upperMethod)!;
    methodMap.set(path, handler);
  }

  public getHandler(method: string, path: string): RouteHandler | undefined {
    const upperMethod = method.toUpperCase();
    return this.routes.get(upperMethod)?.get(path);
  }
}
