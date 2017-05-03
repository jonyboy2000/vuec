export interface Either<E, T> {
  map<R>(fn: (value: T) => R): Either<E, R>
  flatMap<R>(fn: (value: T) => Either<E, R>): Either<E, R>
  forEach(fn: (value: T) => void): void
  fold<R>(f: (value: T) => R, g: (error: E) => R): R
}

class EitherImpl implements Either<{}, {}> {
  private error: {} | null
  private value: {} | null

  constructor(error: {} | null, value: {} | null) {
    this.error = error
    this.value = value
  }

  get hasError(): boolean {
    return this.error !== null
  }

  map(fn: (value: {}) => {}): this {
    if (this.value !== null) {
      this.value = fn(this.value)
    }
    return this
  }

  flatMap(fn: (value: {}) => Either<{}, {}>): Either<{}, {}> {
    if (this.value !== null) {
      return fn(this.value)
    }
    return this
  }

  forEach(fn: (value: {}) => void): void {
    if (this.value !== null) {
      fn(this.value)
    }
  }

  fold(f: (value: {}) => {}, g: (error: {}) => {}): {} {
    if (this.hasError) {
      return g(this.error!)
    } else {
      return f(this.value!)
    }
  }
}

export function value<T>(value: T): Either<never, T> {
  return new EitherImpl(null, value) as any
}

export function error<E>(error: E): Either<E, never> {
  return new EitherImpl(error, null) as any
}
