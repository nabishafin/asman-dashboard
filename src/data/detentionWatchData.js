// Detention Watch — national ICE detention intelligence data.
// Sources: Vera Institute, TRAC Immigration (Syracuse), ICE/DHS enforcement
// stats, PACER federal docket, SEC filings, Prison Legal News, ACLU, SCOTUSblog.

export const DW_COLORS = {
  bg: '#0B0E14',
  bg2: '#0F1420',
  surface: '#161B27',
  surface2: '#1C2335',
  border: '#252D42',
  border2: '#2E3A54',
  accent: '#E8C547',
  red: '#FF4757',
  orange: '#FF6B35',
  green: '#2ECC71',
  blue: '#3D9BFF',
  purple: '#A855F7',
  teal: '#14B8A6',
  text: '#F0F2F7',
  text2: '#8892A4',
  text3: '#4A5568',
}

export const DW_FACILITIES = [
  { id: 'F01', name: 'Stewart Detention Center', city: 'Lumpkin', state: 'GA', x: 72, y: 62, lat: 32.0421, lng: -84.7999, pop: 2100, cap: 1752, op: 'CoreCivic', circuit: '11th', status: 'active', note: 'Exceeded capacity. 2,000+ daily avg Mar 2026.' },
  { id: 'F02', name: 'South Texas ICE Processing (Dilley)', city: 'Dilley', state: 'TX', x: 42, y: 72, lat: 28.6706, lng: -99.1739, pop: 2300, cap: 2400, op: 'CoreCivic', circuit: '5th', status: 'active', note: 'Largest family detention. Reported inhumane conditions.' },
  { id: 'F03', name: 'Adams County Detention Center', city: 'Natchez', state: 'MS', x: 61, y: 68, lat: 31.5604, lng: -91.4032, pop: 2050, cap: 2000, op: 'CoreCivic', circuit: '5th', status: 'active', note: 'Exceeded capacity. 2,000+ daily avg Mar 2026.' },
  { id: 'F04', name: 'Adelanto ICE Processing Center', city: 'Adelanto', state: 'CA', x: 12, y: 56, lat: 34.5828, lng: -117.4092, pop: 1800, cap: 1940, op: 'GEO Group', circuit: '9th', status: 'active', note: 'Persistent reports of medical neglect.' },
  { id: 'F05', name: 'Winn Correctional Center', city: 'Winnfield', state: 'LA', x: 57, y: 70, lat: 31.9241, lng: -92.6415, pop: 1450, cap: 1538, op: 'LaSalle Corrections', circuit: '5th', status: 'active', note: '' },
  { id: 'F06', name: 'Northwest ICE Processing Center', city: 'Tacoma', state: 'WA', x: 9, y: 18, lat: 47.2529, lng: -122.4443, pop: 1400, cap: 1575, op: 'GEO Group', circuit: '9th', status: 'active', note: '' },
  { id: 'F07', name: 'Folkston / D. Ray James Facility', city: 'Folkston', state: 'GA', x: 73, y: 65, lat: 30.8327, lng: -82.0068, pop: 1700, cap: 1868, op: 'GEO Group', circuit: '11th', status: 'active', note: 'Reopened 2025. New GEO contract, 1,868 beds.' },
  { id: 'F08', name: 'Moshannon Valley Processing Center', city: 'Philipsburg', state: 'PA', x: 74, y: 37, lat: 40.8973, lng: -78.2214, pop: 1500, cap: 1800, op: 'GEO Group', circuit: '3rd', status: 'active', note: 'Former federal prison converted to ICE facility.' },
  { id: 'F09', name: 'Florida Soft-Sided (Alligator Alcatraz)', city: 'Loxahatchee', state: 'FL', x: 74, y: 76, lat: 26.6787, lng: -80.3623, pop: 1600, cap: 3000, op: 'ICE/DHS', circuit: '11th', status: 'active', note: 'Opened Jul 2025. 1,300–1,800 daily. Documented human rights abuses.' },
  { id: 'F10', name: 'North Lake Facility', city: 'Baldwin', state: 'MI', x: 64, y: 29, lat: 43.9033, lng: -85.85, pop: 1200, cap: 1800, op: 'GEO Group', circuit: '6th', status: 'active', note: 'New 2025 GEO contract — 1,800 beds.' },
  { id: 'F11', name: 'Denver Contract Detention', city: 'Aurora', state: 'CO', x: 34, y: 44, lat: 39.7294, lng: -104.8319, pop: 1200, cap: 1532, op: 'GEO Group', circuit: '10th', status: 'active', note: '' },
  { id: 'F12', name: 'LaSalle ICE Processing Center', city: 'Jena', state: 'LA', x: 58, y: 69, lat: 31.6816, lng: -92.1291, pop: 1100, cap: 1160, op: 'LaSalle Corrections', circuit: '5th', status: 'active', note: '' },
  { id: 'F13', name: 'Eloy Federal Contract Facility', city: 'Eloy', state: 'AZ', x: 22, y: 62, lat: 32.7551, lng: -111.5548, pop: 1380, cap: 1500, op: 'CoreCivic', circuit: '9th', status: 'active', note: '' },
  { id: 'F14', name: 'Otay Mesa Detention Center', city: 'San Diego', state: 'CA', x: 11, y: 60, lat: 32.5589, lng: -116.9422, pop: 1420, cap: 1494, op: 'CoreCivic', circuit: '9th', status: 'active', note: '' },
  { id: 'F15', name: 'Delaney Hall', city: 'Newark', state: 'NJ', x: 78, y: 35, lat: 40.7357, lng: -74.1724, pop: 900, cap: 1000, op: 'GEO Group', circuit: '3rd', status: 'active', note: 'New 2025 GEO contract — 1,000 beds.' },
  { id: 'F16', name: 'Krome North Service Processing', city: 'Miami', state: 'FL', x: 73, y: 79, lat: 25.7617, lng: -80.1918, pop: 590, cap: 608, op: 'ICE', circuit: '11th', status: 'active', note: '' },
  { id: 'F17', name: 'Houston Contract Detention', city: 'Houston', state: 'TX', x: 49, y: 73, lat: 29.7604, lng: -95.3698, pop: 480, cap: 512, op: 'GEO Group', circuit: '5th', status: 'active', note: '' },
  { id: 'F18', name: 'North Florida Detention Facility', city: 'Macclenny', state: 'FL', x: 71, y: 70, lat: 30.2822, lng: -82.1259, pop: 900, cap: 1310, op: 'GEO Group', circuit: '11th', status: 'active', note: '2025 GEO joint-venture with State of Florida.' },
  { id: 'F19', name: 'Berks Family Residential Center', city: 'Leesport', state: 'PA', x: 75, y: 35, lat: 40.4384, lng: -75.9591, pop: 80, cap: 96, op: 'Berks County', circuit: '3rd', status: 'active', note: '' },
  { id: 'F20', name: 'Prairieland Detention Center', city: 'Alvarado', state: 'TX', x: 46, y: 64, lat: 32.4065, lng: -97.2114, pop: 640, cap: 700, op: 'Emerald Correctional', circuit: '5th', status: 'active', note: '' },
  { id: 'PL1', name: 'Pecos Valley Detention (Planned)', city: 'Pecos', state: 'TX', x: 35, y: 66, lat: 31.4229, lng: -103.4932, pop: 0, cap: 2000, op: 'GEO Group', circuit: '5th', status: 'planned', note: 'Proposed 2026 expansion.' },
  { id: 'PL2', name: 'Tucson Warehouse Conversion (Planned)', city: 'Tucson', state: 'AZ', x: 23, y: 65, lat: 32.2226, lng: -110.9747, pop: 0, cap: 1500, op: 'ICE/DHS', circuit: '9th', status: 'planned', note: 'ICE warehouse-to-detention conversion.' },
  { id: 'PL3', name: 'Atlanta Area Expansion (Planned)', city: 'Atlanta', state: 'GA', x: 68, y: 62, lat: 33.749, lng: -84.388, pop: 0, cap: 2000, op: 'CoreCivic', circuit: '11th', status: 'planned', note: 'FY2026 budget expansion proposal.' },
]

