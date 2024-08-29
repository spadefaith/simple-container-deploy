export default function ValidateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (apiKey != process.env.API_KEY) {
    return next(new Error("invalid api key"));
  }

  next();
}
