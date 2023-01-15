const GAMMA = 1.4

export default function handler(req, res) {
  if ((req.query.cut_off_ratio == null) || (req.query.compression_ratio == null)) { return res.status(200).send(0) }
  return res.status(200).send(((1-((Math.pow(req.query.cut_off_ratio,GAMMA)-1)/((GAMMA*Math.pow(req.query.compression_ratio,(GAMMA-1)))*(req.query.cut_off_ratio-1))))*100).toFixed(2))
}

