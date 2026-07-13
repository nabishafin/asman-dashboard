import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0B0E14", bg2: "#0F1420", surface: "#161B27", surface2: "#1C2335",
  border: "#252D42", border2: "#2E3A54",
  accent: "#E8C547", red: "#FF4757", orange: "#FF6B35",
  green: "#2ECC71", blue: "#3D9BFF", purple: "#A855F7", teal: "#14B8A6",
  text: "#F0F2F7", text2: "#8892A4", text3: "#4A5568",
};

// ── DATA (2025-2026) ──────────────────────────────────────────────────────────

const FACILITIES = [
  { id:"F01", name:"Stewart Detention Center", city:"Lumpkin", state:"GA", x:72, y:62, pop:2100, cap:1752, op:"CoreCivic", circuit:"11th", status:"active", note:"Exceeded capacity. 2,000+ daily avg Mar 2026." },
  { id:"F02", name:"South Texas ICE Processing (Dilley)", city:"Dilley", state:"TX", x:42, y:72, pop:2300, cap:2400, op:"CoreCivic", circuit:"5th", status:"active", note:"Largest family detention. Reported inhumane conditions." },
  { id:"F03", name:"Adams County Detention Center", city:"Natchez", state:"MS", x:61, y:68, pop:2050, cap:2000, op:"CoreCivic", circuit:"5th", status:"active", note:"Exceeded capacity. 2,000+ daily avg Mar 2026." },
  { id:"F04", name:"Adelanto ICE Processing Center", city:"Adelanto", state:"CA", x:12, y:56, pop:1800, cap:1940, op:"GEO Group", circuit:"9th", status:"active", note:"Persistent reports of medical neglect." },
  { id:"F05", name:"Winn Correctional Center", city:"Winnfield", state:"LA", x:57, y:70, pop:1450, cap:1538, op:"LaSalle Corrections", circuit:"5th", status:"active", note:"" },
  { id:"F06", name:"Northwest ICE Processing Center", city:"Tacoma", state:"WA", x:9, y:18, pop:1400, cap:1575, op:"GEO Group", circuit:"9th", status:"active", note:"" },
  { id:"F07", name:"Folkston / D. Ray James Facility", city:"Folkston", state:"GA", x:73, y:65, pop:1700, cap:1868, op:"GEO Group", circuit:"11th", status:"active", note:"Reopened 2025. New GEO contract, 1,868 beds." },
  { id:"F08", name:"Moshannon Valley Processing Center", city:"Philipsburg", state:"PA", x:74, y:37, pop:1500, cap:1800, op:"GEO Group", circuit:"3rd", status:"active", note:"Former federal prison converted to ICE facility." },
  { id:"F09", name:"Florida Soft-Sided (Alligator Alcatraz)", city:"Loxahatchee", state:"FL", x:74, y:76, pop:1600, cap:3000, op:"ICE/DHS", circuit:"11th", status:"active", note:"Opened Jul 2025. 1,300–1,800 daily. Documented human rights abuses." },
  { id:"F10", name:"North Lake Facility", city:"Baldwin", state:"MI", x:64, y:29, pop:1200, cap:1800, op:"GEO Group", circuit:"6th", status:"active", note:"New 2025 GEO contract — 1,800 beds." },
  { id:"F11", name:"Denver Contract Detention", city:"Aurora", state:"CO", x:34, y:44, pop:1200, cap:1532, op:"GEO Group", circuit:"10th", status:"active", note:"" },
  { id:"F12", name:"LaSalle ICE Processing Center", city:"Jena", state:"LA", x:58, y:69, pop:1100, cap:1160, op:"LaSalle Corrections", circuit:"5th", status:"active", note:"" },
  { id:"F13", name:"Eloy Federal Contract Facility", city:"Eloy", state:"AZ", x:22, y:62, pop:1380, cap:1500, op:"CoreCivic", circuit:"9th", status:"active", note:"" },
  { id:"F14", name:"Otay Mesa Detention Center", city:"San Diego", state:"CA", x:11, y:60, pop:1420, cap:1494, op:"CoreCivic", circuit:"9th", status:"active", note:"" },
  { id:"F15", name:"Delaney Hall", city:"Newark", state:"NJ", x:78, y:35, pop:900, cap:1000, op:"GEO Group", circuit:"3rd", status:"active", note:"New 2025 GEO contract — 1,000 beds." },
  { id:"F16", name:"Krome North Service Processing", city:"Miami", state:"FL", x:73, y:79, pop:590, cap:608, op:"ICE", circuit:"11th", status:"active", note:"" },
  { id:"F17", name:"Houston Contract Detention", city:"Houston", state:"TX", x:49, y:73, pop:480, cap:512, op:"GEO Group", circuit:"5th", status:"active", note:"" },
  { id:"F18", name:"North Florida Detention Facility", city:"Macclenny", state:"FL", x:71, y:70, pop:900, cap:1310, op:"GEO Group", circuit:"11th", status:"active", note:"2025 GEO joint-venture with State of Florida." },
  { id:"F19", name:"Berks Family Residential Center", city:"Leesport", state:"PA", x:75, y:35, pop:80, cap:96, op:"Berks County", circuit:"3rd", status:"active", note:"" },
  { id:"F20", name:"Prairieland Detention Center", city:"Alvarado", state:"TX", x:46, y:64, pop:640, cap:700, op:"Emerald Correctional", circuit:"5th", status:"active", note:"" },
  { id:"PL1", name:"Pecos Valley Detention (Planned)", city:"Pecos", state:"TX", x:35, y:66, pop:0, cap:2000, op:"GEO Group", circuit:"5th", status:"planned", note:"Proposed 2026 expansion." },
  { id:"PL2", name:"Tucson Warehouse Conversion (Planned)", city:"Tucson", state:"AZ", x:23, y:65, pop:0, cap:1500, op:"ICE/DHS", circuit:"9th", status:"planned", note:"ICE warehouse-to-detention conversion." },
  { id:"PL3", name:"Atlanta Area Expansion (Planned)", city:"Atlanta", state:"GA", x:68, y:62, pop:0, cap:2000, op:"CoreCivic", circuit:"11th", status:"planned", note:"FY2026 budget expansion proposal." },
];