export const DW_CORPS = [
  { id: 'C1', name: 'CoreCivic', ticker: 'CXW', hq: 'Nashville, TN', x: 64, y: 52, fac: 16, beds: 16000, rev: '$2.2B', profit: '$116.5M', chg: '+70%', col: DW_COLORS.red, founded: '1983', desc: "Largest private detention operator. ICE detainee count up 60% to 16,000 in 2025. CEO Patrick Swindle: 'ICE was our first customer 43 years ago.' Revenue from ICE doubled to $245M in Q4 2025." },
  { id: 'C2', name: 'GEO Group', ticker: 'GEO', hq: 'Boca Raton, FL', x: 72, y: 75, fac: 19, beds: 26000, rev: '$2.6B', profit: '$254M', chg: '+700%', col: DW_COLORS.orange, founded: '1984', desc: "Record $254M profit in 2025 — 700% increase. Added 6,000 ICE beds in 2025 reaching 26,000 total. Won $520M in new contracts — 'most successful year in company history' per exec chairman George Zoley." },
  { id: 'C3', name: 'LaSalle Corrections', ticker: 'Private', hq: 'Ruston, LA', x: 57, y: 68, fac: 14, beds: 8000, rev: '$480M', profit: 'N/A', chg: 'N/A', col: DW_COLORS.purple, founded: '2003', desc: 'Regional Gulf South operator. Expanded capacity 2024–2025 with new DHS contracts. Reports of inadequate medical care at multiple facilities.' },
  { id: 'C4', name: 'Management & Training Corp', ticker: 'Private', hq: 'Centerville, UT', x: 27, y: 42, fac: 6, beds: 4500, rev: '$310M', profit: 'N/A', chg: 'N/A', col: DW_COLORS.blue, founded: '1981', desc: 'MTC holds ICE contracts at 6 facilities including Otero County NM and facilities in AZ and TX. Focus on vocational programming.' },
  { id: 'C5', name: 'Emerald Correctional Mgmt', ticker: 'Private', hq: 'Alvarado, TX', x: 46, y: 65, fac: 4, beds: 2800, rev: '$105M', profit: 'N/A', chg: 'N/A', col: DW_COLORS.teal, founded: '2009', desc: 'Regional operator primarily holding Prairieland Detention Center contract in TX. Serves ICE under intergovernmental service agreements.' },
]

