type ApiJsonResponse<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
};

type ApiErrorBody = {
  error?: string;
};

type ApiSuccessBody = {
  ok?: boolean;
  message?: string;
  error?: string;
};

function resolveApiUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (typeof window !== 'undefined') {
    return `${window.location.origin}${normalizedPath}`;
  }

  return normalizedPath;
}

export async function postJsonApi<T extends ApiSuccessBody = ApiSuccessBody>(
  path: string,
  body: unknown,
): Promise<ApiJsonResponse<T>> {
  const res = await fetch(resolveApiUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const contentType = res.headers.get('content-type') ?? '';
  const text = await res.text();

  if (!contentType.includes('application/json')) {
    return {
      ok: false,
      status: res.status,
      error: 'invalid_response',
    };
  }

  try {
    const data = JSON.parse(text) as T & ApiErrorBody;

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: data.error ?? 'request_failed',
      };
    }

    return {
      ok: true,
      status: res.status,
      data,
    };
  } catch {
    return {
      ok: false,
      status: res.status,
      error: 'invalid_response',
    };
  }
}