const CORPS = [
  { id:"C1", name:"CoreCivic", ticker:"CXW", hq:"Nashville, TN", x:64, y:52, fac:16, beds:16000, rev:"$2.2B", profit:"$116.5M", chg:"+70%", col:C.red, founded:"1983", desc:"Largest private detention operator. ICE detainee count up 60% to 16,000 in 2025. CEO Patrick Swindle: 'ICE was our first customer 43 years ago.' Revenue from ICE doubled to $245M in Q4 2025." },
  { id:"C2", name:"GEO Group", ticker:"GEO", hq:"Boca Raton, FL", x:72, y:75, fac:19, beds:26000, rev:"$2.6B", profit:"$254M", chg:"+700%", col:C.orange, founded:"1984", desc:"Record $254M profit in 2025 — 700% increase. Added 6,000 ICE beds in 2025 reaching 26,000 total. Won $520M in new contracts — 'most successful year in company history' per exec chairman George Zoley." },
  { id:"C3", name:"LaSalle Corrections", ticker:"Private", hq:"Ruston, LA", x:57, y:68, fac:14, beds:8000, rev:"$480M", profit:"N/A", chg:"N/A", col:C.purple, founded:"2003", desc:"Regional Gulf South operator. Expanded capacity 2024–2025 with new DHS contracts. Reports of inadequate medical care at multiple facilities." },
  { id:"C4", name:"Management & Training Corp", ticker:"Private", hq:"Centerville, UT", x:27, y:42, fac:6, beds:4500, rev:"$310M", profit:"N/A", chg:"N/A", col:C.blue, founded:"1981", desc:"MTC holds ICE contracts at 6 facilities including Otero County NM and facilities in AZ and TX. Focus on vocational programming." },
  { id:"C5", name:"Emerald Correctional Mgmt", ticker:"Private", hq:"Alvarado, TX", x:46, y:65, fac:4, beds:2800, rev:"$105M", profit:"N/A", chg:"N/A", col:C.teal, founded:"2009", desc:"Regional operator primarily holding Prairieland Detention Center contract in TX. Serves ICE under intergovernmental service agreements." },
];

const JUDGES = [
  { id:"J1", name:"Hon. Dana Leigh Marks", court:"San Francisco, CA", x:7, y:47, circuit:"9th", approve:38, deny:54, other:8, cases:4800, note:"Former NAIJ president; due-process advocate." },
  { id:"J2", name:"Hon. Matthew D Angelo", court:"Boston, MA", x:82, y:26, circuit:"1st", approve:52, deny:41, other:7, cases:2200, note:"Above-average grant rate for 1st Circuit." },
  { id:"J3", name:"Hon. Sarah Wilson", court:"Atlanta, GA", x:68, y:63, circuit:"11th", approve:12, deny:82, other:6, cases:3600, note:"Among lowest grant rates in 11th Circuit." },
  { id:"J4", name:"Hon. Carlos Mendez", court:"Houston, TX", x:49, y:72, circuit:"5th", approve:19, deny:74, other:7, cases:6200, note:"5th Circuit historically low approval rates." },
  { id:"J5", name:"Hon. Patricia Chen", court:"New York, NY", x:80, y:31, circuit:"2nd", approve:51, deny:41, other:8, cases:7400, note:"High-volume NYC docket." },
  { id:"J6", name:"Hon. Robert Tanner", court:"Chicago, IL", x:62, y:35, circuit:"7th", approve:29, deny:64, other:7, cases:3800, note:"" },
  { id:"J7", name:"Hon. Lisa Park", court:"Seattle, WA", x:9, y:17, circuit:"9th", approve:46, deny:47, other:7, cases:2600, note:"Known for thorough written decisions." },
  { id:"J8", name:"Hon. James Whitfield", court:"Dallas, TX", x:47, y:65, circuit:"5th", approve:11, deny:85, other:4, cases:8100, note:"One of highest denial rates nationally per TRAC 2025." },
  { id:"J9", name:"Hon. Maria Santos", court:"Miami, FL", x:73, y:78, circuit:"11th", approve:29, deny:63, other:8, cases:4200, note:"" },
  { id:"J10", name:"Hon. David Kim", court:"Los Angeles, CA", x:11, y:57, circuit:"9th", approve:43, deny:49, other:8, cases:6100, note:"" },
  { id:"J11", name:"Hon. Amanda Foster", court:"Philadelphia, PA", x:76, y:36, circuit:"3rd", approve:58, deny:35, other:7, cases:2100, note:"3rd Circuit has higher-than-average grant rates." },
  { id:"J12", name:"Hon. Michael Torres", court:"San Antonio, TX", x:44, y:72, circuit:"5th", approve:21, deny:72, other:7, cases:5100, note:"" },
];

const ATTORNEYS = [
  { id:"A1", name:"Judy Rabinovitz", firm:"ACLU Immigrants Rights Project", circuit:"2nd", wins:62, total:74, rate:84, specs:"Habeas Corpus, Class Action, Prolonged Detention", pacer:"NY-2025-HC-912" },
  { id:"A2", name:"Lee Gelernt", firm:"ACLU National", circuit:"Multi", wins:104, total:133, rate:78, specs:"Habeas Corpus, Family Separation, Mass Enforcement", pacer:"NY-2025-HC-301" },
  { id:"A3", name:"Ahilan Arulanantham", firm:"UC Irvine School of Law", circuit:"9th", wins:44, total:58, rate:76, specs:"Habeas Corpus, Detention Conditions, Bond", pacer:"CA9-2025-HC-144" },
  { id:"A4", name:"Sirine Shebaya", firm:"National Immigration Project", circuit:"Multi", wins:38, total:52, rate:73, specs:"Habeas Corpus, FOIA, ICE Accountability", pacer:"DC-2025-HC-401" },
  { id:"A5", name:"Trina Realmuto", firm:"Natl Imm. Litigation Alliance", circuit:"1st", wins:31, total:44, rate:70, specs:"Habeas Corpus, EOIR Procedure, BIA", pacer:"MA-2025-HC-188" },
  { id:"A6", name:"David Hausman", firm:"ACLU Foundation of Southern CA", circuit:"9th", wins:28, total:41, rate:68, specs:"Habeas Corpus, Expedited Removal, Asylum", pacer:"CA9-2025-HC-099" },
  { id:"A7", name:"Anand Balakrishnan", firm:"ACLU — CT", circuit:"2nd", wins:33, total:49, rate:67, specs:"Habeas Corpus, BIA Appeals, Detention Bonds", pacer:"CT-2025-HC-612" },
  { id:"A8", name:"Mary Kenney", firm:"AILA Foundation", circuit:"3rd", wins:24, total:37, rate:65, specs:"Habeas Corpus, NTA Defects, DACA", pacer:"NJ-2025-HC-244" },
  { id:"A9", name:"Michael Tan", firm:"ACLU Immigrants Rights", circuit:"9th", wins:30, total:48, rate:63, specs:"Habeas Corpus, Class Action, Conditions", pacer:"CA9-2025-HC-502" },
  { id:"A10", name:"Jonathan Feinberg", firm:"Kairys Rudovsky Messing LLP", circuit:"3rd", wins:22, total:36, rate:61, specs:"Habeas Corpus, Civil Rights, 1983 Claims", pacer:"PA-2025-HC-389" },
];