export const DW_JUDGES = [
  { id: 'J1', name: 'Hon. Dana Leigh Marks', court: 'San Francisco, CA', x: 7, y: 47, circuit: '9th', approve: 38, deny: 54, other: 8, cases: 4800, note: 'Former NAIJ president; due-process advocate.' },
  { id: 'J2', name: 'Hon. Matthew D Angelo', court: 'Boston, MA', x: 82, y: 26, circuit: '1st', approve: 52, deny: 41, other: 7, cases: 2200, note: 'Above-average grant rate for 1st Circuit.' },
  { id: 'J3', name: 'Hon. Sarah Wilson', court: 'Atlanta, GA', x: 68, y: 63, circuit: '11th', approve: 12, deny: 82, other: 6, cases: 3600, note: 'Among lowest grant rates in 11th Circuit.' },
  { id: 'J4', name: 'Hon. Carlos Mendez', court: 'Houston, TX', x: 49, y: 72, circuit: '5th', approve: 19, deny: 74, other: 7, cases: 6200, note: '5th Circuit historically low approval rates.' },
  { id: 'J5', name: 'Hon. Patricia Chen', court: 'New York, NY', x: 80, y: 31, circuit: '2nd', approve: 51, deny: 41, other: 8, cases: 7400, note: 'High-volume NYC docket.' },
  { id: 'J6', name: 'Hon. Robert Tanner', court: 'Chicago, IL', x: 62, y: 35, circuit: '7th', approve: 29, deny: 64, other: 7, cases: 3800, note: '' },
  { id: 'J7', name: 'Hon. Lisa Park', court: 'Seattle, WA', x: 9, y: 17, circuit: '9th', approve: 46, deny: 47, other: 7, cases: 2600, note: 'Known for thorough written decisions.' },
  { id: 'J8', name: 'Hon. James Whitfield', court: 'Dallas, TX', x: 47, y: 65, circuit: '5th', approve: 11, deny: 85, other: 4, cases: 8100, note: 'One of highest denial rates nationally per TRAC 2025.' },
  { id: 'J9', name: 'Hon. Maria Santos', court: 'Miami, FL', x: 73, y: 78, circuit: '11th', approve: 29, deny: 63, other: 8, cases: 4200, note: '' },
  { id: 'J10', name: 'Hon. David Kim', court: 'Los Angeles, CA', x: 11, y: 57, circuit: '9th', approve: 43, deny: 49, other: 8, cases: 6100, note: '' },
  { id: 'J11', name: 'Hon. Amanda Foster', court: 'Philadelphia, PA', x: 76, y: 36, circuit: '3rd', approve: 58, deny: 35, other: 7, cases: 2100, note: '3rd Circuit has higher-than-average grant rates.' },
  { id: 'J12', name: 'Hon. Michael Torres', court: 'San Antonio, TX', x: 44, y: 72, circuit: '5th', approve: 21, deny: 72, other: 7, cases: 5100, note: '' },
]

