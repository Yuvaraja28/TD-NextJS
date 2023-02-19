const Cp = 1.005
const Cv = 0.718
const RCV = 0.287
const GAMMA = 1.4
class Brayton {
    constructor({t1, t2, t3, t4, p1, p2, p3, p4, m, r, Qs, Qr, wd, 
        efficiency, efficiency_percent, mep,
        c_t1, c_t2, c_t3, c_t4, c_p1, c_p2, c_p3, c_p4,
        c_qs, c_qr, c_wd, c_mep, c_m}) {
        this.t1 = t1; this.t2 = t2; this.t3 = t3; this.t4 = t4
        this.p1 = p1; this.p2 = p2; this.p3 = p3; this.p4 = p4
        this.c_t1 = c_t1, this.c_t2 = c_t2, this.c_t3 = c_t3, this.c_t4 = c_t4,
        this.c_p1 = c_p1, this.c_p2 = c_p2, this.c_p3 = c_p3, this.c_p4 = c_p4,
        this.c_qs = c_qs, this.c_qr = c_qr, this.c_wd = c_wd, this.c_mep = c_mep, this.c_m = c_m
        this.r = r, this.Qs = Qs, this.Qr = Qr, this.wd = wd, this.mep = mep
        this.m = m, this.efficiency = efficiency, this.efficiency_percent = efficiency_percent 
        this.convert()
        if ((this.p1 === undefined) && (this.p4 !== undefined)) {
            this.p1 = this.p4
        }
        if ((this.p2 === undefined) && (this.p3 !== undefined)) {
            this.p2 = this.p3
        }
        if ((this.p1 !== undefined) && (this.p4 === undefined)) {
            this.p4 = this.p1
        }
        if ((this.p2 !== undefined) && (this.p3 === undefined)) {
            this.p3 = this.p2
        }
        if (this.m === undefined) {
            this.m = 1
        }
        if ((this.efficiency === undefined) && (this.efficiency_percent !== undefined)) {
            this.efficiency = (this.efficiency_percent / 100)
        }
        if ((this.r !== undefined) && (this.efficiency_percent !== undefined)) {
            this.efficiency = undefined
            this.efficiency_percent = undefined
        }
        this.ai_calculate()
        this.value()
    }
    R() {
        if (this.r === undefined) {
            if ((this.p1 !== undefined) && (this.p2 !== undefined)) {
                this.r = this.p2 / this.p1
                this.Efficiency()
            } else if ((this.t2 !== undefined) && (this.t1 !== undefined)) {
                this.r = (this.t2 / this.t1) ** (GAMMA / (GAMMA - 1))
                this.Efficiency()
            } else if ((this.t3 !== undefined) && (this.t4 !== undefined)) {
                this.r = (this.t3 / this.t4) ** (GAMMA / (GAMMA - 1))
                this.Efficiency()
            } else if (this.efficiency !== undefined) {
                this.r = (1/(1-(this.efficiency_percent/100))) ** (GAMMA/(GAMMA-1))
            }
        }
    }
    T1() {
        if (this.t1 === undefined) {
            if ((this.t2 !== undefined) && (this.r !== undefined)) {
                this.t1 = this.t2 / (this.r ** ((GAMMA - 1)/GAMMA))
                this.T2()
                this.T4()
            } else if ((this.Qs !== undefined) && (this.t4 !== undefined)) {
                this.t1 = this.t4 - (this.Qr / (this.m * Cp))
                this.T2()
            }
        }
    }
    T2() {
        if (this.t2 === undefined) {
            if ((this.t1 !== undefined) && (this.r !== undefined)) {
                this.t2 = this.t1 * (this.r ** ((GAMMA - 1)/GAMMA))
                this.T1()
            } else if ((this.Qs !== undefined) && (this.t3 !== undefined)) {
                this.t2 = this.t3 - (this.Qs / (this.m * Cp))
                this.T1()
            }
        }
    }
    T3() {
        if (this.t3 === undefined) {
            if ((this.t4 !== undefined) && (this.r !== undefined)) {
                this.t3 = this.t4 * (this.r ** ((GAMMA - 1)/GAMMA))
                this.T4()
            } if ((this.Qs !== undefined) && (this.t2 !== undefined)) {
                this.t3 = (this.Qs / (this.m * Cp)) + this.t2
                this.T4()
            }
        }
    }
    T4() {
        if (this.t4 === undefined) {
            if ((this.t3 !== undefined) && (this.r !== undefined)) {
                this.t4 = this.t3 / (this.r ** ((GAMMA - 1)/GAMMA))
                this.T3()
            } else if ((this.Qs !== undefined) && (this.t1 !== undefined)) {
                this.t4 = (this.Qr / (this.m * Cp)) + this.t1
                this.T3()
            }
        }
    }
    P1() {
        if (this.p1 === undefined) {
            if (this.p2 !== undefined) {
                this.p4 = this.p1 = this.p2 / this.r
            }
        }
    }
    P2() {
        if (this.p2 === undefined) {
            if (this.p1 !== undefined) {
                this.p3 = this.p2 = this.p1 * this.r
            }
        }
    }
    QS() {
        if (this.Qs === undefined) {
            if ((this.t3 !== undefined) && (this.t2 !== undefined)) {
                this.Qs = this.m * Cp * (this.t3 - this.t2)
                this.WD()
            }
        }
    }
    QR() {
        if (this.Qr === undefined) {
            if ((this.t4 !== undefined) && (this.t1 !== undefined)) {
                this.Qr = this.m * Cp * (this.t4 - this.t1)
                this.WD()
            }
        }
    }
    WD() {
        if (this.wd === undefined) {
            if ((this.efficiency !== undefined) && (this.Qs !== undefined)) {
                this.wd = this.efficiency * this.Qs
            } else if ((this.Qs !== undefined) && (this.Qr !== undefined)) {
                this.wd = this.Qs - this.Qr
            }
        }
    }
    Efficiency() {
        if (this.efficiency === undefined) {
            if (this.r !== undefined) {
                this.efficiency = 1 - (1 / (this.r ** ((GAMMA - 1)/GAMMA)))
                this.efficiency_percent = this.efficiency * 100
            } else if ((this.Qs !== undefined) && (this.wd !== undefined)) {
                this.efficiency = this.wd / this.Qs
                this.efficiency_percent = this.efficiency * 100
            }
        }
    }
    ai_calculate() {
        this.R()
        this.T2(); this.T1(); this.P2(); this.P1();
        this.R()
        this.T2(); this.T1(); this.P2(); this.P1();
        this.T4(); this.T3();
        this.QS(); this.QR()
        this.Efficiency()
        this.WD()
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
                    this[key] = "k"
                }
                if (this[key] === "mpa") {
                    this[key.slice(2)] = this[key.slice(2)] * 1000
                    this[key] = "kpa"
                }
                if (this[key] === "bar") {
                    this[key.slice(2)] = this[key.slice(2)] * 100
                    this[key] = "kpa"
                }
                if (this[key] === "g") {
                    this[key.slice(2)] = this[key.slice(2)] / 1000
                    this[key] = "kg"
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
  try { return res.status(200).json(new Brayton(JSON.parse(req.body))) }
  catch { return res.status(500).send('Error') }
}