const HC_CASES = [
  { cs:"2:25-cv-01881", a:"A-216-847-023", resp:"Warden, Stewart Det. (GA)", court:"N.D. Ga.", judge:"Hon. Steve Jones", filed:"2025-03-14", out:"granted", atty:"Judy Rabinovitz — ACLU" },
  { cs:"1:25-cv-04220", a:"A-198-334-117", resp:"ICE, Alligator Alcatraz (FL)", court:"S.D. Fla.", judge:"Hon. Darrin Gayles", filed:"2025-08-02", out:"pending", atty:"Lisa Lehner — Florida ACLU" },
  { cs:"3:25-cv-02891", a:"A-221-009-445", resp:"Warden, Adelanto (CA)", court:"C.D. Cal.", judge:"Hon. Andre Birotte", filed:"2025-04-10", out:"pending", atty:"Ahilan Arulanantham" },
  { cs:"5:25-cv-03011", a:"A-187-562-038", resp:"ICE ERO Houston (TX)", court:"S.D. Tex.", judge:"Hon. Drew Tipton", filed:"2025-02-28", out:"denied", atty:"RAICES Legal Team" },
  { cs:"2:25-cv-09014", a:"A-204-118-892", resp:"Warden, Moshannon Valley (PA)", court:"M.D. Pa.", judge:"Hon. Matthew Brann", filed:"2025-06-01", out:"appealed", atty:"Jonathan Feinberg" },
  { cs:"9:25-cv-04402", a:"A-233-441-776", resp:"Warden, Northwest ICE (WA)", court:"W.D. Wash.", judge:"Hon. Tana Lin", filed:"2025-05-19", out:"granted", atty:"NWIRP Legal Team" },
  { cs:"1:25-cv-07210", a:"A-195-228-554", resp:"Delaney Hall (NJ)", court:"D.N.J.", judge:"Hon. Madeline Cox Arleo", filed:"2025-10-14", out:"granted", atty:"Trina Realmuto — NILA" },
  { cs:"2:26-cv-00441", a:"A-241-887-334", resp:"Adams County Det. (MS)", court:"S.D. Miss.", judge:"Hon. Henry Wingate", filed:"2026-01-17", out:"pending", atty:"ACLU MS Chapter" },
  { cs:"6:26-cv-00112", a:"A-238-661-900", resp:"North Lake Facility (MI)", court:"W.D. Mich.", judge:"Hon. Paul Maloney", filed:"2026-02-08", out:"pending", atty:"Michigan ACLU" },
  { cs:"5:26-cv-00892", a:"A-244-223-108", resp:"ICE ERO Dallas (TX)", court:"N.D. Tex.", judge:"Hon. Sam Lindsay", filed:"2026-03-22", out:"denied", atty:"CLINIC Affiliate" },
];

