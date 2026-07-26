export function validateRequest(schema) {
  return (request, response, next) => {
    const result = schema.safeParse(request.body);
    if (result.success) {
      request.body = result.data;
      return next();
    }

    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message
    }));
    return response.status(400).json({ message: errors[0].message, errors });
  };
}
