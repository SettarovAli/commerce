export function parseError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode:
        'statusCode' in error && typeof error.statusCode === 'number' ? error.statusCode : 500
    };
  }

  return { message: 'Something went wrong', statusCode: 500 };
}