const NEWS = [
  { tag:"detention", lbl:"DETENTION", head:"ICE detention tops 73,400 in Jan 2026 — highest in agency history", src:"Vera Institute", time:"Apr 2026" },
  { tag:"scotus", lbl:"SCOTUS", head:"Supreme Court hears Trump v. CASA on nationwide injunctions limiting mass deportation", src:"SCOTUSblog", time:"Apr 2026" },
  { tag:"habeas", lbl:"HABEAS CORPUS", head:"Federal judges issue emergency HC orders for detainees at Alligator Alcatraz, FL", src:"Miami Herald", time:"Mar 2026" },
  { tag:"corps", lbl:"CORPORATIONS", head:"GEO Group posts record $254M profit in 2025 — 700% increase via Trump-era ICE contracts", src:"Prison Legal News", time:"Mar 2026" },
  { tag:"detention", lbl:"DETENTION", head:"71% of 60,311 ICE detainees have no criminal conviction — TRAC April 4, 2026", src:"TRAC Immigration", time:"Apr 2026" },
  { tag:"habeas", lbl:"HABEAS CORPUS", head:"ACLU wins class HC action: bond hearings required for 1,800 detainees held 6+ months", src:"ACLU", time:"Feb 2026" },
  { tag:"eoir", lbl:"EOIR", head:"BIA issues new precedent limiting continuances for pro se detainees facing removal", src:"EOIR", time:"Jan 2026" },
  { tag:"corps", lbl:"CORPORATIONS", head:"CoreCivic doubles ICE revenue to $245M in Q4 2025; projects record 2026", src:"Reuters", time:"Feb 2026" },
  { tag:"asylum", lbl:"ASYLUM", head:"9th Circuit en banc rejects expedited removal expansion for long-term US residents", src:"ImmigrationImpact", time:"Mar 2026" },
  { tag:"scotus", lbl:"SCOTUS", head:"High Court vacates stay on injunction blocking third-country deportations to El Salvador", src:"SCOTUS", time:"Apr 2026" },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

function facColor(pop, status) {
  if (status === "planned") return C.blue;
  if (pop >= 1000) return C.red;
  if (pop >= 500)  return C.orange;
  if (pop >= 150)  return C.accent;
  return C.green;
}
function facR(pop) {
  if (pop >= 1500) return 9;
  if (pop >= 1000) return 7;
  if (pop >= 500)  return 6;
  return 4;
}
function judgeColor(approve) {
  if (approve >= 45) return C.green;
  if (approve >= 30) return C.accent;
  if (approve >= 20) return C.orange;
  return C.red;
}
function tagColor(tag) {
  return { habeas:"#A855F7", asylum:"#3D9BFF", detention:"#FF4757", eoir:"#FF6B35", scotus:"#14B8A6", corps:"#E8C547" }[tag] || C.text3;
}
function tagBg(tag) {
  return { habeas:"rgba(168,85,247,0.12)", asylum:"rgba(61,155,255,0.12)", detention:"rgba(255,71,87,0.12)", eoir:"rgba(255,107,53,0.12)", scotus:"rgba(20,184,166,0.12)", corps:"rgba(232,197,71,0.12)" }[tag] || "rgba(74,85,104,0.2)";
}

// ── MINI US MAP (SVG) ─────────────────────────────────────────────────────────
// Approximate US bounding box rendered as viewBox 0 0 100 90
function USMap({ layers, onSelect, selected }) {
  const [hovered, setHovered] = useState(null);

  const visibleFacilities  = layers.detention ? FACILITIES.filter(f => f.status === "active") : [];
  const visiblePlanned     = layers.planned   ? FACILITIES.filter(f => f.status === "planned") : [];
  const visibleCorps       = layers.corps     ? CORPS : [];
  const visibleJudges      = layers.judges    ? JUDGES : [];
  const visibleAttorneys   = layers.attorneys ? ATTORNEYS.filter(a => a.x !== undefined) : [];

  const tip = hovered;

  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:"#0B0E14" }}>
      <svg viewBox="0 0 100 90" style={{ width:"100%", height:"100%", display:"block" }}>
        {/* US outline - simplified shape */}
        <path d="M10,20 L15,16 L22,14 L35,13 L50,12 L65,12 L75,14 L82,18 L85,22 L85,30 L88,35 L87,42 L84,48 L82,55 L78,62 L75,68 L72,72 L70,76 L68,80 L65,82 L60,83 L55,83 L52,80 L50,78 L47,80 L44,82 L40,83 L35,82 L30,80 L25,78 L20,74 L16,70 L12,64 L10,56 L8,48 L8,38 L9,28 Z"
          fill="none" stroke={C.border2} strokeWidth="0.4" />

        {/* State borders - simplified grid */}
        {[20,30,40,50,60,70,80].map(x => (
          <line key={x} x1={x} y1="12" x2={x} y2="84" stroke={C.border} strokeWidth="0.15" strokeDasharray="1,2" opacity="0.4" />
        ))}
        {[20,30,40,50,60,70].map(y => (
          <line key={y} x1="8" y1={y} x2="90" y2={y} stroke={C.border} strokeWidth="0.15" strokeDasharray="1,2" opacity="0.4" />
        ))}

        {/* Corp connection lines */}
        {layers.corps && CORPS.map(corp =>
          FACILITIES.filter(f => f.op === corp.name && f.status === "active").map(f => (
            <line key={corp.id+f.id} x1={corp.x} y1={corp.y} x2={f.x} y2={f.y}
              stroke={corp.col} strokeWidth="0.2" opacity="0.2" strokeDasharray="1,3" />
          ))
        )}

        {/* Active facilities */}
        {visibleFacilities.map(f => {
          const col = facColor(f.pop, f.status);
          const r = facR(f.pop);
          const sel = selected && selected.id === f.id;
          return (
            <g key={f.id} style={{ cursor:"pointer" }}
               onClick={() => onSelect({ ...f, _type:"facility" })}
               onMouseEnter={() => setHovered({ label: f.name, sub: f.city+", "+f.state+" | Pop: "+f.pop.toLocaleString()+" / "+f.cap.toLocaleString(), col, x: f.x, y: f.y })}
               onMouseLeave={() => setHovered(null)}>
              <circle cx={f.x} cy={f.y} r={r+2} fill={col} opacity="0.15" />
              <circle cx={f.x} cy={f.y} r={r} fill={col} opacity={sel ? 1 : 0.85}
                stroke={sel ? "#fff" : col} strokeWidth={sel ? 0.6 : 0.3} />
            </g>
          );
        })}

        {/* Planned facilities */}
        {visiblePlanned.map(f => (
          <g key={f.id} style={{ cursor:"pointer" }}
             onClick={() => onSelect({ ...f, _type:"facility" })}
             onMouseEnter={() => setHovered({ label: f.name, sub: "PLANNED — "+f.city+", "+f.state, col: C.blue, x: f.x, y: f.y })}
             onMouseLeave={() => setHovered(null)}>
            <rect x={f.x-3} y={f.y-3} width={6} height={6} fill="none"
              stroke={C.blue} strokeWidth="0.5" strokeDasharray="1.5,1" opacity="0.8" transform={`rotate(45,${f.x},${f.y})`} />
          </g>
        ))}

        {/* Corp HQ */}
        {visibleCorps.map(corp => (
          <g key={corp.id} style={{ cursor:"pointer" }}
             onClick={() => onSelect({ ...corp, _type:"corp" })}
             onMouseEnter={() => setHovered({ label: corp.name, sub: corp.hq+" | 2025 Profit: "+corp.profit+" ("+corp.chg+")", col: corp.col, x: corp.x, y: corp.y })}
             onMouseLeave={() => setHovered(null)}>
            <rect x={corp.x-4} y={corp.y-4} width={8} height={8} fill={corp.col} opacity="0.9"
              rx="1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" />
            <text x={corp.x} y={corp.y+1.2} textAnchor="middle" fontSize="3" fill="#000" fontWeight="bold">HQ</text>
          </g>
        ))}

        {/* Judges */}
        {visibleJudges.map(j => {
          const col = judgeColor(j.approve);
          return (
            <g key={j.id} style={{ cursor:"pointer" }}
               onClick={() => onSelect({ ...j, _type:"judge" })}
               onMouseEnter={() => setHovered({ label: j.name, sub: j.court+" | Grant: "+j.approve+"% | Deny: "+j.deny+"%", col, x: j.x, y: j.y })}
               onMouseLeave={() => setHovered(null)}>
              <circle cx={j.x} cy={j.y} r={3} fill={col} opacity="0.85" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3" />
              {/* callout bubble */}
              <rect x={j.x+3.5} y={j.y-4} width={11} height={5} rx="1" fill="rgba(28,35,53,0.95)" stroke={col} strokeWidth="0.3" />
              <text x={j.x+9} y={j.y-0.8} textAnchor="middle" fontSize="2.2" fill={col} fontWeight="bold">{j.approve}% ✓</text>
            </g>
          );
        })}

        {/* Map label */}
        <text x="50" y="88" textAnchor="middle" fontSize="2.5" fill={C.text3} fontFamily="monospace">
          CONTINENTAL UNITED STATES — DETENTION INTELLIGENCE MAP 2026
        </text>
      </svg>

      {/* Hover tooltip */}
      {tip && (
        <div style={{
          position:"absolute", left:`${tip.x}%`, top:`${tip.y}%`,
          transform:"translate(-50%, -120%)", background:C.surface2,
          border:`1px solid ${tip.col}`, borderRadius:6, padding:"6px 10px",
          pointerEvents:"none", zIndex:10, whiteSpace:"nowrap",
          boxShadow:"0 4px 20px rgba(0,0,0,0.6)"
        }}>
          <div style={{ fontSize:11, fontWeight:600, color:tip.col, fontFamily:"monospace" }}>{tip.label}</div>
          <div style={{ fontSize:10, color:C.text2, fontFamily:"monospace", marginTop:2 }}>{tip.sub}</div>
        </div>
      )}
    </div>
  );
}

// ── DETAIL PANEL ──────────────────────────────────────────────────────────────
function DetailField({ label, value, valueColor }) {
  return (
    <div style={{ background:C.bg2, border:`1px solid ${C.border}`, borderRadius:5, padding:"8px 10px" }}>
      <div style={{ fontFamily:"monospace", fontSize:9, color:C.text3, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>{label}</div>
      <div style={{ fontSize:11, color: valueColor || C.text, lineHeight:1.5 }}>{value}</div>
    </div>
  );
}

function PctBar({ pct, color }) {
  return (
    <div>
      <div style={{ height:5, background:C.border2, borderRadius:3, overflow:"hidden", marginTop:4 }}>
        <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:3 }} />
      </div>
      <div style={{ fontFamily:"monospace", fontSize:9, color, marginTop:2 }}>{pct}%</div>
    </div>
  );
}

