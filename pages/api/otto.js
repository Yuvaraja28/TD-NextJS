const Cp = 1.005
const Cv = 0.718
const RCV = 0.287
const GAMMA = 1.4
class Otto {
    constructor({t1, t2, t3, t4, p1, p2, p3, p4, v1, v2, v3, v4,
        m, r, Qs, Qr, wd, efficiency, efficiency_percent, mep,
        c_t1, c_t2, c_t3, c_t4, c_p1, c_p2, c_p3, c_p4,
        c_v1, c_v2, c_v3, c_v4, c_qs, c_qr, c_wd, c_mep, c_m}) {
        this.t1 = t1; this.t2 = t2; this.t3 = t3; this.t4 = t4
        this.p1 = p1; this.p2 = p2; this.p3 = p3; this.p4 = p4
        this.v1 = v1; this.v2 = v2; this.v3 = v3; this.v4 = v4
        this.c_t1 = c_t1, this.c_t2 = c_t2, this.c_t3 = c_t3, this.c_t4 = c_t4,
        this.c_p1 = c_p1, this.c_p2 = c_p2, this.c_p3 = c_p3, this.c_p4 = c_p4,
        this.c_v1 = c_v1, this.c_v2 = c_v2, this.c_v3 = c_v3, this.c_v4 = c_v4,
        this.c_qs = c_qs, this.c_qr = c_qr, this.c_wd = c_wd, this.c_mep = c_mep, this.c_m = c_m
        this.r = r, this.Qs = Qs, this.Qr = Qr, this.wd = wd, this.mep = mep
        this.m = m, this.efficiency = efficiency, this.efficiency_percent = efficiency_percent 
        this.convert()
        if ((this.v1 === undefined) && (this.v4 !== undefined)) {
            this.v1 = this.v4
        }
        if ((this.v2 === undefined) && (this.v3 !== undefined)) {
            this.v2 = this.v3
        }
        if ((this.v1 !== undefined) && (this.v4 === undefined)) {
            this.v4 = this.v1
        }
        if ((this.v2 !== undefined) && (this.v3 === undefined)) {
            this.v3 = this.v2
        }
        if (this.m === undefined) {
            this.m = 1
        }
        if ((this.efficiency === undefined) && (this.efficiency_percent !== undefined)) {
            this.efficiency = (this.efficiency_percent / 100)
        }
        this.ai_calculate()
        this.value()
    }
    R() {
        if (this.r === undefined) {
            if ((this.v1 !== undefined) && (this.v2 !== undefined)) {
                this.r = this.v1 / this.v2
                this.Efficiency()
            } else if ((this.t2 !== undefined) && (this.t1 !== undefined)) {
                this.r = (this.t2 / this.t1) ** (1 / (GAMMA - 1))
                this.Efficiency()
            } else if ((this.t3 !== undefined) && (this.t4 !== undefined)) {
                this.r = (this.t3 / this.t4) ** (1 / (GAMMA - 1))
                this.Efficiency()
            } else if ((this.p2 !== undefined) && (this.p1 !== undefined)) {
                this.r = (this.p2 / this.p1) ** (1 / GAMMA)
                this.Efficiency()
            } else if ((this.p3 !== undefined) && (this.p4 !== undefined)) {
                this.r = (this.p3 / this.p4) ** (1 / GAMMA)
                this.Efficiency()
            } else if (this.efficiency !== undefined) {
                this.r = (1/(1-(this.efficiency_percent/100))) ** (1/(GAMMA-1))
            }
        }
    }
    T1() {
        if (this.t1 === undefined) {
            if ((this.p1 !== undefined) && (this.v1 !== undefined)) {
                this.t1 = (this.p1 * this.v1) / (this.m * RCV)
                this.T2()
                this.T4()
            } else if ((this.t4 !== undefined) && (this.p1 !== undefined) && (this.p4 !== undefined)) {
                this.t1 = (this.p1 / this.p4) * this.t4
                this.T2()
                this.T4()
            } else if ((this.t2 !== undefined) && (this.r !== undefined)) {
                this.t1 = this.t2 / (this.r ** (GAMMA - 1))
                this.T2()
                this.T4()
            }
        }
    }
    T2() {
        if (this.t2 === undefined) {
            if ((this.t1 !== undefined) && (this.r !== undefined)) {
                this.t2 = this.t1 * (this.r ** (GAMMA - 1))
                this.T1()
            } else if ((this.t3 !== undefined) && (this.p2 !== undefined) && (this.p3 !== undefined)) {
                this.t2 = (this.t3 / this.p3) * this.p2
                this.T1()
            } else if ((this.Qs !== undefined) && (this.t3 !== undefined)) {
                this.t2 = this.t3 - (this.Qs / (this.m * Cv))
                this.T1()
            }
        }
    }
    T3() {
        if (this.t3 === undefined) {
            if ((this.t4 !== undefined) && (this.r !== undefined)) {
                this.t3 = this.t4 * (this.r ** (GAMMA - 1))
                this.T4()
            } else if ((this.p3 !== undefined) && (this.p2 !== undefined) && (this.t2 !== undefined)) {
                this.t3 = (this.p3 / this.p2) * this.t2
                this.T4()
            } else if ((this.Qs !== undefined) && (this.t2 !== undefined)) {
                this.t3 = (this.Qs / (this.m * Cv)) + this.t2
                this.T4()
            }
        }
    }
    T4() {
        if (this.t4 === undefined) {
            if ((this.p4 !== undefined) && (this.p1 !== undefined) && (this.t1 !== undefined)) {
                this.t4 = (this.p4 / this.p1) * this.t1
                this.T3()
            } else if ((this.t3 !== undefined) && (this.r !== undefined)) {
                this.t4 = this.t3 / (this.r ** (GAMMA - 1))
                this.T3()
            }
        }
    }
    P1() {
        if (this.p1 === undefined) {
            if ((this.v1 !== undefined) && (this.t1 !== undefined)) {
                this.p1 = (this.m * RCV * this.t1) / this.v1
                this.P2()
                this.P4()
            } else if ((this.t1 !== undefined) && (this.t4 !== undefined) && (this.p4 !== undefined)) {
                this.p1 = (this.t1 / this.t4) * this.p4
                this.P2()
                this.P4()
            } else if ((this.p2 !== undefined) && (this.r !== undefined)) {
                this.p1 = this.p2 / (this.r ** (GAMMA))
                this.P2()
                this.P4()
            }
        }
    }
    P2() {
        if (this.p2 === undefined) {
            if ((this.p1 !== undefined) && (this.r !== undefined)) {
                this.p2 = this.p1 * (this.r ** GAMMA)
                this.P1()
            } else if ((this.t2 !== undefined) && (this.t3 !== undefined) && (this.p3 !== undefined)) {
                this.p2 = (this.t2 / this.t3) * this.p3
                this.P1()
            }
        }
    }
    P3() {
        if (this.p3 === undefined) {
            if ((this.p4 !== undefined) && (this.r !== undefined)) {
                this.p3 = this.p4 * (this.r ** GAMMA)
                this.P4()
            } else if ((this.t3 !== undefined) && (this.t2 !== undefined) && (this.p2 !== undefined)) {
                this.p3 = (this.t3 / this.t2) * this.p2
                this.P4()
            }
        }
    }
    P4() {
        if (this.p4 === undefined) {
            if ((this.t4 !== undefined) && (this.t1 !== undefined) && (this.p1 !== undefined)) {
                this.p4 = (this.t4 / this.t1) * this.p1
                this.P3()
            } else if ((this.p1 !== undefined) && (this.t1 !== undefined) && (this.t4 !== undefined)) {
                this.p4 = (this.p1 / this.t1) * this.t4
                this.P3()
            } else if ((this.p3 !== undefined) && (this.r !== undefined)) {
                this.p4 = this.p3 / (this.r ** (GAMMA))
                this.P3()
            }
        }
    }
    V1() {
        if (this.v1 === undefined) {
            if ((this.p1 !== undefined) && (this.t1 !== undefined)) {
                this.v4 = this.v1 = (this.m * RCV * this.t1) / this.p1
                if (this.v2 !== undefined) {
                    this.MEP()
                }
            }
        }
    }
    V2() {
        if (this.v2 === undefined) {
            if ((this.r !== undefined) && (this.v1 !== undefined)) {
                this.v3 = this.v2 = this.v1 / this.r
                if (this.v1 !== undefined) {
                    this.MEP()
                }
            }
        }
    }
    QS() {
        if (this.Qs === undefined) {
            if ((this.t3 !== undefined) && (this.t2 !== undefined)) {
                this.Qs = this.m * Cv * (this.t3 - this.t2)
                this.WD()
            }
        }
    }
    QR() {
        if (this.Qr === undefined) {
            if ((this.t4 !== undefined) && (this.t1 !== undefined)) {
                this.Qr = this.m * Cv * (this.t4 - this.t1)
            }
        }
    }
    WD() {
        if (this.wd === undefined) {
            if ((this.efficiency !== undefined) && (this.Qs !== undefined)) {
                this.wd = this.efficiency * this.Qs
                this.MEP()
            }
        }
    }
    MEP() {
        if (this.mep === undefined) {
            if ((this.wd !== undefined) && (this.v1 !== undefined) && (this.v2 !== undefined)) {
                this.mep = this.wd / (this.v1 - this.v2)
            }
        }
    }
    Efficiency() {
        if (this.efficiency === undefined) {
            if (this.r !== undefined) {
                this.efficiency = 1 - (1 / (this.r ** (GAMMA - 1)))
                this.efficiency_percent = this.efficiency * 100
                if ((this.Qs !== undefined) && (this.wd !== undefined)) {
                    this.efficiency = this.wd / this.Qs
                    this.efficiency_percent = this.efficiency * 100
                }
            }
        }
    }
    ai_calculate() {
        this.R()
        this.T2(); this.T1(); this.P2(); this.P1(); this.V1(); this.V2()
        this.R()
        this.T2(); this.T1(); this.P2(); this.P1(); this.V1(); this.V2()
        this.T4(); this.P4(); this.T3(); this.P3()
        this.QS(); this.QR()
        this.Efficiency()
        this.WD()
        this.MEP()
    }
    convert() {
        for (var key in this) {
            if (this[key] === "") {
                this[key] = undefined
            }
            if ((this[key] !== undefined) && (!key.startsWith("c_"))) {
                this[key] = parseFloat(this[key])
            }
        }
        for (var key in this) {
            if (key.startsWith("c_")) {
                if (this[key] === "c") {
                    this[key.slice(2)] = this[key.slice(2)] + 273.15
                }
                if (this[key] === "mpa") {
                    this[key.slice(2)] = this[key.slice(2)] * 1000
                }
                if (this[key] === "bar") {
                    this[key.slice(2)] = this[key.slice(2)] * 100
                }
            }
        }
    }
    value() {
        for (var key in this) {
            if (this[key] === undefined) {
                this[key] = "-"
            } else if (!key.startsWith("c_")) {
                this[key] = this[key].toFixed(2)
            }
        }
    }
}
export default function handler(req, res) {
  if (req.method !== "POST") { return res.status(404).send("Not Enough Data") }
  try { return res.status(200).json(new Otto(JSON.parse(req.body))) }
  catch { return res.status(500).send('Error') }
}