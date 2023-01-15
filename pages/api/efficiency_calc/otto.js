const GAMMA = 1.4

export default function handler(req, res) {
  if (req.query.compression_ratio == null) { return res.status(200).send(0) }
  return res.status(200).send(((1-(1/(Math.pow(req.query.compression_ratio,(GAMMA-1)))))*100).toFixed(2))
}