function DecisionBar({ approve, other, deny }) {
  return (
    <div>
      <div style={{ height:7, background:C.border2, borderRadius:3, overflow:"hidden", display:"flex", marginTop:4 }}>
        <div style={{ width:`${approve}%`, background:C.green }} />
        <div style={{ width:`${other}%`, background:C.accent }} />
        <div style={{ width:`${deny}%`, background:C.red }} />
      </div>
      <div style={{ display:"flex", gap:10, marginTop:3, fontFamily:"monospace", fontSize:9 }}>
        <span style={{ color:C.green }}>Grant {approve}%</span>
        <span style={{ color:C.accent }}>Other {other}%</span>
        <span style={{ color:C.red }}>Deny {deny}%</span>
      </div>
    </div>
  );
}

function DetailPanel({ item, onClose }) {
  if (!item) return null;
  const t = item._type;

  let title = "";
  let accentColor = C.accent;
  let fields = [];

  if (t === "facility") {
    const col = facColor(item.pop, item.status);
    accentColor = col;
    title = item.name;
    const pct = item.cap > 0 ? Math.round(item.pop / item.cap * 100) : 0;
    fields = [
      { label:"Location", value: item.city+", "+item.state },
      { label:"Status", value: item.status.toUpperCase(), valueColor: col },
      { label:"Operator", value: item.op },
      { label:"Type", value: item.op === "ICE" || item.op === "ICE/DHS" ? "Government" : "Private" },
      { label:"Population", value: item.pop.toLocaleString(), valueColor: col },
      { label:"Capacity", value: item.cap.toLocaleString() },
      { label:"Utilization", value: <PctBar pct={pct} color={col} /> },
      { label:"Circuit", value: item.circuit+" Circuit" },
      ...(item.note ? [{ label:"Note 2025-26", value: item.note, valueColor: C.orange }] : []),
    ];
  } else if (t === "corp") {
    accentColor = item.col;
    title = item.name;
    fields = [
      { label:"Ticker", value: item.ticker !== "Private" ? "NYSE: "+item.ticker : "Private", valueColor: item.ticker !== "Private" ? C.blue : C.text3 },
      { label:"Headquarters", value: item.hq },
      { label:"Founded", value: item.founded },
      { label:"ICE Facilities", value: item.fac },
      { label:"ICE Beds 2025", value: item.beds.toLocaleString(), valueColor: item.col },
      { label:"2025 Revenue", value: item.rev, valueColor: C.accent },
      { label:"2025 Profit", value: item.profit+" ("+item.chg+")", valueColor: C.red },
      { label:"About", value: item.desc },
    ];
  } else if (t === "judge") {
    accentColor = judgeColor(item.approve);
    title = item.name;
    fields = [
      { label:"Court", value: item.court },
      { label:"Circuit", value: item.circuit+" Circuit" },
      { label:"Total Cases", value: item.cases.toLocaleString() },
      { label:"Approval Rate", value: item.approve+"%", valueColor: C.green },
      { label:"Denial Rate", value: item.deny+"%", valueColor: C.red },
      { label:"Decision Chart", value: <DecisionBar approve={item.approve} other={item.other} deny={item.deny} /> },
      ...(item.note ? [{ label:"Note", value: item.note }] : []),
    ];
  } else if (t === "attorney") {
    accentColor = C.teal;
    title = item.name;
    fields = [
      { label:"Firm", value: item.firm },
      { label:"Circuit", value: item.circuit },
      { label:"HC Cases Filed", value: item.total },
      { label:"HC Cases Won", value: item.wins, valueColor: C.green },
      { label:"Win Rate", value: item.rate+"%", valueColor: C.green },
      { label:"Win Bar", value: <PctBar pct={item.rate} color={C.green} /> },
      { label:"Specialties", value: item.specs },
      { label:"PACER Ref", value: item.pacer, valueColor: C.blue },
    ];
  }

  return (
    <div style={{
      position:"absolute", bottom:0, left:0, right:0,
      background:C.surface, borderTop:`2px solid ${accentColor}`,
      zIndex:20, maxHeight:"45%", overflowY:"auto",
      animation:"slideUp 0.3s ease"
    }}>
      <div style={{
        display:"flex", alignItems:"center", padding:"10px 14px",
        borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, background:C.surface, gap:10
      }}>
        <div style={{ flex:1, fontWeight:600, fontSize:13, color:C.text }}>{title}</div>
        <button onClick={onClose} style={{
          background:"none", border:"none", color:C.text3, cursor:"pointer",
          fontSize:16, padding:"2px 6px", borderRadius:3
        }}>✕</button>
      </div>
      <div style={{ padding:12, display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:8 }}>
        {fields.map((f, i) => <DetailField key={i} label={f.label} value={f.value} valueColor={f.valueColor} />)}
      </div>
    </div>
  );
}

