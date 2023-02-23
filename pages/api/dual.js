const Cp = 1.005
const Cv = 0.718
const RCV = 0.287
const GAMMA = 1.4
class Dual {
    constructor({t1, t2, t3, t4, t5, p1, p2, p3, p4, p5, v1, v2, v3, v4, v5,
        m, r, rc, rp, Qs, Qr, wd, efficiency, efficiency_percent, mep,
        c_t1, c_t2, c_t3, c_t4, c_t5, c_p1, c_p2, c_p3, c_p4, c_p5,
        c_v1, c_v2, c_v3, c_v4, c_v5, c_qs, c_qr, c_wd, c_mep, c_m}) {
        this.t1 = t1; this.t2 = t2; this.t3 = t3; this.t4 = t4; this.t5 = t5
        this.p1 = p1; this.p2 = p2; this.p3 = p3; this.p4 = p4; this.p5 = p5
        this.v1 = v1; this.v2 = v2; this.v3 = v3; this.v4 = v4; this.v5 = v5
        this.c_t1 = c_t1, this.c_t2 = c_t2, this.c_t3 = c_t3, this.c_t4 = c_t4, this.c_t5 = c_t5,
        this.c_p1 = c_p1, this.c_p2 = c_p2, this.c_p3 = c_p3, this.c_p4 = c_p4, this.c_p5 = c_p5,
        this.c_v1 = c_v1, this.c_v2 = c_v2, this.c_v3 = c_v3, this.c_v4 = c_v4, this.c_v5 = c_v5,
        this.c_qs = c_qs, this.c_qr = c_qr, this.c_wd = c_wd, this.c_mep = c_mep, this.c_m = c_m
        this.r = r, this.rc = rc, this.rp = rp, this.Qs = Qs, this.Qr = Qr, this.wd = wd, this.mep = mep
        this.m = m, this.efficiency = efficiency, this.efficiency_percent = efficiency_percent 
        this.convert()
        if ((this.v1 === undefined) && (this.v5 !== undefined)) {
            this.v1 = this.v5
        }
        if ((this.v1 !== undefined) && (this.v5 === undefined)) {
            this.v5 = this.v1
        }
        if ((this.v2 === undefined) && (this.v3 !== undefined)) {
            this.v2 = this.v3
        }
        if ((this.v2 !== undefined) && (this.v3 === undefined)) {
            this.v3 = this.v2
        }
        if ((this.p3 === undefined) && (this.p4 !== undefined)) {
            this.p3 = this.p4
        }
        if ((this.p3 !== undefined) && (this.p4 === undefined)) {
            this.p4 = this.p3
        }
        if (this.m === undefined) {
            this.m = 1
        }
        if ((this.r !== undefined) && (this.efficiency_percent !== undefined)) {
            this.efficiency = undefined
            this.efficiency_percent = undefined
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
            } else if ((this.t3 !== undefined) && (this.t1 !== undefined) && (this.rp != undefined)) {
                this.r = (this.t3 / (this.t1 * this.rp)) ** (1 / (GAMMA - 1))
                this.Efficiency()
            } else if ((this.t4 !== undefined) && (this.t1 !== undefined) && (this.rc != undefined) && (this.rp != undefined)) {
                this.r = (this.t4 / (this.t1 * this.rp * this.rc)) ** (1 / (GAMMA - 1))
                this.Efficiency()
            } else if ((this.p2 !== undefined) && (this.p1 !== undefined)) {
                this.r = (this.p2 / this.p1) ** (1 / GAMMA)
                this.Efficiency()
            }
        }
    }
    RP() {
        if (this.rp === undefined) {
            if ((this.p3 !== undefined) && (this.p2 !== undefined)) {
                this.rp = this.p3 / this.p2
                this.Efficiency()
            } else if ((this.t3 !== undefined) && (this.t1 !== undefined) && (this.r != undefined)) {
                this.rp = this.t3 / (this.t1 * (this.r ** (GAMMA-1)))
                this.Efficiency()
            } else if ((this.t4 !== undefined) && (this.t1 !== undefined) && (this.rc !== undefined) && (this.r != undefined)) {
                this.rp = this.t4 / (this.rc * this.t1 * (this.r ** (GAMMA-1)))
                this.Efficiency()
            } else if ((this.t5 !== undefined) && (this.t1 !== undefined) && (this.rp != undefined)) {
                this.rp = (this.t5 / ((this.rp**(GAMMA)) * this.t1))
                this.Efficiency()
            }
        }
    }
    RC() {
        if (this.rc === undefined) {
            if ((this.v3 !== undefined) && (this.v4 !== undefined)) {
                this.rc = this.v4 / this.v3
                this.Efficiency()
            } else if ((this.t4 !== undefined) && (this.t1 !== undefined) && (this.r != undefined) && (this.rp != undefined)) {
                this.rc = this.t4 / (this.rp * this.t1 * (this.r ** (GAMMA-1)))
                this.Efficiency()
            } else if ((this.t5 !== undefined) && (this.t1 !== undefined) && (this.rp != undefined)) {
                this.rc = (this.t5 / (this.rp * this.t1)) ** (1/GAMMA)
                this.Efficiency()
            } else if ((this.t4 !== undefined) && (this.t3 !== undefined)) {
                this.rc = this.t4 / this.t3
                this.Efficiency()
            }
        }
    }
    T1() {
        if (this.t1 === undefined) {
            if ((this.p1 !== undefined) && (this.v1 !== undefined)) {
                this.t1 = (this.p1 * this.v1) / (this.m * RCV)
                this.T2()
                this.T3()
                this.T4()
                this.T5()
            } else if ((this.t5 !== undefined) && (this.p1 !== undefined) && (this.p5 !== undefined)) {
                this.t1 = (this.p1 / this.p4) * this.t5
                this.T2()
                this.T3()
                this.T4()
            } else if ((this.t2 !== undefined) && (this.r !== undefined)) {
                this.t1 = this.t2 / (this.r ** (GAMMA - 1))
                this.T3()
                this.T4()
                this.T5()
                this.P5()
            } else if ((this.Qr !== undefined) && (this.t5 !== undefined)) {
                this.t1 = this.t5 - (this.Qr / (this.m * Cv))
                this.T2()
                this.T3()
                this.T4()
                this.P5()
            } else if ((this.t3 !== undefined) && (this.rc !== undefined) && (this.r !== undefined)) {
                this.t1 = this.t3 / (this.rc * (this.r ** (GAMMA-1)))
                this.T2()
                this.T4()
                this.T5()
                this.P5()
            } else if ((this.t4 !== undefined) && (this.rc !== undefined) && (this.r !== undefined) && (this.rp !== undefined)) {
                this.t1 = this.t4 / (this.rp * this.rc * (this.r ** (GAMMA-1)))
                this.T2()
                this.T3()
                this.T5()
                this.P5()
            } else if ((this.t5 !== undefined) && (this.rc !== undefined) && (this.rp !== undefined)) {
                this.t1 = this.t5 / (this.rp * (this.rc ** (GAMMA)))
                this.T2()
                this.T3()
                this.T4()
                this.P5()
            }
        }
    }
    T2() {
        if (this.t2 === undefined) {
            if ((this.p2 !== undefined) && (this.v2 !== undefined)) {
                this.t2 = (this.p2 * this.v2) / (this.m * RCV)
                this.T1()
                this.T3()
                this.P3()
            } else if ((this.t1 !== undefined) && (this.r !== undefined)) {
                this.t2 = this.t1 * (this.r ** (GAMMA - 1))
                this.T3()
                this.P3()
            } else if ((this.t3 !== undefined) && (this.p2 !== undefined) && (this.p3 !== undefined)) {
                this.t2 = (this.p2 / this.p3) * this.t3
                this.T1()
                this.P3()
            } else if ((this.t3 != undefined) && (this.t4 != undefined) && (this.Qs != undefined)) {
                this.t2 = this.t3 - ((this.Qs - (this.m*Cp*(this.t4-this.t3)))/(this.m*Cv))
                this.T1()
                this.P3()
            } else if ((this.t3 != undefined) && (this.t4 != undefined)) {
                this.t2 = this.t3 - ((Cp*(this.t4-this.t3)) / Cv)
                this.T1()
                this.P3()
            }
        }
    }
    T3() {
        if (this.t3 === undefined) {
            if ((this.p3 !== undefined) && (this.v3 !== undefined)) {
                this.t3 = (this.p3 * this.v3) / (this.m * RCV)
                this.T1()
                this.T2()
                this.P3()
            } else if ((this.t1 !== undefined) && (this.r !== undefined) && (this.rc != undefined)) {
                this.t3 = this.rc * this.t1 * (this.r ** (GAMMA - 1))
                this.T2()
                this.P3()
            } else if ((this.v3 !== undefined) && (this.v4 !== undefined) && (this.t4 !== undefined)) {
                this.t3 = (this.v3 / this.v4) * this.t4
                this.T1()
                this.T2()
                this.P3()
            } else if ((this.p3 !== undefined) && (this.p2 !== undefined) && (this.t2 !== undefined)) {
                this.t3 = (this.p3 / this.p2) * this.t2
                this.T1()
                this.P3()
            } else if ((this.t4 != undefined) && (this.t2 != undefined) && (this.Qs != undefined)) {
                this.t3 = ((Cp*this.t4) - (Cv*this.t2) - (this.Qs/m)) / (Cp-Cv)
                this.T1()
                this.T2()
                this.P3()
            }
        }
    }
    T4() {
        if (this.t4 === undefined) {
            if ((this.p4 !== undefined) && (this.v4 !== undefined)) {
                this.t4 = (this.p4 * this.v4) / (this.m * RCV)
                this.T1()
                this.T3()
            } else if ((this.v4 !== undefined) && (this.v3 !== undefined) && (this.t3 !== undefined)) {
                this.t4 = (this.v4 / this.v3) * this.t3
                this.T1()
            } else if ((this.t1 !== undefined) && (this.rc !== undefined) && (this.rp !== undefined) && (this.r !== undefined)) {
                this.t4 = this.t1 * this.rc * this.rp * (this.r ** (GAMMA-1))
                this.T3()
            } else if ((this.t3 != undefined) && (this.t2 != undefined) && (this.Qs != undefined)) {
                this.t4 = ((this.Qs - (this.m*Cv*(this.t3-this.t2)))/(this.m*Cp)) + this.t3
                this.T1()
            } else if ((this.t3 != undefined) && (this.t2 != undefined)) {
                this.t4 = ((Cv*(this.t3-this.t2)) / Cp) + this.t3
                this.T1()
            }
        }
    }
    T5() {
        if (this.t5 === undefined) {
            if ((this.p5 !== undefined) && (this.v5 !== undefined)) {
                this.t5 = (this.p5 * this.v5) / (this.m * RCV)
                this.T1()
            } else if ((this.p5 !== undefined) && (this.p1 !== undefined) && (this.t1 !== undefined)) {
                this.t5 = (this.p5 / this.p1) * this.t1
            } else if ((this.t1 !== undefined) && (this.rc !== undefined) && (this.rp !== undefined)) {
                this.t5 = this.t1 * this.rp * (this.rc ** GAMMA)
            } else if ((this.Qr !== undefined) && (this.t1 !== undefined)) {
                this.t5 = (this.Qr / (this.m * Cv)) + t1
            }
        }
    }
    P1() {
        if (this.p1 === undefined) {
            if ((this.v1 !== undefined) && (this.t1 !== undefined)) {
                this.p1 = (this.m * RCV * this.t1) / this.v1
                this.P2()
                this.P5()
            } else if ((this.t1 !== undefined) && (this.t5 !== undefined) && (this.p5 !== undefined)) {
                this.p1 = (this.t1 / this.t5) * this.p5
                this.P2()
            } else if ((this.p2 !== undefined) && (this.r !== undefined)) {
                this.p1 = this.p2 / (this.r ** (GAMMA))
                this.P5()
            }
        }
    }
    P2() {
        if (this.p2 === undefined) {
            if ((this.v2 !== undefined) && (this.t2 !== undefined)) {
                this.p2 = (this.m * RCV * this.t2) / this.v2
                this.P1()
                this.P3()
            } else if ((this.p1 !== undefined) && (this.r !== undefined)) {
                this.p2 = this.p1 * (this.r ** GAMMA)
                this.P3()
            } else if ((this.t2 !== undefined) && (this.t3 !== undefined) && (this.p3 !== undefined)) {
                this.p2 = (this.t2 / this.t3) * this.p3
                this.P1()
            }
        }
    }
    P3() {
        if (this.p3 === undefined) {
            if ((this.v3 !== undefined) && (this.t3 !== undefined)) {
                this.p4 = this.p3 = (this.m * RCV * this.t3) / this.v3
            } else if ((this.t2 !== undefined) && (this.t3 !== undefined) && (this.p2 !== undefined)) {
                this.p4 = this.p3 = (this.t3 / this.t2) * this.p2
            }

        }
    }
    P5() {
        if (this.p5 === undefined) {
            if ((this.v5 !== undefined) && (this.t5 !== undefined)) {
                this.p5 = (this.m * RCV * this.t5) / this.v5
            } else if ((this.t5 !== undefined) && (this.t1 !== undefined) && (this.p1 !== undefined)) {
                this.p5 = (this.t5 / this.t1) * this.p1
            }
        }
    }
    V1() {
        if (this.v1 === undefined) {
            if ((this.p1 !== undefined) && (this.t1 !== undefined)) {
                this.v5 = this.v1 = (this.m * RCV * this.t1) / this.p1
                if (this.v2 !== undefined) {
                    this.MEP()
                }
                this.V2()
            } else if ((this.r !== undefined) && (this.v2 !== undefined)) {
                this.v5 = this.v1 = this.v2 * this.r
                this.MEP()
            } else if ((this.wd !== undefined) && (this.mep !== undefined) && (this.v2 !== undefined)) {
                this.v5 = this.v1 = (this.wd / this.mep) + this.v2
            }
        }
    }
    V2() {
        if (this.v2 === undefined) {
            if ((this.p2 !== undefined) && (this.t2 !== undefined)) {
                this.v3 = this.v2 = (this.m * RCV * this.t2) / this.p2
                if (this.v1 !== undefined) {
                    this.MEP()
                }
            } else if ((this.r !== undefined) && (this.v1 !== undefined)) {
                this.v3 = this.v2 = this.v1 / this.r
                this.MEP()
            } else if ((this.rc !== undefined) && (this.v4 !== undefined)) {
                this.v3 = this.v2 = this.v4 / this.rc
                if (this.v1 !== undefined) {
                    this.MEP()
                }
            } else if ((this.wd !== undefined) && (this.mep !== undefined) && (this.v1 !== undefined)) {
                this.v3 = this.v2 = this.v1 - (this.wd / this.mep)
            } else if ((this.t3 !== undefined) && (this.t4 !== undefined) && (this.v4 != undefined)) {
                this.v3 = this.v2 = (this.t3 / this.t4) * this.v4
                if (this.v1 !== undefined) {
                    this.MEP()
                }
            }
        }
    }
    V4() {
        if (this.v4 === undefined) {
            if ((this.p4 !== undefined) && (this.t4 !== undefined)) {
                this.v4 = (this.m * RCV * this.t4) / this.p4
            } else if ((this.rc !== undefined) && (this.v3 !== undefined)) {
                this.v4 = this.v3 * this.rc
            }
        }
    }
    QS() {
        if (this.Qs === undefined) {
            if ((this.t3 !== undefined) && (this.t2 !== undefined) && (this.t4 != undefined)) {
                this.Qs = (this.m * Cv * (this.t3 - this.t2)) + (this.m * Cp * (this.t4 - this.t3)) 
                this.WD()
            } else if ((this.Qr !== undefined) && (this.mep !== undefined) && (this.v1 !== undefined) && (this.v2 !== undefined)) {
                this.Qs = (this.mep * (this.v1 - this.v2)) + this.Qr
                this.WD()
            } else if ((this.efficiency !== undefined) && (this.wd !== undefined)) {
                this.Qs = this.wd / this.efficiency
                this.WD()
                this.MEP()
            } else if ((this.wd !== undefined) && (this.Qr !== undefined)) {
                this.Qs = this.wd + this.Qr
            }
        }
    }
    QR() {
        if (this.Qr === undefined) {
            if ((this.t5 !== undefined) && (this.t1 !== undefined)) {
                this.Qr = this.m * Cv * (this.t5 - this.t1)
                this.WD()
            } else if ((this.Qs !== undefined) && (this.mep !== undefined) && (this.v1 !== undefined) && (this.v2 !== undefined)) {
                this.Qr = this.Qs - (this.mep * (this.v1 - this.v2))
                this.WD()
            } else if ((this.wd !== undefined) && (this.Qs !== undefined)) {
                this.Qr = this.Qs - this.wd
            }
    }
    }
    WD() {
        if (this.wd === undefined) {
            if ((this.efficiency !== undefined) && (this.Qs !== undefined)) {
                this.wd = this.efficiency * this.Qs
                this.MEP()
            } else if ((this.Qs !== undefined) && (this.Qr !== undefined)) {
                this.wd = this.Qs - this.Qr
                this.MEP()
            } else if ((this.mep !== undefined) && (this.v1 !== undefined) && (this.v2 !== undefined)) {
                this.wd = this.mep * (this.v1 - this.v2)
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
            if ((this.r !== undefined) && (this.rc != undefined)) {
                this.efficiency = 1 - (1 / ((this.r ** (GAMMA - 1))) * ((((this.rc**GAMMA)*this.rp) - 1) / ((this.rp-1)+(GAMMA*this.rp*(this.rc - 1)))))
                this.efficiency_percent = this.efficiency * 100
            } else if ((this.Qs !== undefined) && (this.wd !== undefined)) {
                this.efficiency = this.wd / this.Qs
                this.efficiency_percent = this.efficiency * 100
            }
        }
    }
    ai_calculate() {
        this.R(); this.RC(); this.RP()
        this.T2(); this.T1(); this.P5(); this.P3(); this.P2(); this.P1(); this.V1(); this.V2(); this.V4();
        this.T5(); this.T4(); this.T3();
        this.QS(); this.QR()
        this.R(); this.RC(); this.RP()
        this.T2(); this.T1(); this.P5(); this.P3(); this.P2(); this.P1(); this.V1(); this.V2(); this.V4();
        this.T5(); this.T4(); this.T3();
        this.QS(); this.QR()
        this.WD()
        this.Efficiency()
        this.R(); this.RC(); this.RP()
        this.WD()
        this.QS(); this.QR()
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
  try { return res.status(200).json(new Dual(JSON.parse(req.body))) }
  catch { return res.status(500).send('Error') }
}