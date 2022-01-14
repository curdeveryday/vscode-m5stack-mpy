// Part of Jest type definition otherwise is in conflict with Mocha type def.
// More can be added from here if needed
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jest/index.d.ts

declare namespace jest {
  // should be R extends void|Promise<void> but getting dtslint error
  interface Matchers<R, T = {}> {
    toBe<E = any>(expected: E): R;
    toStrictEqual<E = any>(expected: E): R;
    toHaveBeenCalled(): R;
    toHaveBeenCalledWith<E extends any[]>(...params: E): R;
    /**
     * Ensures that a mock function is called an exact number of times.
     */
    toHaveBeenCalledTimes(expected: number): R;
  }
  type JestMatchers<T> = Matchers<void, T>;

  interface Request {}
  interface RequestInit {}

  type MockRequest = Request | RequestInit;

  /**
   * Mock matcher function
   */
  type MockMatcherFunction = (url: string, opts: MockRequest) => boolean;

  /**
   * Mock matcher. Can be one of following:
   * string: Either
   *   * an exact url to match e.g. 'http://www.site.com/page.html'
   *   * if the string begins with a `^`, the string following the `^` must
   *     begin the url e.g. '^http://www.site.com' would match
   *      'http://www.site.com' or 'http://www.site.com/page.html'
   *    * '*' to match any url
   * RegExp: A regular expression to test the url against
   * Function(url, opts): A function (returning a Boolean) that is passed the
   *  url and opts fetch() is called with (or, if fetch() was called with one,
   *  the Request instance)
   */
  type MockMatcher = string | RegExp | MockMatcherFunction;

  interface Response {}

  /**
   * Mock response object
   */
  interface MockResponseObject {
    /**
     * Set the response body
     */
    body?: string | {} | undefined;

    /**
     * Set the response status
     * @default 200
     */
    status?: number | undefined;

    /**
     * Set the response headers.
     */
    headers?: { [key: string]: string } | undefined;

    /**
     * If this property is present then a Promise rejected with the value
     * of throws is returned
     */
    throws?: Error | undefined;

    /**
     * The URL the response should be from (to imitate followed redirects
     *  - will set redirected: true on the response)
     */
    redirectUrl?: string | undefined;
  }

  /**
   * Response: A Response instance - will be used unaltered
   * number: Creates a response with this status
   * string: Creates a 200 response with the string as the response body
   * object: As long as the object is not a MockResponseObject it is
   *  converted into a json string and returned as the body of a 200 response
   * If MockResponseObject was given then it's used to configure response
   * Function(url, opts): A function that is passed the url and opts fetch()
   *  is called with and that returns any of the responses listed above
   */
  type MockResponse =
    | Response
    | Promise<Response>
    | number
    | Promise<number>
    | string
    | Promise<string>
    | {}
    | Promise<{}>
    | MockResponseObject
    | Promise<MockResponseObject>;

  /**
   * Mock response function
   */
  type MockResponseFunction = (url: string, opts: MockRequest) => MockResponse;

  interface MockOptions {
    /**
     * A unique string naming the route. Used to subsequently retrieve
     * references to the calls, grouped by name.
     * @default matcher.toString()
     *
     * Note: If a non-unique name is provided no error will be thrown
     *  (because names are optional, auto-generated ones may legitimately
     *  clash)
     */
    name?: string | undefined;

    /**
     * http method to match
     */
    method?: string | undefined;

    /**
     * key/value map of headers to match
     */
    headers?: { [key: string]: string | number } | undefined;

    /**
     * body to match
     */
    body?: string | {} | undefined;

    /**
     * key/value map of query strings to match, in any order
     */
    query?: { [key: string]: string } | undefined;

    /**
     * key/value map of express style path params to match
     */
    params?: { [key: string]: string } | undefined;

    /**
     * A function for arbitrary matching
     */
    functionMatcher?: MockMatcherFunction | undefined;

    /**
     * as specified above
     */
    matcher?: MockMatcher | undefined;

    /**
     * This option allows for existing routes in a mock to be overwritten.
     * It’s also possible to define multiple routes with ‘the same’ matcher.
     * Default behaviour is to error
     */
    overwriteRoutes?: boolean | undefined;

    /**
     * as specified above
     */
    response?: MockResponse | MockResponseFunction | undefined;

    /**
     * integer, n, limiting the number of times the matcher can be used.
     * If the route has already been called n times the route will be
     * ignored and the call to fetch() will fall through to be handled by
     * any other routes defined (which may eventually result in an error
     * if nothing matches it).
     */
    repeat?: number | undefined;

    /**
     * Convert objects into JSON before delivering as stub responses. Can
     * be useful to set to false globally if e.g. dealing with a lot of
     * array buffers. If true, will also add content-type: application/json
     * header.
     * @default true
     */
    sendAsJson?: boolean | undefined;

    /**
     * Automatically sets a content-length header on each response.
     * @default true
     */
    includeContentLength?: boolean | undefined;
  }

  function mock(moduleName: string, factory?: () => unknown, options?: MockOptions): typeof jest;

