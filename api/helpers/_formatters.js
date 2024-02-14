export function jsonResponse(res, code, message) {
  return res.status(code).json({
    message,
  });
}