export const DW_ATTORNEYS = [
  { id: 'A1', name: 'Judy Rabinovitz', firm: 'ACLU Immigrants Rights Project', circuit: '2nd', wins: 62, total: 74, rate: 84, specs: 'Habeas Corpus, Class Action, Prolonged Detention', pacer: 'NY-2025-HC-912' },
  { id: 'A2', name: 'Lee Gelernt', firm: 'ACLU National', circuit: 'Multi', wins: 104, total: 133, rate: 78, specs: 'Habeas Corpus, Family Separation, Mass Enforcement', pacer: 'NY-2025-HC-301' },
  { id: 'A3', name: 'Ahilan Arulanantham', firm: 'UC Irvine School of Law', circuit: '9th', wins: 44, total: 58, rate: 76, specs: 'Habeas Corpus, Detention Conditions, Bond', pacer: 'CA9-2025-HC-144' },
  { id: 'A4', name: 'Sirine Shebaya', firm: 'National Immigration Project', circuit: 'Multi', wins: 38, total: 52, rate: 73, specs: 'Habeas Corpus, FOIA, ICE Accountability', pacer: 'DC-2025-HC-401' },
  { id: 'A5', name: 'Trina Realmuto', firm: 'Natl Imm. Litigation Alliance', circuit: '1st', wins: 31, total: 44, rate: 70, specs: 'Habeas Corpus, EOIR Procedure, BIA', pacer: 'MA-2025-HC-188' },
  { id: 'A6', name: 'David Hausman', firm: 'ACLU Foundation of Southern CA', circuit: '9th', wins: 28, total: 41, rate: 68, specs: 'Habeas Corpus, Expedited Removal, Asylum', pacer: 'CA9-2025-HC-099' },
  { id: 'A7', name: 'Anand Balakrishnan', firm: 'ACLU — CT', circuit: '2nd', wins: 33, total: 49, rate: 67, specs: 'Habeas Corpus, BIA Appeals, Detention Bonds', pacer: 'CT-2025-HC-612' },
  { id: 'A8', name: 'Mary Kenney', firm: 'AILA Foundation', circuit: '3rd', wins: 24, total: 37, rate: 65, specs: 'Habeas Corpus, NTA Defects, DACA', pacer: 'NJ-2025-HC-244' },
  { id: 'A9', name: 'Michael Tan', firm: 'ACLU Immigrants Rights', circuit: '9th', wins: 30, total: 48, rate: 63, specs: 'Habeas Corpus, Class Action, Conditions', pacer: 'CA9-2025-HC-502' },
  { id: 'A10', name: 'Jonathan Feinberg', firm: 'Kairys Rudovsky Messing LLP', circuit: '3rd', wins: 22, total: 36, rate: 61, specs: 'Habeas Corpus, Civil Rights, 1983 Claims', pacer: 'PA-2025-HC-389' },
]

