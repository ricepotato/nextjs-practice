# Nextjs Practice

### 함수의 인자를 logging 하는 기능을 추가하는 `withLogging` 함수

Generic 을 입력하는 부분이 생각보다 까다롭고 복잡해서 정리해둔다.

```typescript
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
```

함수 호출 시 `args` 값을 전부 logging 하고 싶은 경우 이 함수를 사용할 수 있다.

아래와 같이 사용한다.

```typescript
const getCats = withLogging(fetchCats);
```

`withLogging` 함수로 감싼 getCats 함수는 인자에 입력되는 args 가 withLogging 내에서 logging 하게 된다.

production 환경에서 `f.name` 값이 제대로 출력되지 않는다.

next.config.ts 파일에 아래와 같이 설정한다.

```typescript
const nextConfig: NextConfig = {
  /* other options... */
  experimental: {
    serverMinification: false,
  },
};
```