  type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
  }[keyof T] &
    string;

  type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
  }[keyof T] &
    string;
  type ConstructorPropertyNames<T> = {
    [K in keyof T]: T[K] extends new (...args: any[]) => any ? K : never;
  }[keyof T] &
    string;
  type ResolvedValue<T> = T extends PromiseLike<infer U> ? U | T : never;
  interface MockInstance<T, Y extends any[]> {
    /**
     * Accepts a value that will be returned whenever the mock function is called.
     *
     * @example
     *
     * const mock = jest.fn();
     * mock.mockReturnValue(42);
     * mock(); // 42
     * mock.mockReturnValue(43);
     * mock(); // 43
     */
    mockReturnValue(value: T): this;
    /**
     * Simple sugar function for: `jest.fn().mockImplementation(() => Promise.resolve(value));`
     */
    mockResolvedValue(value: ResolvedValue<T>): this;

    /**
     * Accepts a function that should be used as the implementation of the mock. The mock itself will still record
     * all calls that go into and instances that come from itself – the only difference is that the implementation
     * will also be executed when the mock is called.
     *
     * Note: `jest.fn(implementation)` is a shorthand for `jest.fn().mockImplementation(implementation)`.
     */
    mockImplementation(fn?: (...args: Y) => T): this;

    /**
     * Accepts a function that will be used as an implementation of the mock for one call to the mocked function.
     * Can be chained so that multiple function calls produce different results.
     *
     * @example
     *
     * const myMockFn = jest
     *   .fn()
     *    .mockImplementationOnce(cb => cb(null, true))
     *    .mockImplementationOnce(cb => cb(null, false));
     *
     * myMockFn((err, val) => console.log(val)); // true
     *
     * myMockFn((err, val) => console.log(val)); // false
     */
    mockImplementationOnce(fn: (...args: Y) => T): this;
  }
  interface SpyInstance<T = any, Y extends any[] = any> extends MockInstance<T, Y> {}

  /**
   * Creates a mock function similar to jest.fn but also tracks calls to `object[methodName]`
   *
   * Note: By default, jest.spyOn also calls the spied method. This is different behavior from most
   * other test libraries.
   *
   * @example
   *
   * const video = require('./video');
   *
   * test('plays video', () => {
   *   const spy = jest.spyOn(video, 'play');
   *   const isPlaying = video.play();
   *
   *   expect(spy).toHaveBeenCalled();
   *   expect(isPlaying).toBe(true);
   *
   *   spy.mockReset();
   *   spy.mockRestore();
   * });
   */
  function spyOn<T extends {}, M extends NonFunctionPropertyNames<Required<T>>>(
    object: T,
    method: M,
    accessType: 'get'
  ): SpyInstance<Required<T>[M], []>;
  function spyOn<T extends {}, M extends NonFunctionPropertyNames<Required<T>>>(
    object: T,
    method: M,
    accessType: 'set'
  ): SpyInstance<void, [Required<T>[M]]>;
  function spyOn<T extends {}, M extends FunctionPropertyNames<Required<T>>>(
    object: T,
    method: M
  ): Required<T>[M] extends (...args: any[]) => any
    ? SpyInstance<ReturnType<Required<T>[M]>, ArgsType<Required<T>[M]>>
    : never;
  function spyOn<T extends {}, M extends ConstructorPropertyNames<Required<T>>>(
    object: T,
    method: M
  ): Required<T>[M] extends new (...args: any[]) => any
    ? SpyInstance<InstanceType<Required<T>[M]>, ConstructorArgsType<Required<T>[M]>>
    : never;

  /**
   * Clears the mock.calls and mock.instances properties of all mocks.
   * Equivalent to calling .mockClear() on every mocked function.
   */
  function clearAllMocks(): typeof jest;

  interface Mock<T = any, Y extends any[] = any> extends Function, MockInstance<T, Y> {
    new (...args: Y): T;
    (...args: Y): T;
  }
  /**
   * Creates a mock function. Optionally takes a mock implementation.
   */
  function fn(): Mock;
  /**
   * Creates a mock function. Optionally takes a mock implementation.
   */
  function fn<T, Y extends any[]>(implementation?: (...args: Y) => T): Mock<T, Y>;

  function runAllTimers(): typeof jest;

  type ArgsType<T> = T extends (...args: infer A) => any ? A : never;
  type ConstructorArgsType<T> = T extends new (...args: infer A) => any ? A : never;

  interface Expect {
    /**
     * The `expect` function is used every time you want to test a value.
     * You will rarely call `expect` by itself.
     *
     * @param actual The value to apply matchers against.
     */
    <T = any>(actual: T): JestMatchers<T>;
    not: InverseAsymmetricMatchers;
  }

  interface InverseAsymmetricMatchers {
    /**
     * `expect.not.arrayContaining(array)` matches a received array which
     * does not contain all of the elements in the expected array. That is,
     * the expected array is not a subset of the received array. It is the
     * inverse of `expect.arrayContaining`.
     *
     * Optionally, you can provide a type for the elements via a generic.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    arrayContaining<E = any>(arr: E[]): any;
    /**
     * `expect.not.objectContaining(object)` matches any received object
     * that does not recursively match the expected properties. That is, the
     * expected object is not a subset of the received object. Therefore,
     * it matches a received object which contains properties that are not
     * in the expected object. It is the inverse of `expect.objectContaining`.
     *
     * Optionally, you can provide a type for the object via a generic.
     * This ensures that the object contains the desired structure.
     */
    // tslint:disable-next-line: no-unnecessary-generics
    objectContaining<E = {}>(obj: E): any;
    /**
     * `expect.not.stringMatching(string | regexp)` matches the received
     * string that does not match the expected regexp. It is the inverse of
     * `expect.stringMatching`.
     */
    stringMatching(str: string | RegExp): any;
    /**
     * `expect.not.stringContaining(string)` matches the received string
     * that does not contain the exact expected string. It is the inverse of
     * `expect.stringContaining`.
     */
    stringContaining(str: string): any;
  }
}
declare const expect: jest.Expect;
