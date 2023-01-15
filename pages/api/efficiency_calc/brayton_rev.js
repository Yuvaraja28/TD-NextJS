const GAMMA = 1.4

export default function handler(req, res) {
  if (req.query.efficiency == null) { return res.status(200).send(0) }
  return res.status(200).send((Math.pow((1/(1-(req.query.efficiency/100))), GAMMA/(GAMMA-1))).toFixed(2))
}