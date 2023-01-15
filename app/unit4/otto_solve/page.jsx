'use client';
const Cp = 1.005
const Cv = 0.718
const RCV = 0.287
const GAMMA = 1.4
class Otto {
    constructor({t1, t2, t3, t4, p1, p2, p3, p4, v1, v2, v3, v4,
        m, r, Qs, Qr, wd, efficiency, mep,
        c_t1, c_t2, c_t3, c_t4, c_p1, c_p2, c_p3, c_p4,
        c_v1, c_v2, c_v3, c_v4, c_Qs, c_Qr, c_wd, c_mep, c_m}) {
        this.t1 = t1; this.t2 = t2; this.t3 = t3; this.t4 = t4
        this.p1 = p1; this.p2 = p2; this.p3 = p3; this.p4 = p4
        this.v1 = v1; this.v2 = v2; this.v3 = v3; this.v4 = v4
        this.c_t1 = c_t1, this.c_t2 = c_t2, this.c_t3 = c_t3, this.c_t4 = c_t4,
        this.c_p1 = c_p1, this.c_p2 = c_p2, this.c_p3 = c_p3, this.c_p4 = c_p4,
        this.c_v1 = c_v1, this.c_v2 = c_v2, this.c_v3 = c_v3, this.c_v4 = c_v4,
        this.c_Qs = c_Qs, this.c_Qr = c_Qr, this.c_wd = c_wd, this.c_mep = c_mep, this.c_m = c_m
        if ((this.v1 == '') && (this.v4 != '')) {
            this.v1 = this.v4
        }
        if ((this.v2 == '') && (this.v3 != '')) {
            this.v2 = this.v3
        }
        if ((this.v1 != '') && (this.v4 == '')) {
            this.v4 = this.v1
        }
        if ((this.v2 != '') && (this.v3 == '')) {
            this.v3 = this.v2
        }
        this.r = r; this.Qs = Qs; this.Qr = Qr; this.wd = wd; this.mep = mep
        if (m == '') {
            this.m = 1
        } else {
            this.m = m
        }
        if (efficiency == '') {
            this.efficiency = efficiency
        } else {
            this.efficiency = (efficiency / 100)
        }
        this.efficiency_percent = efficiency
        this.convert()
        this.ai_calculate()
        this.value()
    }
    R() {
        if (this.r == '') {
            if ((this.v1 != '') && (this.v2 != '')) {
                this.r = this.v1 / this.v2
                this.Efficiency()
            } else if ((this.t2 != '') && (this.t1 != '')) {
                this.r = (this.t2 / this.t1) ** (1 / (GAMMA - 1))
                this.Efficiency()
            } else if ((this.t3 != '') && (this.t4 != '')) {
                this.r = (this.t3 / this.t4) ** (1 / (GAMMA - 1))
                this.Efficiency()
            } else if ((this.p2 != '') && (this.p1 != '')) {
                this.r = (this.p2 / this.p1) ** (1 / GAMMA)
                this.Efficiency()
            } else if ((this.p3 != '') && (this.p4 != '')) {
                this.r = (this.p3 / this.p4) ** (1 / GAMMA)
                this.Efficiency()
            } else if (this.efficiency != '') {
                this.r = (1/(1-(this.efficiency_percent/100))) ** (1/(GAMMA-1))
            }
        }
    }
    T1() {
        if (this.t1 == '') {
            if ((this.p1 != '') && (this.v1 != '')) {
                this.t1 = (this.p1 * this.v1) / (this.m * RCV)
                this.T2()
                this.T4()
            } else if ((this.t4 != '') && (this.p1 != '') && (this.p4 != '')) {
                this.t1 = (this.p1 / this.p4) * this.t4
                this.T2()
                this.T4()
            } else if ((this.t2 != '') && (this.r != '')) {
                this.t1 = this.t2 / (this.r ** (GAMMA - 1))
                this.T2()
                this.T4()
            }
        }
    }
    T2() {
        if (this.t2 == '') {
            if ((this.t1 != '') && (this.r != '')) {
                this.t2 = this.t1 * (this.r ** (GAMMA - 1))
                this.T1()
            } else if ((this.t3 != '') && (this.p2 != '') && (this.p3 != '')) {
                this.t2 = (this.t3 / this.p3) * this.p2
                this.T1()
            } else if ((this.Qs != '') && (this.t3 != '')) {
                this.t2 = this.t3 - (this.Qs / (this.m * Cv))
                this.T1()
            }
        }
    }
    T3() {
        if (this.t3 == '') {
            if ((this.t4 != '') && (this.r != '')) {
                this.t3 = this.t4 * (this.r ** (GAMMA - 1))
                this.T4()
            } else if ((this.p3 != '') && (this.p2 != '') && (this.t2 != '')) {
                this.t3 = (this.p3 / this.p2) * this.t2
                this.T4()
            } else if ((this.Qs != '') && (this.t2 != '')) {
                this.t3 = (this.Qs / (this.m * Cv)) + this.t2
                this.T4()
            }
        }
    }
    T4() {
        if (this.t4 == '') {
            if ((this.p4 != '') && (this.p1 != '') && (this.t1 != '')) {
                this.t4 = (this.p4 / this.p1) * this.t1
                this.T3()
            } else if ((this.t3 != '') && (this.r != '')) {
                this.t4 = this.t3 / (this.r ** (GAMMA - 1))
                this.T3()
            }
        }
    }
    P1() {
        if (this.p1 == '') {
            if ((this.v1 != '') && (this.t1 != '')) {
                this.p1 = (this.m * RCV * this.t1) / this.v1
                this.P2()
                this.P4()
            } else if ((this.t1 != '') && (this.t4 != '') && (this.p4 != '')) {
                this.p1 = (this.t1 / this.t4) * this.p4
                this.P2()
                this.P4()
            } else if ((this.p2 != '') && (this.r != '')) {
                this.p1 = this.p2 / (this.r ** (GAMMA))
                this.P2()
                this.P4()
            }
        }
    }
    P2() {
        if (this.p2 == '') {
            if ((this.p1 != '') && (this.r != '')) {
                this.p2 = this.p1 * (this.r ** GAMMA)
                this.P1()
            } else if ((this.t2 != '') && (this.t3 != '') && (this.p3 != '')) {
                this.p2 = (this.t2 / this.t3) * this.p3
                this.P1()
            }
        }
    }
    P3() {
        if (this.p3 == '') {
            if ((this.p4 != '') && (this.r != '')) {
                this.p3 = this.p4 * (this.r ** GAMMA)
                this.P4()
            } else if ((this.t3 != '') && (this.t2 != '') && (this.p2 != '')) {
                this.p3 = (this.t3 / this.t2) * this.p2
                this.P4()
            }
        }
    }
    P4() {
        if (this.p4 == '') {
            if ((this.t4 != '') && (this.t1 != '') && (this.p1 != '')) {
                this.p4 = (this.t4 / this.t1) * this.p1
                this.P3()
            } else if ((this.p1 != '') && (this.t1 != '') && (this.t4 != '')) {
                this.p4 = (this.p1 / this.t1) * this.t4
                this.P3()
            } else if ((this.p3 != '') && (this.r != '')) {
                this.p4 = this.p3 / (this.r ** (GAMMA))
                this.P3()
            }
        }
    }
    V1() {
        if (this.v1 == '') {
            if ((this.p1 != '') && (this.t1 != '')) {
                this.v4 = this.v1 = (this.m * RCV * this.t1) / this.p1
                if (this.v2 != '') {
                    this.MEP()
                }
            }
        }
    }
    V2() {
        if (this.v2 == '') {
            if ((this.r != '') && (this.v1 != '')) {
                this.v3 = this.v2 = this.v1 / this.r
                if (this.v1 != '') {
                    this.MEP()
                }
            }
        }
    }
    QS() {
        if (this.Qs == '') {
            if ((this.t3 != '') && (this.t2 != '')) {
                this.Qs = this.m * Cv * (this.t3 - this.t2)
                this.WD()
            }
        }
    }
    QR() {
        if (this.Qr == '') {
            if ((this.t4 != '') && (this.t1 != '')) {
                this.Qr = this.m * Cv * (this.t4 - this.t1)
            }
        }
    }
    WD() {
        if (this.wd == '') {
            if ((this.efficiency != '') && (this.Qs != '')) {
                this.wd = this.efficiency * this.Qs
                this.MEP()
            }
        }
    }
    MEP() {
        if (this.mep == '') {
            if ((this.wd != '') && (this.v1 != '') && (this.v2 != '')) {
                this.mep = this.wd / (this.v1 - this.v2)
            }
        }
    }
    Efficiency() {
        if (this.efficiency == '') {
            if (this.r != '') {
                this.efficiency = 1 - (1 / (this.r ** (GAMMA - 1)))
                this.efficiency_percent = this.efficiency * 100
                if ((this.Qs != '') && (this.wd != '')) {
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
            if ((this[key] != "") && (!key.startsWith("c_"))) {
                this[key] = parseFloat(this[key])
            }
        }
        for (var key in this) {
            if (this[key] == "c") {
                this[key.slice(2)] = this[key.slice(2)] + 273.15
            }
            if (this[key] == "mpa") {
                this[key.slice(2)] = this[key.slice(2)] * 1000
            }
            if (this[key] == "bar") {
                this[key.slice(2)] = this[key.slice(2)] * 100
            }
        }
    }
    value() {
        for (var key in this) {
            if (this[key] == "") {
                this[key] = "-"
            } else {
                if (key.startsWith('p') || key.startsWith('mep')) {
                    this[key] = `${this[key].toFixed(2)} k Pa`
                } else if (key.startsWith('t')) {
                    this[key] = `${this[key].toFixed(2)} K`
                } else if (key.startsWith('v')) {
                    this[key] = `${this[key].toFixed(2)} m³`
                } else if (key.startsWith('Q') || key.startsWith('wd') ) {
                    this[key] = `${this[key].toFixed(2)} kJ/kg`
                } else if (key.startsWith('efficiency') ) {
                    this[key] = `${this[key].toFixed(2)} %`
                } else if (key.startsWith('r') ) {
                    this[key] = `${this[key].toFixed(2)}`
                }

            }
        }
    }
}
export default function OttoSolvingPage(res) {
    function Table({name, value}) {
        return (
            <tr>
                <th className="full-problem-solved full-problem-solved-left">{name}</th>
                <th className="full-problem-solved full-problem-solved-right">{value}</th>
            </tr>
        );
    }
    console.log(res)
    let otto = new Otto(res.searchParams)
    return (
    <div className='mainframe'>
        <div className='combined-headline'>
            <a className="headline head-glow underline" href='/'>Thermodynamics</a> <span className='headline-2 head-glow'>|</span> <a className="headline-2 head-glow underline" href='/unit4'>Unit 4</a>
        </div>
        <span className="headline-2 head-glow">Solved Otto Cycle Problem</span>
        <table className="full-problem-box">
            <tbody>
                <Table name="R" value={(otto.r)} />
                <Table name="Efficiency" value={(otto.efficiency_percent)} />
            </tbody>
        </table>
        <table className="full-problem-box">
            <tbody>
                <Table name="T1" value={(otto.t1)} />
                <Table name="T2" value={(otto.t2)} />
                <Table name="T3" value={(otto.t3)} />
                <Table name="T4" value={(otto.t4)} />
            </tbody>
        </table>
        <table className="full-problem-box">
            <tbody>
                <Table name="P1" value={(otto.p1)} />
                <Table name="P2" value={(otto.p2)} />
                <Table name="P3" value={(otto.p3)} />
                <Table name="P4" value={(otto.p4)} />
            </tbody>
        </table>
        <table className="full-problem-box">
            <tbody>
                <Table name="V1" value={(otto.v1)} />
                <Table name="V2" value={(otto.v2)} />
                <Table name="V3" value={(otto.v3)} />
                <Table name="V4" value={(otto.v4)} />
            </tbody>
        </table>
        <table className="full-problem-box">
            <tbody>
                <Table name="Qs" value={(otto.Qs)} />
                <Table name="Qr" value={(otto.Qr)} />
            </tbody>
        </table>
        <table className="full-problem-box">
            <tbody>
                <Table name="M" value={(otto.m)} />
                <Table name="W.D" value={(otto.wd)} />
                <Table name="M.E.P" value={(otto.mep)} />
            </tbody>
        </table>
        <a className="button" href="/unit4/otto">Go Back</a>
    </div>
    );
}