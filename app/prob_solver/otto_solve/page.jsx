export default function OttoSolvingPage() {
    function Table({name, value}) {
        return (
            <tr>
                <th className="full-problem-solved full-problem-solved-left">{name}</th>
                <th className="full-problem-solved full-problem-solved-right">{value}</th>
            </tr>
        );
    }
    let otto = {}
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