export const DW_HC_CASES = [
  { cs: '2:25-cv-01881', a: 'A-216-847-023', resp: 'Warden, Stewart Det. (GA)', court: 'N.D. Ga.', judge: 'Hon. Steve Jones', filed: '2025-03-14', out: 'granted', atty: 'Judy Rabinovitz — ACLU' },
  { cs: '1:25-cv-04220', a: 'A-198-334-117', resp: 'ICE, Alligator Alcatraz (FL)', court: 'S.D. Fla.', judge: 'Hon. Darrin Gayles', filed: '2025-08-02', out: 'pending', atty: 'Lisa Lehner — Florida ACLU' },
  { cs: '3:25-cv-02891', a: 'A-221-009-445', resp: 'Warden, Adelanto (CA)', court: 'C.D. Cal.', judge: 'Hon. Andre Birotte', filed: '2025-04-10', out: 'pending', atty: 'Ahilan Arulanantham' },
  { cs: '5:25-cv-03011', a: 'A-187-562-038', resp: 'ICE ERO Houston (TX)', court: 'S.D. Tex.', judge: 'Hon. Drew Tipton', filed: '2025-02-28', out: 'denied', atty: 'RAICES Legal Team' },
  { cs: '2:25-cv-09014', a: 'A-204-118-892', resp: 'Warden, Moshannon Valley (PA)', court: 'M.D. Pa.', judge: 'Hon. Matthew Brann', filed: '2025-06-01', out: 'appealed', atty: 'Jonathan Feinberg' },
  { cs: '9:25-cv-04402', a: 'A-233-441-776', resp: 'Warden, Northwest ICE (WA)', court: 'W.D. Wash.', judge: 'Hon. Tana Lin', filed: '2025-05-19', out: 'granted', atty: 'NWIRP Legal Team' },
  { cs: '1:25-cv-07210', a: 'A-195-228-554', resp: 'Delaney Hall (NJ)', court: 'D.N.J.', judge: 'Hon. Madeline Cox Arleo', filed: '2025-10-14', out: 'granted', atty: 'Trina Realmuto — NILA' },
  { cs: '2:26-cv-00441', a: 'A-241-887-334', resp: 'Adams County Det. (MS)', court: 'S.D. Miss.', judge: 'Hon. Henry Wingate', filed: '2026-01-17', out: 'pending', atty: 'ACLU MS Chapter' },
  { cs: '6:26-cv-00112', a: 'A-238-661-900', resp: 'North Lake Facility (MI)', court: 'W.D. Mich.', judge: 'Hon. Paul Maloney', filed: '2026-02-08', out: 'pending', atty: 'Michigan ACLU' },
  { cs: '5:26-cv-00892', a: 'A-244-223-108', resp: 'ICE ERO Dallas (TX)', court: 'N.D. Tex.', judge: 'Hon. Sam Lindsay', filed: '2026-03-22', out: 'denied', atty: 'CLINIC Affiliate' },
]

