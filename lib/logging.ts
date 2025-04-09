export function withLogging<T extends (...args: any[]) => any>(f: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    let rtn = null;
    let success = false;
    try {
      rtn = await f(...args);
      success = true;
      return rtn;
    } catch (e: any) {
      success = false;
      throw e;
    } finally {
      const extra = {
        eventId: f.name,
        success,
        args: args,
      };

      console.info(
        `Name: ${f.name} [${success ? "✅ SUCCESS" : "❌ FAILED"}]`,
        extra
      );
    }
  }) as T;
}

export function Log() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = withLogging(originalMethod);
    return descriptor;
  };
}
