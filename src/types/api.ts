export type ApiResult<T> = ApiSuccess<T> | ApiError

export type ApiSuccess<T> = { ok: true; data: T }

export type ApiError = {
  ok: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export function ok<T>(data: T): ApiSuccess<T> {
  return { ok: true, data }
}

export function err(
  code: string,
  message: string,
  details?: unknown,
): ApiError {
  return {
    ok: false,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  }
}

export interface ApiPage<T> {
  items: T[]
  nextCursor: string | null
  hasMore: boolean
}