export const DW_NEWS = [
  { tag: 'detention', lbl: 'DETENTION', head: 'ICE detention tops 73,400 in Jan 2026 — highest in agency history', src: 'Vera Institute', time: 'Apr 2026' },
  { tag: 'scotus', lbl: 'SCOTUS', head: 'Supreme Court hears Trump v. CASA on nationwide injunctions limiting mass deportation', src: 'SCOTUSblog', time: 'Apr 2026' },
  { tag: 'habeas', lbl: 'HABEAS CORPUS', head: 'Federal judges issue emergency HC orders for detainees at Alligator Alcatraz, FL', src: 'Miami Herald', time: 'Mar 2026' },
  { tag: 'corps', lbl: 'CORPORATIONS', head: "GEO Group posts record $254M profit in 2025 — 700% increase via Trump-era ICE contracts", src: 'Prison Legal News', time: 'Mar 2026' },
  { tag: 'detention', lbl: 'DETENTION', head: '71% of 60,311 ICE detainees have no criminal conviction — TRAC April 4, 2026', src: 'TRAC Immigration', time: 'Apr 2026' },
  { tag: 'habeas', lbl: 'HABEAS CORPUS', head: 'ACLU wins class HC action: bond hearings required for 1,800 detainees held 6+ months', src: 'ACLU', time: 'Feb 2026' },
  { tag: 'eoir', lbl: 'EOIR', head: 'BIA issues new precedent limiting continuances for pro se detainees facing removal', src: 'EOIR', time: 'Jan 2026' },
  { tag: 'corps', lbl: 'CORPORATIONS', head: 'CoreCivic doubles ICE revenue to $245M in Q4 2025; projects record 2026', src: 'Reuters', time: 'Feb 2026' },
  { tag: 'asylum', lbl: 'ASYLUM', head: '9th Circuit en banc rejects expedited removal expansion for long-term US residents', src: 'ImmigrationImpact', time: 'Mar 2026' },
  { tag: 'scotus', lbl: 'SCOTUS', head: 'High Court vacates stay on injunction blocking third-country deportations to El Salvador', src: 'SCOTUS', time: 'Apr 2026' },
]

export function dwFacColor(pop, status) {
  if (status === 'planned') return DW_COLORS.blue
  if (pop >= 1000) return DW_COLORS.red
  if (pop >= 500) return DW_COLORS.orange
  if (pop >= 150) return DW_COLORS.accent
  return DW_COLORS.green
}
// Maps facility severity to a GoogleMapView marker color key (not a hex value).
export function dwFacMarkerColor(pop, status) {
  if (status === 'planned') return 'blue'
  if (pop >= 1000) return 'red'
  if (pop >= 500) return 'orange'
  if (pop >= 150) return 'gold'
  return 'green'
}
export function dwFacRadius(pop) {
  if (pop >= 1500) return 9
  if (pop >= 1000) return 7
  if (pop >= 500) return 6
  return 4
}
export function dwJudgeColor(approve) {
  if (approve >= 45) return DW_COLORS.green
  if (approve >= 30) return DW_COLORS.accent
  if (approve >= 20) return DW_COLORS.orange
  return DW_COLORS.red
}
export function dwTagColor(tag) {
  return (
    { habeas: '#A855F7', asylum: '#3D9BFF', detention: '#FF4757', eoir: '#FF6B35', scotus: '#14B8A6', corps: '#E8C547' }[tag] ||
    DW_COLORS.text3
  )
}
export function dwTagBg(tag) {
  return (
    {
      habeas: 'rgba(168,85,247,0.12)',
      asylum: 'rgba(61,155,255,0.12)',
      detention: 'rgba(255,71,87,0.12)',
      eoir: 'rgba(255,107,53,0.12)',
      scotus: 'rgba(20,184,166,0.12)',
      corps: 'rgba(232,197,71,0.12)',
    }[tag] || 'rgba(74,85,104,0.2)'
  )
}
