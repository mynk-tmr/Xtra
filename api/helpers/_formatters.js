export function jsonResponse(res, code, message) {
  return res.status(code).json({
    message,
  });
}

export function handleInternalError(res, error) {
  console.log(error);
  return res.status(500).json({
    message: "Something went wrong !",
  });
}