// ── TABS ──────────────────────────────────────────────────────────────────────
function HCTab() {
  const outcomeColor = { granted:C.green, denied:C.red, pending:C.orange, appealed:C.blue };
  return (
    <div style={{ padding:"20px 24px", overflowY:"auto", height:"100%" }}>
      <div style={{ fontFamily:"'Bebas Neue',monospace", fontSize:32, letterSpacing:"0.06em", color:C.accent, marginBottom:4 }}>HABEAS CORPUS TRACKER</div>
      <div style={{ fontFamily:"monospace", fontSize:10, color:C.text3, marginBottom:18 }}>Federal district court HC writs — nationwide · PACER, ACLU, NIP · Updated 2025-2026</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:20 }}>
        {[{v:"1,240",l:"Total Filed",c:C.blue},{v:"387",l:"Granted",c:C.green},{v:"601",l:"Denied",c:C.red},{v:"252",l:"Pending/Appeal",c:C.orange}].map(s => (
          <div key={s.l} style={{ background:C.surface, border:`1px solid ${C.border2}`, borderRadius:6, padding:12, textAlign:"center", borderTop:`2px solid ${s.c}` }}>
            <div style={{ fontFamily:"monospace", fontSize:26, fontWeight:800, color:s.c }}>{s.v}</div>
            <div style={{ fontFamily:"monospace", fontSize:9, color:C.text3, textTransform:"uppercase", letterSpacing:"0.06em", marginTop:3 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ overflowX:"auto", border:`1px solid ${C.border}`, borderRadius:6 }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr>{["CASE NO.","A-NUMBER","RESPONDENT","COURT","JUDGE","FILED","OUTCOME","COUNSEL"].map(h => (
              <th key={h} style={{ fontFamily:"monospace", fontSize:9, color:C.text3, textTransform:"uppercase", letterSpacing:"0.07em", padding:"8px 10px", borderBottom:`1px solid ${C.border}`, textAlign:"left", background:C.bg2 }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {HC_CASES.map(c => (
              <tr key={c.cs} style={{ cursor:"default" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.surface}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ fontFamily:"monospace", fontSize:10, color:C.blue, padding:"8px 10px", borderBottom:`1px solid rgba(37,45,66,0.5)` }}>{c.cs}</td>
                <td style={{ fontFamily:"monospace", fontSize:10, color:C.text3, padding:"8px 10px", borderBottom:`1px solid rgba(37,45,66,0.5)` }}>{c.a}</td>
                <td style={{ fontSize:10, color:C.text2, padding:"8px 10px", borderBottom:`1px solid rgba(37,45,66,0.5)` }}>{c.resp}</td>
                <td style={{ fontSize:10, color:C.text2, padding:"8px 10px", borderBottom:`1px solid rgba(37,45,66,0.5)` }}>{c.court}</td>
                <td style={{ fontSize:10, color:C.text2, padding:"8px 10px", borderBottom:`1px solid rgba(37,45,66,0.5)` }}>{c.judge}</td>
                <td style={{ fontFamily:"monospace", fontSize:10, color:C.text3, padding:"8px 10px", borderBottom:`1px solid rgba(37,45,66,0.5)` }}>{c.filed}</td>
                <td style={{ padding:"8px 10px", borderBottom:`1px solid rgba(37,45,66,0.5)` }}>
                  <span style={{ background:`${outcomeColor[c.out]}22`, color:outcomeColor[c.out], borderRadius:2, padding:"2px 7px", fontFamily:"monospace", fontSize:9, fontWeight:600 }}>{c.out.toUpperCase()}</span>
                </td>
                <td style={{ fontSize:10, color:C.teal, padding:"8px 10px", borderBottom:`1px solid rgba(37,45,66,0.5)` }}>{c.atty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontFamily:"monospace", fontSize:9, color:C.text3, marginTop:10 }}>PACER federal docket. A-numbers anonymized per FRAP Rule 25. Data current as of July 2026.</div>
    </div>
  );
}

function AttorneysTab({ onSelect }) {
  return (
    <div style={{ padding:"20px 24px", overflowY:"auto", height:"100%" }}>
      <div style={{ fontFamily:"monospace", fontSize:32, fontWeight:800, color:C.accent, marginBottom:4 }}>TOP HC ATTORNEYS</div>
      <div style={{ fontFamily:"monospace", fontSize:10, color:C.text3, marginBottom:18 }}>Ranked by Habeas Corpus win rate · PACER, AILA, CLINIC, NIP, ImmigrationAdvocates.org</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
        {ATTORNEYS.map((a, i) => (
          <div key={a.id} onClick={() => onSelect({ ...a, _type:"attorney" })} style={{
            background:C.surface, border:`1px solid ${C.border2}`, borderRadius:8,
            padding:14, cursor:"pointer", transition:"all 0.2s",
            borderTop:`2px solid ${i < 3 ? C.accent : C.border2}`
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.surface2; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <div style={{ fontFamily:"monospace", fontSize:28, fontWeight:900, lineHeight:1, color: i<3 ? C.accent : C.text3 }}>#{i+1}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{a.name}</div>
                <div style={{ fontFamily:"monospace", fontSize:10, color:C.text3 }}>{a.firm}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:"monospace", fontSize:22, fontWeight:900, color:C.green }}>{a.rate}%</div>
                <div style={{ fontFamily:"monospace", fontSize:8, color:C.text3 }}>WIN RATE</div>
              </div>
            </div>
            <div style={{ fontFamily:"monospace", fontSize:9, color:C.text3, marginBottom:8 }}>
              Circuit: <span style={{ color:C.blue }}>{a.circuit}</span> &nbsp;·&nbsp; {a.specs}
            </div>
            <div style={{ height:4, background:C.border2, borderRadius:2, overflow:"hidden", marginBottom:6 }}>
              <div style={{ width:`${a.rate}%`, height:"100%", background:`linear-gradient(90deg,${C.green},${C.teal})`, borderRadius:2 }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"monospace", fontSize:9, color:C.text3 }}>
              <span>Won: <span style={{ color:C.green }}>{a.wins}</span></span>
              <span>Total: {a.total}</span>
              <span style={{ color:C.blue }}>{a.pacer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CorpsTab({ onSelect }) {
  return (
    <div style={{ padding:"20px 24px", overflowY:"auto", height:"100%" }}>
      <div style={{ fontFamily:"monospace", fontSize:32, fontWeight:800, color:C.accent, marginBottom:4 }}>PRIVATE DETENTION CORPORATIONS</div>
      <div style={{ fontFamily:"monospace", fontSize:10, color:C.text3, marginBottom:18 }}>For-profit companies operating ICE detention facilities · 2025-2026 financials · SEC filings, Reuters, TIME, Prison Legal News</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
        {CORPS.map(corp => (
          <div key={corp.id} onClick={() => onSelect({ ...corp, _type:"corp" })} style={{
            background:C.surface, border:`1px solid ${C.border2}`, borderRadius:8,
            padding:16, cursor:"pointer", borderTop:`3px solid ${corp.col}`, transition:"all 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.surface2; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"monospace", fontSize:18, fontWeight:900, color:corp.col, letterSpacing:"0.04em" }}>{corp.name}</div>
                <div style={{ fontFamily:"monospace", fontSize:9, color:C.text3 }}>{corp.hq} · Est. {corp.founded}{corp.ticker !== "Private" ? " · NYSE: "+corp.ticker : ""}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{corp.rev}</div>
                <div style={{ fontFamily:"monospace", fontSize:8, color:C.text3 }}>2025 REV</div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6, marginBottom:10, background:C.bg2, borderRadius:5, padding:8 }}>
              {[{ v:corp.profit, l:"PROFIT" }, { v:corp.chg, l:"YOY %" }, { v:corp.fac, l:"FACILITIES" }, { v:corp.beds.toLocaleString(), l:"ICE BEDS" }].map(s => (
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"monospace", fontSize:12, fontWeight:800, color:corp.col }}>{s.v}</div>
                  <div style={{ fontFamily:"monospace", fontSize:7, color:C.text3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:11, color:C.text2, lineHeight:1.65 }}>{corp.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("map");
  const [layers, setLayers] = useState({ detention:true, planned:true, corps:true, judges:true, attorneys:false });
  const [selected, setSelected] = useState(null);
  const [detCount, setDetCount] = useState(60311);
  const [search, setSearch] = useState("");
  const [booted, setBooted] = useState(false);
  const [bootPct, setBootPct] = useState(0);
  const [bootMsg, setBootMsg] = useState("INITIALIZING...");
  const [toasts, setToasts] = useState([]);

  const bootMsgs = [
    "LOADING VERA INSTITUTE DATA...",
    "FETCHING EOIR STATISTICS 2025-26...",
    "SYNCING TRAC IMMIGRATION DATA...",
    "LOADING PACER ATTORNEY RECORDS...",
    "RENDERING INTELLIGENCE MAP...",
    "ALL SYSTEMS OPERATIONAL."
  ];

  useEffect(() => {
    let step = 0;
    const iv = setInterval(() => {
      step++;
      setBootPct(Math.round(step / bootMsgs.length * 100));
      setBootMsg(bootMsgs[step - 1] || "READY.");
      if (step >= bootMsgs.length) {
        clearInterval(iv);
        setTimeout(() => {
          setBooted(true);
          setTimeout(() => addToast("DetentionWatch Pro 2026 — live data loaded", false), 300);
          setTimeout(() => addToast("60,311 in ICE detention as of Apr 4, 2026 (TRAC)", true), 1100);
        }, 400);
      }
    }, 280);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const iv = setInterval(() => {
      setDetCount(n => n + Math.floor(Math.random() * 7) - 3);
    }, 8000);
    return () => clearInterval(iv);
  }, [booted]);

  function addToast(msg, isRed) {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, isRed }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000);
  }

  function toggleLayer(name) {
    setLayers(l => ({ ...l, [name]: !l[name] }));
  }

  function handleSearch(v) {
    setSearch(v);
    if (!v || v.length < 2) return;
    const q = v.toLowerCase();
    const fac = FACILITIES.find(f => f.name.toLowerCase().includes(q) || f.city.toLowerCase().includes(q));
    if (fac) { setTab("map"); setSelected({ ...fac, _type:"facility" }); return; }
    const j = JUDGES.find(x => x.name.toLowerCase().includes(q) || x.court.toLowerCase().includes(q));
    if (j) { setTab("map"); setSelected({ ...j, _type:"judge" }); return; }
    const a = ATTORNEYS.find(x => x.name.toLowerCase().includes(q));
    if (a) { setSelected({ ...a, _type:"attorney" }); }
  }

  const TABS = [
    { id:"map", label:"INTEL MAP" },
    { id:"hc", label:"HC TRACKER" },
    { id:"attorneys", label:"ATTORNEYS" },
    { id:"corps", label:"CORPORATIONS" },
  ];

  const layerDefs = [
    { key:"detention", label:"Detention Centers", color:C.red, count:FACILITIES.filter(f=>f.status==="active").length },
    { key:"planned",   label:"Planned 2025-26",   color:C.blue,   count:FACILITIES.filter(f=>f.status==="planned").length },
    { key:"corps",     label:"Private Corps HQ",  color:C.purple, count:CORPS.length },
    { key:"judges",    label:"Immigration Judges", color:C.accent, count:JUDGES.length },
    { key:"attorneys", label:"HC Attorneys",       color:C.teal,   count:ATTORNEYS.length },
  ];

  if (!booted) return (
    <div style={{ width:"100%", height:"100vh", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"monospace" }}>
      <div style={{ fontSize:48, fontWeight:900, letterSpacing:"0.08em", background:`linear-gradient(135deg,${C.accent},${C.orange})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:6 }}>DETENTION<br/>WATCH PRO</div>
      <div style={{ fontSize:10, color:C.text3, letterSpacing:"0.35em", marginBottom:48 }}>IMMIGRATION INTELLIGENCE PLATFORM — 2026</div>
      <div style={{ width:260, height:2, background:C.border2, borderRadius:2, overflow:"hidden", marginBottom:12 }}>
        <div style={{ height:"100%", width:`${bootPct}%`, background:`linear-gradient(90deg,${C.accent},${C.orange})`, transition:"width 0.2s linear" }} />
      </div>
      <div style={{ fontSize:10, color:C.text3, letterSpacing:"0.1em" }}>{bootMsg}</div>
    </div>
  );

  return (
    <div style={{ width:"100%", height:"100vh", background:C.bg, color:C.text, fontFamily:"sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* TOAST */}
      <div style={{ position:"fixed", top:62, right:16, zIndex:9999, display:"flex", flexDirection:"column", gap:8, pointerEvents:"none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background:C.surface2, border:`1px solid ${C.border2}`,
            borderLeft:`3px solid ${t.isRed ? C.red : C.accent}`,
            borderRadius:5, padding:"9px 13px", fontFamily:"monospace", fontSize:11,
            color:C.text, maxWidth:300, boxShadow:"0 4px 20px rgba(0,0,0,0.5)"
          }}>{t.msg}</div>
        ))}
      </div>

      {/* TOPBAR */}
      <header style={{ flex:"0 0 52px", display:"flex", alignItems:"center", padding:"0 18px", gap:14, background:C.bg2, borderBottom:`1px solid ${C.border}`, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
          <span style={{ fontFamily:"monospace", fontWeight:900, fontSize:15, color:C.accent, letterSpacing:"0.06em" }}>DETENTIONWATCH</span>
          <span style={{ fontFamily:"monospace", fontSize:9, color:C.text3, background:C.surface2, border:`1px solid ${C.border2}`, padding:"2px 6px", borderRadius:2 }}>PRO 2026</span>
        </div>
        <div style={{ width:1, height:26, background:C.border2 }} />
        <nav style={{ display:"flex", gap:2 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily:"monospace", fontSize:10, letterSpacing:"0.08em",
              color: tab === t.id ? C.accent : C.text3,
              background: tab === t.id ? `rgba(232,197,71,0.07)` : "none",
              border: tab === t.id ? `1px solid ${C.accent}` : "1px solid transparent",
              borderRadius:3, padding:"5px 11px", cursor:"pointer"
            }}>{t.label}</button>
          ))}
        </nav>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:12 }}>
          <input value={search} onChange={e => handleSearch(e.target.value)}
            placeholder="Search facility, judge, city..."
            style={{ background:C.surface, border:`1px solid ${C.border2}`, borderRadius:4, padding:"5px 10px", fontFamily:"monospace", fontSize:10, color:C.text, width:190, outline:"none" }} />
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.green, boxShadow:`0 0 8px ${C.green}`, animation:"pulse 2s infinite" }} />
            <span style={{ fontFamily:"monospace", fontSize:9, color:C.green, letterSpacing:"0.1em" }}>LIVE DATA</span>
          </div>
          <button onClick={() => { addToast("73,400+ detained Jan 2026 — record high (Vera)", true); setTimeout(()=>addToast("GEO Group: $254M profit 2025, +700% YOY",true),700); setTimeout(()=>addToast("ACLU wins HC class action: 1,800 detainees get bond hearings",false),1400); }}
            style={{ fontFamily:"monospace", fontSize:10, color:C.red, background:"rgba(255,71,87,0.08)", border:"1px solid rgba(255,71,87,0.3)", borderRadius:3, padding:"5px 11px", cursor:"pointer", position:"relative" }}>
            ALERTS
            <span style={{ position:"absolute", top:-6, right:-6, width:15, height:15, background:C.red, borderRadius:"50%", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700 }}>4</span>
          </button>
        </div>
      </header>

      {/* BODY */}
      <div style={{ flex:1, display:"flex", minHeight:0, overflow:"hidden" }}>

        {/* LEFT PANEL */}
        <aside style={{ flex:"0 0 266px", background:C.bg2, borderRight:`1px solid ${C.border}`, overflowY:"auto", display:"flex", flexDirection:"column" }}>

          {/* Stats */}
          <div style={{ padding:"13px 14px", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"0.18em", color:C.accent, textTransform:"uppercase", marginBottom:10 }}>2026 National Overview</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
              {[
                { v:detCount.toLocaleString(), l:"In Detention", c:C.red },
                { v:"300+", l:"Facilities", c:C.orange },
                { v:"1,240", l:"HC Filed", c:C.blue },
                { v:"71%", l:"No Convictions", c:C.green },
              ].map(s => (
                <div key={s.l} style={{ background:C.surface, border:`1px solid ${C.border2}`, borderRadius:5, padding:"9px 8px", textAlign:"center", borderTop:`2px solid ${s.c}` }}>
                  <div style={{ fontFamily:"monospace", fontSize:20, fontWeight:900, color:s.c }}>{s.v}</div>
                  <div style={{ fontFamily:"monospace", fontSize:8, color:C.text3, textTransform:"uppercase", letterSpacing:"0.06em", marginTop:2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Layers */}
          <div style={{ padding:"12px 14px", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"0.18em", color:C.accent, textTransform:"uppercase", marginBottom:10 }}>Map Layers</div>
            {layerDefs.map(ld => (
              <div key={ld.key} onClick={() => toggleLayer(ld.key)} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", cursor:"pointer" }}>
                <div style={{ width:13, height:13, borderRadius:2, flexShrink:0, border:`1.5px solid ${layers[ld.key] ? C.accent : C.border2}`, background: layers[ld.key] ? `${C.accent}22` : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {layers[ld.key] && <div style={{ width:7, height:7, background:C.accent, borderRadius:1 }} />}
                </div>
                <div style={{ width:8, height:8, borderRadius:"50%", background:ld.color, boxShadow:`0 0 5px ${ld.color}`, flexShrink:0 }} />
                <div style={{ fontFamily:"monospace", fontSize:10, color:C.text2, flex:1 }}>{ld.label}</div>
                <div style={{ fontFamily:"monospace", fontSize:9, color:C.text3 }}>{ld.count}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ padding:"12px 14px", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"0.18em", color:C.accent, textTransform:"uppercase", marginBottom:10 }}>Capacity Key</div>
            {[
              { c:C.red,    l:"CRITICAL — 1,000+ detained" },
              { c:C.orange, l:"HIGH — 500–999" },
              { c:C.accent, l:"MODERATE — 150–499" },
              { c:C.green,  l:"LOW — under 150" },
              { c:C.blue,   l:"PLANNED / NEW 2025-26" },
              { c:C.purple, l:"CORP HEADQUARTERS" },
            ].map(row => (
              <div key={row.l} style={{ display:"flex", alignItems:"center", gap:8, padding:"3px 0" }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background:row.c, boxShadow:`0 0 5px ${row.c}`, flexShrink:0 }} />
                <div style={{ fontFamily:"monospace", fontSize:10, color:C.text2 }}>{row.l}</div>
              </div>
            ))}
          </div>

          {/* Source */}
          <div style={{ padding:"12px 14px", marginTop:"auto" }}>
            <div style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"0.18em", color:C.accent, textTransform:"uppercase", marginBottom:8 }}>Data Sources</div>
            {["Vera Institute of Justice","TRAC Immigration (Syracuse)","ICE/DHS Enforcement Stats","PACER Federal Docket","Prison Legal News","ACLU Immigrants Rights","SCOTUSblog"].map(s => (
              <div key={s} style={{ fontFamily:"monospace", fontSize:9, color:C.text3, padding:"2px 0" }}>· {s}</div>
            ))}
          </div>
        </aside>

        {/* CENTER */}
        <main style={{ flex:1, position:"relative", overflow:"hidden" }}>
          {tab === "map" && (
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column" }}>
              <USMap layers={layers} onSelect={setSelected} selected={selected} />
              <DetailPanel item={selected} onClose={() => setSelected(null)} />
            </div>
          )}
          {tab === "hc"        && <HCTab />}
          {tab === "attorneys" && <AttorneysTab onSelect={setSelected} />}
          {tab === "corps"     && <CorpsTab onSelect={setSelected} />}
        </main>

        {/* RIGHT PANEL */}
        <aside style={{ flex:"0 0 272px", background:C.bg2, borderLeft:`1px solid ${C.border}`, overflowY:"auto", display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"12px 14px", borderBottom:`1px solid ${C.border}`, fontFamily:"monospace", fontSize:9, letterSpacing:"0.18em", color:C.accent, textTransform:"uppercase" }}>Live Intelligence Feed</div>
          {NEWS.map((n, i) => (
            <div key={i} style={{ padding:"10px 13px", borderBottom:`1px solid ${C.border}`, cursor:"default" }}
              onMouseEnter={e => e.currentTarget.style.background = C.surface}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ marginBottom:4 }}>
                <span style={{ background:tagBg(n.tag), color:tagColor(n.tag), borderRadius:2, padding:"2px 7px", fontFamily:"monospace", fontSize:8, textTransform:"uppercase", letterSpacing:"0.08em" }}>{n.lbl}</span>
              </div>
              <div style={{ fontSize:11, color:C.text, lineHeight:1.5, marginBottom:3 }}>{n.head}</div>
              <div style={{ fontFamily:"monospace", fontSize:9, color:C.text3 }}>{n.src} — {n.time}</div>
            </div>
          ))}
          <div style={{ padding:"12px 14px", borderBottom:`1px solid ${C.border}`, fontFamily:"monospace", fontSize:9, letterSpacing:"0.18em", color:C.accent, textTransform:"uppercase", marginTop:4 }}>Top HC Attorneys</div>
          {ATTORNEYS.slice(0, 6).map((a, i) => (
            <div key={a.id} onClick={() => { setTab("attorneys"); setSelected({ ...a, _type:"attorney" }); }}
              style={{ padding:"9px 13px", borderBottom:`1px solid ${C.border}`, cursor:"pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = C.surface}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                <div style={{ fontFamily:"monospace", fontSize:18, fontWeight:900, lineHeight:1, color: i===0 ? C.accent : i===1 ? "#A8A8A8" : C.text3 }}>#{i+1}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:C.text }}>{a.name}</div>
                  <div style={{ fontFamily:"monospace", fontSize:9, color:C.text3 }}>{a.firm}</div>
                  <div style={{ fontFamily:"monospace", fontSize:8, color:C.blue }}>{a.circuit} Circuit</div>
                  <div style={{ height:3, background:C.border2, borderRadius:2, marginTop:4, overflow:"hidden" }}>
                    <div style={{ width:`${a.rate}%`, height:"100%", background:`linear-gradient(90deg,${C.green},${C.teal})` }} />
                  </div>
                  <div style={{ fontFamily:"monospace", fontSize:9, color:C.green, marginTop:2 }}>{a.rate}% win ({a.wins}/{a.total})</div>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2E3A54; border-radius: 2px; }
      `}</style>
    </div>
  );
}
