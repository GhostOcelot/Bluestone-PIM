declare global {
  const vi: typeof import("vitest").vi
  const expect: typeof import("vitest").expect
  const it: typeof import("vitest").it
  const describe: typeof import("vitest").describe
  const beforeEach: typeof import("vitest").beforeEach
  const afterEach: typeof import("vitest").afterEach
  const beforeAll: typeof import("vitest").beforeAll
  const afterAll: typeof import("vitest").afterAll
}

export {}
