/**
 * ============================================================
 *  PAL4 — Mariapps Marine Solutions
 *  Sample Data Layer  ·  data/sample-data.js
 * ============================================================
 *
 *  HOW TO SWAP TO REST API:
 *  ─────────────────────────────────────────────────────────
 *  This file exposes a single async function:
 *
 *    window.PAL4.loadVessel(vesselId)
 *
 *  Currently it resolves from the local SAMPLE_DATA object below.
 *  To switch to a real API, replace the body of loadVessel() with:
 *
 *    const res  = await fetch(`/api/v1/dashboard?vessel=${vesselId}`, {
 *      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
 *    });
 *    return await res.json();
 *
 *  The returned shape must match the VesselDashboard schema below.
 * ============================================================
 */

;(function (global) {
  'use strict';

  /* ──────────────────────────────────────────────────
   *  SCHEMA (reference)
   *
   *  VesselDashboard {
   *    info        : VesselInfo
   *    kpi         : KpiSummary
   *    maData      : MaintenanceAnalysis   // 12-month rolling
   *    eqStatus    : [operational, dueSoon, defect]
   *    health      : number (0-100)
   *    jobs        : DueJob[]
   *    jobOrders   : JobOrderSummary
   *    runningHours: RunningHourItem[]
   *    upcoming    : UpcomingItem[]
   *    defects     : DefectItem[]
   *    activity    : ActivityItem[]
   *    jobPlans    : JobPlanSection
   *  }
   * ────────────────────────────────────────────────── */

  const SAMPLE_DATA = {

    /* ══════════════════════════════════════════════════
     *  VESSELS LIST  (used to populate the vessel dropdown)
     * ══════════════════════════════════════════════════ */
    vesselList: [
      { id:'saraswati',    name:'MV Saraswati',    imo:'IMO 9234567', type:'Cargo Carrier',   flag:'🇮🇳', status:'operational', location:'At Sea'        },
      { id:'neptune',      name:'MV Neptune Star',  imo:'IMO 9387421', type:'Tanker',           flag:'🇮🇳', status:'operational', location:'Arabian Sea'   },
      { id:'bayexplorer',  name:'TS Bay Explorer',  imo:'IMO 9112345', type:'Survey Vessel',    flag:'🇮🇳', status:'maintenance', location:'Kochi Yard'    },
      { id:'trident',      name:'MV Trident',       imo:'IMO 9445632', type:'Container Ship',  flag:'🇮🇳', status:'operational', location:'Chennai Port'  },
      { id:'deepscan',     name:'TS Deep Scan',     imo:'IMO 9501234', type:'Research Vessel',  flag:'🇮🇳', status:'offline',     location:'Visakhapatnam' },
    ],

    /* ══════════════════════════════════════════════════
     *  VESSEL — MV Saraswati
     * ══════════════════════════════════════════════════ */
    saraswati: {
      info: {
        id: 'saraswati',
        name: 'MV Saraswati',
        imo: 'IMO 9234567',
        type: 'Cargo Carrier',
        flag: '🇮🇳',
        status: 'operational',     // operational | maintenance | offline
        location: 'Bay of Bengal',
        position: '12.4°N 87.2°E',
        speed: '14.2 kn',
        dayAtSea: 4,
        watch: '08:00 – 12:00',
        chiefEngineer: 'Rajan Kumar',
      },

      /* KPI summary */
      kpi: {
        overdue: 3,
        dueSoon: 5,
        totalJobs: 24,
        completed: 37,
        completionRate: 84.1,
        defects: 6,
        lowStock: 4,
        pendingApprovals: 3,
      },

      /* 12-month maintenance analysis (Jul → Jun) */
      maData: {
        labels:    ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'],
        jobsDue:   [42,38,45,40,43,39,41,44,38,46,43,44],
        completed: [40,36,44,39,42,37,40,43,36,45,41,37],
        overdue:   [2,2,1,1,1,2,1,1,2,1,2,3],
      },

      /* Equipment status donut */
      eqStatus: { operational: 14, dueSoon: 3, defect: 3 },

      /* Maintenance health score (0-100) */
      health: 84,

      /* ── Due Jobs ── */
      jobs: [
        { joNo:'V-2841', equipment:'Main Engine',    eqCode:'ME-001',   title:'Piston Overhaul',              frequency:'6 Months', lastDone:'07 Dec 25', nextDue:'4d Overdue', priority:'Critical', status:'overdue'   },
        { joNo:'V-2845', equipment:'Generator #2',   eqCode:'GEN-002',  title:'Generator Repair',              frequency:'1000 Hrs', lastDone:'02 Jan 26', nextDue:'6d Overdue', priority:'Critical', status:'overdue'   },
        { joNo:'O-1923', equipment:'Hull Structure',  eqCode:'HULL-M',   title:'Annual Hull Survey',            frequency:'12 Months',lastDone:'09 Jun 25', nextDue:'2d Overdue', priority:'High',     status:'overdue'   },
        { joNo:'V-2850', equipment:'FO Purifier',    eqCode:'FOP-001',  title:'Disk Stack Cleaning',           frequency:'500 Hrs',  lastDone:'12 Mar 26', nextDue:'Due 14 Jun', priority:'High',     status:'due-soon'  },
        { joNo:'O-1930', equipment:'Fire Detection', eqCode:'FD-MAIN',  title:'Annual System Test',            frequency:'12 Months',lastDone:'16 Jun 25', nextDue:'Due 16 Jun', priority:'Critical', status:'due-soon'  },
        { joNo:'V-2852', equipment:'Steering Gear',  eqCode:'STG-001',  title:'Hydraulic Oil Test',            frequency:'3 Months', lastDone:'22 Mar 26', nextDue:'Due 22 Jun', priority:'Normal',   status:'scheduled' },
        { joNo:'V-2855', equipment:'Aux Engine #1',  eqCode:'AE-001',   title:'Cylinder Head Overhaul',        frequency:'2000 Hrs', lastDone:'18 Jan 26', nextDue:'Due 28 Jun', priority:'Normal',   status:'scheduled' },
      ],

      /* ── Job Order status distribution ── */
      jobOrders: {
        total: 66,
        summary: { completed: 37, inProgress: 5, overdue: 3, pending: 16 },
        statuses: [
          { label:'Completed',               count:37, color:'#16a34a' },
          { label:'Pending',                 count:16, color:'#1565c0' },
          { label:'Work in Progress',        count:5,  color:'#0891b2' },
          { label:'Overdue',                 count:3,  color:'#dc2626' },
          { label:'Postponed',               count:2,  color:'#7c3aed' },
          { label:'Waiting for Spares',      count:3,  color:'#d97706' },
          { label:'Waiting Shore Assist.',   count:1,  color:'#ea580c' },
          { label:'Pending Office Approval', count:2,  color:'#6b7280' },
          { label:'Completed Not Approved',  count:1,  color:'#059669' },
        ],
        /* Full records for the popup modal */
        records: [
          { joNo:'V-2841', type:'Planned',   equipment:'Main Engine',     eqCode:'ME-001',  title:'Piston Overhaul',              priority:'Critical', frequency:'6 Months',  lastDone:'07 Dec 25', nextDue:'4d Overdue',  status:'overdue'          },
          { joNo:'V-2845', type:'Planned',   equipment:'Generator #2',    eqCode:'GEN-002', title:'Generator Repair',              priority:'Critical', frequency:'1000 Hrs',  lastDone:'02 Jan 26', nextDue:'6d Overdue',  status:'overdue'          },
          { joNo:'O-1923', type:'Planned',   equipment:'Hull Structure',   eqCode:'HULL-M',  title:'Annual Hull Survey',            priority:'High',     frequency:'12 Months', lastDone:'09 Jun 25', nextDue:'2d Overdue',  status:'overdue'          },
          { joNo:'V-2850', type:'Planned',   equipment:'FO Purifier',     eqCode:'FOP-001', title:'Disk Stack Cleaning',           priority:'High',     frequency:'500 Hrs',   lastDone:'12 Mar 26', nextDue:'Due 14 Jun',  status:'in-progress'      },
          { joNo:'O-1930', type:'Planned',   equipment:'Fire Detection',  eqCode:'FD-MAIN', title:'Annual System Test',            priority:'Critical', frequency:'12 Months', lastDone:'16 Jun 25', nextDue:'Due 16 Jun',  status:'pending'          },
          { joNo:'V-2852', type:'Planned',   equipment:'Steering Gear',   eqCode:'STG-001', title:'Hydraulic Oil Test',            priority:'Normal',   frequency:'3 Months',  lastDone:'22 Mar 26', nextDue:'Due 22 Jun',  status:'pending'          },
          { joNo:'V-2855', type:'Planned',   equipment:'Aux Engine #1',   eqCode:'AE-001',  title:'Cylinder Head Overhaul',        priority:'Normal',   frequency:'2000 Hrs',  lastDone:'18 Jan 26', nextDue:'Due 28 Jun',  status:'pending'          },
          { joNo:'V-2838', type:'Planned',   equipment:'Aux Engine #1',   eqCode:'AE-001',  title:'Oil Change',                    priority:'Normal',   frequency:'500 Hrs',   lastDone:'11 May 26', nextDue:'Completed',   status:'completed'        },
          { joNo:'V-2835', type:'Planned',   equipment:'Main Engine',     eqCode:'ME-001',  title:'Air Cooler Cleaning',           priority:'Normal',   frequency:'6 Months',  lastDone:'10 Dec 25', nextDue:'Completed',   status:'completed'        },
          { joNo:'V-2830', type:'Planned',   equipment:'Generator #1',    eqCode:'GEN-001', title:'Cylinder Head Overhaul',        priority:'Normal',   frequency:'2000 Hrs',  lastDone:'08 Jun 26', nextDue:'Completed',   status:'completed'        },
          { joNo:'V-2860', type:'Unplanned', equipment:'Aux Engine #2',   eqCode:'AE-002',  title:'Injector Overhaul',             priority:'High',     frequency:'—',         lastDone:'—',         nextDue:'Pending Appr.',status:'pending-approval' },
          { joNo:'V-2861', type:'Unplanned', equipment:'FW Generator',    eqCode:'FWG-001', title:'Scale Removal',                 priority:'Normal',   frequency:'—',         lastDone:'—',         nextDue:'Pending Appr.',status:'pending-approval' },
          { joNo:'V-2849', type:'Defect',    equipment:'ME Turbocharger', eqCode:'TC-001',  title:'Oil Leak Repair',               priority:'Urgent',   frequency:'—',         lastDone:'—',         nextDue:'In progress', status:'in-progress'      },
          { joNo:'V-2848', type:'Defect',    equipment:'Bilge Pump',      eqCode:'BP-001',  title:'Efficiency Restoration',        priority:'High',     frequency:'—',         lastDone:'—',         nextDue:'Wait Spares',  status:'waiting-spares'   },
          { joNo:'V-2847', type:'Defect',    equipment:'Cargo Hold #3',   eqCode:'CH-003',  title:'Hatch Seal Replacement',        priority:'Medium',   frequency:'—',         lastDone:'—',         nextDue:'Pending',      status:'pending'          },
          { joNo:'V-2843', type:'Planned',   equipment:'FO Purifier',     eqCode:'FOP-001', title:'Inlet Valve Overhaul',          priority:'Normal',   frequency:'12 Months', lastDone:'14 Jun 25', nextDue:'Completed',   status:'completed'        },
          { joNo:'V-2842', type:'Planned',   equipment:'Steering Gear',   eqCode:'STG-001', title:'Pump Seal Replacement',         priority:'Normal',   frequency:'12 Months', lastDone:'13 Jun 25', nextDue:'Completed',   status:'completed'        },
          { joNo:'O-1925', type:'Planned',   equipment:'Lifeboat Engine', eqCode:'LB-ENG',  title:'Annual Test',                   priority:'Critical', frequency:'12 Months', lastDone:'10 Jun 25', nextDue:'Postponed',    status:'postponed'        },
          { joNo:'O-1918', type:'Planned',   equipment:'Navigation Equip.',eqCode:'NAV-001','title':'Radar Calibration',           priority:'Normal',   frequency:'12 Months', lastDone:'08 Jun 25', nextDue:'Completed',   status:'completed'        },
          { joNo:'V-2858', type:'Planned',   equipment:'Cargo Pump',      eqCode:'CP-001',  title:'Bearing Inspection',            priority:'Normal',   frequency:'1500 Hrs',  lastDone:'—',         nextDue:'Wait Shore',   status:'waiting-shore'    },
        ],
      },

      /* ── Running hours ── */
      runningHours: [
        { name:'Main Engine',   code:'ME-001',  current:18420, nextDue:18500, status:'critical' },
        { name:'Generator #2',  code:'GEN-002', current:4890,  nextDue:5000,  status:'warning'  },
        { name:'Aux Engine #1', code:'AE-001',  current:6210,  nextDue:6500,  status:'good'     },
        { name:'FO Purifier',   code:'FOP-001', current:2340,  nextDue:2500,  status:'good'     },
        { name:'Cargo Pump',    code:'CP-001',  current:1120,  nextDue:1500,  status:'good'     },
      ],

      /* ── Equipment Tree (for Equipments page) ── */
      equipmentTree: [
        {
          groupCode:'ME', groupName:'Main Machinery and Equipment',
          items:[
            { code:'ME-001', name:'Main Engine', maker:'MAN B&W', model:'6S60ME-C', serial:'ME2024001', safetyLevel:'Critical', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:18420, status:'operational',
              specs:{ voltage:'440V', rpm:'102', power:'12840 kW', bore:'600mm' },
              jobPlans:[
                {id:'JP-ME-001', title:'Piston Overhaul',                    freq:'6000 Hrs',  lastDone:'07 Dec 2025', nextDue:'24,000 hrs', status:'upcoming',    priority:'Critical'},
                {id:'JP-ME-002', title:'Turbocharger Bearing Inspection',     freq:'4000 Hrs',  lastDone:'02 Mar 2026', nextDue:'22,420 hrs', status:'upcoming',    priority:'High'    },
                {id:'JP-ME-003', title:'Air Cooler Chemical Cleaning',        freq:'1500 Hrs',  lastDone:'12 Dec 2025', nextDue:'19,620 hrs', status:'due-soon',    priority:'Normal'  },
                {id:'JP-ME-004', title:'Fuel Pump Overhaul',                  freq:'8000 Hrs',  lastDone:'05 May 2026', nextDue:'26,380 hrs', status:'upcoming',    priority:'Critical'},
                {id:'JP-ME-005', title:'Exhaust Valve Renewal',               freq:'8000 Hrs',  lastDone:'18 Oct 2024', nextDue:'23,800 hrs', status:'overdue',     priority:'Critical'},
                {id:'JP-ME-006', title:'Cylinder Liner Measurement',          freq:'3000 Hrs',  lastDone:'18 Apr 2026', nextDue:'21,420 hrs', status:'upcoming',    priority:'High'    },
                {id:'JP-ME-007', title:'Main Bearing Clearance Check',        freq:'3000 Hrs',  lastDone:'28 Mar 2026', nextDue:'21,420 hrs', status:'upcoming',    priority:'High'    },
                {id:'JP-ME-008', title:'Fuel Injector Overhaul',              freq:'2000 Hrs',  lastDone:'28 Sep 2025', nextDue:'20,420 hrs', status:'overdue',     priority:'Critical'},
                {id:'JP-ME-009', title:'Indicator Card — All Units',          freq:'500 Hrs',   lastDone:'09 Mar 2026', nextDue:'18,640 hrs', status:'due-soon',    priority:'Normal'  },
                {id:'JP-ME-010', title:'Jacket Cooling Water Test',           freq:'1 Month',   lastDone:'17 Mar 2026', nextDue:'17 Jun 2026',status:'due-soon',    priority:'Normal'  },
                {id:'JP-ME-011', title:'Lube Oil Sample Analysis',            freq:'1 Month',   lastDone:'10 May 2026', nextDue:'10 Jun 2026',status:'due-soon',    priority:'Normal'  },
                {id:'JP-ME-012', title:'Crankcase Inspection',                freq:'1000 Hrs',  lastDone:'02 Apr 2026', nextDue:'19,420 hrs', status:'upcoming',    priority:'High'    },
                {id:'JP-ME-013', title:'Governor Calibration',               freq:'24 Months', lastDone:'05 Feb 2025', nextDue:'05 Feb 2027',status:'upcoming',    priority:'Normal'  },
                {id:'JP-ME-014', title:'Turbocharger Dry Gas Cleaning',       freq:'250 Hrs',   lastDone:'08 Jan 2026', nextDue:'18,670 hrs', status:'due-soon',    priority:'Normal'  },
                {id:'JP-ME-015', title:'Starting Air Valve Check',            freq:'3000 Hrs',  lastDone:'15 Apr 2026', nextDue:'21,420 hrs', status:'upcoming',    priority:'Normal'  },
                {id:'JP-ME-016', title:'Cylinder Head Overhaul',              freq:'12000 Hrs', lastDone:'01 Sep 2025', nextDue:'28,000 hrs', status:'upcoming',    priority:'Critical'},
                {id:'JP-ME-017', title:'Connecting Rod Bearing Renewal',      freq:'16000 Hrs', lastDone:'Not Done',    nextDue:'16,000 hrs', status:'not-started', priority:'Critical'},
                {id:'JP-ME-018', title:'Main Engine Performance Test',        freq:'6 Months',  lastDone:'15 Nov 2025', nextDue:'15 May 2026',status:'overdue',     priority:'High'    },
                {id:'JP-ME-019', title:'Fuel Viscosity & Temperature Check',  freq:'1 Week',    lastDone:'08 Jun 2026', nextDue:'15 Jun 2026',status:'upcoming',    priority:'Normal'  },
                {id:'JP-ME-020', title:'Turbocharger Water Wash (On-Load)',   freq:'100 Hrs',   lastDone:'06 Jun 2026', nextDue:'18,520 hrs', status:'upcoming',    priority:'Normal'  },
                {id:'JP-ME-021', title:'Air Cooler Pressure Test',            freq:'12 Months', lastDone:'12 Nov 2025', nextDue:'12 Nov 2026',status:'upcoming',    priority:'Normal'  },
                {id:'JP-ME-022', title:'Crankshaft Deflection Measurement',   freq:'6000 Hrs',  lastDone:'10 Dec 2025', nextDue:'24,000 hrs', status:'upcoming',    priority:'High'    },
                {id:'JP-ME-023', title:'Exhaust Gas Boiler Cleaning',         freq:'500 Hrs',   lastDone:'01 Jun 2026', nextDue:'18,920 hrs', status:'upcoming',    priority:'Normal'  },
                {id:'JP-ME-024', title:'Cooling Water Pump Inspection',       freq:'6000 Hrs',  lastDone:'15 Jan 2026', nextDue:'24,000 hrs', status:'upcoming',    priority:'Normal'  },
                {id:'JP-ME-025', title:'Engine Room Log Review & Audit',      freq:'1 Month',   lastDone:'01 Jun 2026', nextDue:'01 Jul 2026',status:'upcoming',    priority:'Normal'  },
              ],
              spareParts:[
                {partNo:'ME-GS-014',  name:'Gasket Set — Cylinder Cover',         stock:8,  min:5, unit:'Set', critical:true },
                {partNo:'ME-FI-008',  name:'Fuel Injector',                        stock:3,  min:4, unit:'Pcs', critical:true },
                {partNo:'ME-EV-003',  name:'Exhaust Valve Insert',                 stock:1,  min:2, unit:'Pcs', critical:true },
                {partNo:'ME-PK-001',  name:'Piston Ring Kit',                      stock:4,  min:2, unit:'Set', critical:false},
                {partNo:'ME-BRG-001', name:'Main Bearing Set',                     stock:2,  min:2, unit:'Set', critical:true },
                {partNo:'ME-BRG-002', name:'Connecting Rod Bearing',               stock:3,  min:2, unit:'Set', critical:true },
                {partNo:'ME-CS-001',  name:'Cylinder Sleeve',                      stock:1,  min:1, unit:'Pcs', critical:true },
                {partNo:'ME-CP-001',  name:'Cylinder Cover — Complete',            stock:0,  min:1, unit:'Pcs', critical:true },
                {partNo:'ME-PP-001',  name:'Piston Pin',                           stock:2,  min:2, unit:'Pcs', critical:true },
                {partNo:'ME-PRC-001', name:'Piston Ring Carrier',                  stock:1,  min:1, unit:'Pcs', critical:false},
                {partNo:'ME-VIG-001', name:'Valve Guide — Intake',                 stock:6,  min:4, unit:'Pcs', critical:false},
                {partNo:'ME-VEG-001', name:'Valve Guide — Exhaust',                stock:4,  min:4, unit:'Pcs', critical:false},
                {partNo:'ME-VI-001',  name:'Valve Insert — Intake',                stock:6,  min:6, unit:'Pcs', critical:true },
                {partNo:'ME-VE-001',  name:'Valve Insert — Exhaust',               stock:3,  min:6, unit:'Pcs', critical:true },
                {partNo:'ME-CB-001',  name:'Connecting Rod Bolt Set',              stock:4,  min:2, unit:'Set', critical:true },
                {partNo:'ME-MB-001',  name:'Main Bearing Bolt Set',                stock:2,  min:2, unit:'Set', critical:false},
                {partNo:'ME-TP-001',  name:'Top End Packing Set',                  stock:5,  min:3, unit:'Set', critical:false},
                {partNo:'ME-ORS-001', name:'O-Ring Assorted Kit',                  stock:10, min:5, unit:'Kit', critical:false},
                {partNo:'ME-FPB-001', name:'Fuel Pump Barrel & Plunger',           stock:2,  min:2, unit:'Set', critical:true },
                {partNo:'ME-FDV-001', name:'Fuel Pump Delivery Valve',             stock:4,  min:2, unit:'Pcs', critical:true },
                {partNo:'ME-ACE-001', name:'Air Cooler Element',                   stock:1,  min:1, unit:'Set', critical:false},
                {partNo:'ME-TCN-001', name:'Turbocharger Nozzle Ring',             stock:1,  min:1, unit:'Pcs', critical:true },
                {partNo:'ME-SAV-001', name:'Starting Air Valve',                   stock:3,  min:2, unit:'Pcs', critical:true },
                {partNo:'ME-IND-001', name:'Indicator Cock',                       stock:6,  min:6, unit:'Pcs', critical:false},
                {partNo:'ME-JWP-001', name:'JCW Pump Mechanical Seal',             stock:2,  min:2, unit:'Pcs', critical:false},
              ],
              jobOrders:[
                {id:'JO-2026-2841', title:'Piston Overhaul — Unit 3',          type:'Planned',    status:'Open',        priority:'Critical', raised:'01 Jun 2026', dueDate:'15 Jun 2026', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2026-2798', title:'Fuel Injector Replacement — All Units', type:'Planned', status:'In Progress', priority:'High',     raised:'28 May 2026', dueDate:'10 Jun 2026', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2026-2761', title:'Air Cooler Chemical Cleaning',       type:'Planned',    status:'Open',        priority:'Normal',   raised:'22 May 2026', dueDate:'20 Jun 2026', assignedTo:'Motorman',          dept:'Engine'},
                {id:'JO-2026-2720', title:'Exhaust Valve Renewal — Unit 5',     type:'Defect',     status:'Open',        priority:'Critical', raised:'18 May 2026', dueDate:'08 Jun 2026', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2026-2685', title:'Turbocharger Bearing Inspection',    type:'Condition',  status:'In Progress', priority:'High',     raised:'12 May 2026', dueDate:'30 Jun 2026', assignedTo:'Shore Technician',  dept:'Engine'},
                {id:'JO-2026-2640', title:'Lube Oil Sample Analysis',           type:'Routine',    status:'Completed',   priority:'Normal',   raised:'05 May 2026', dueDate:'10 May 2026', assignedTo:'Motorman',          dept:'Engine'},
                {id:'JO-2026-2601', title:'Fuel Pump Overhaul — Unit 2',        type:'Planned',    status:'Completed',   priority:'High',     raised:'28 Apr 2026', dueDate:'05 May 2026', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2026-2580', title:'Running Hour Update & Log Entry',    type:'Routine',    status:'Completed',   priority:'Normal',   raised:'20 Apr 2026', dueDate:'20 Apr 2026', assignedTo:'Chief Engineer',    dept:'Engine'},
                {id:'JO-2026-2541', title:'Cylinder Liner Measurement',         type:'Inspection', status:'Completed',   priority:'Normal',   raised:'14 Apr 2026', dueDate:'18 Apr 2026', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2026-2498', title:'Starting Air Valve Check — All',     type:'Planned',    status:'Completed',   priority:'Normal',   raised:'08 Apr 2026', dueDate:'15 Apr 2026', assignedTo:'Motorman',          dept:'Engine'},
                {id:'JO-2026-2460', title:'Connecting Rod Bearing Inspection',  type:'Planned',    status:'Completed',   priority:'High',     raised:'01 Apr 2026', dueDate:'07 Apr 2026', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2026-2410', title:'Main Bearing Clearance Check',       type:'Inspection', status:'Completed',   priority:'High',     raised:'22 Mar 2026', dueDate:'28 Mar 2026', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2026-2375', title:'Jacket Cooling Water Test',          type:'Routine',    status:'Completed',   priority:'Normal',   raised:'15 Mar 2026', dueDate:'17 Mar 2026', assignedTo:'Motorman',          dept:'Engine'},
                {id:'JO-2026-2330', title:'Indicator Card — All Units',         type:'Routine',    status:'Completed',   priority:'Normal',   raised:'08 Mar 2026', dueDate:'09 Mar 2026', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2026-2290', title:'Fuel Oil Viscosity Check',           type:'Routine',    status:'Completed',   priority:'Normal',   raised:'01 Mar 2026', dueDate:'02 Mar 2026', assignedTo:'Motorman',          dept:'Engine'},
                {id:'JO-2025-2180', title:'Piston Overhaul — Unit 1&2',         type:'Planned',    status:'Completed',   priority:'Critical', raised:'05 Dec 2025', dueDate:'10 Dec 2025', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2025-2090', title:'Air Cooler Pressure Test',           type:'Inspection', status:'Completed',   priority:'Normal',   raised:'10 Nov 2025', dueDate:'12 Nov 2025', assignedTo:'Motorman',          dept:'Engine'},
                {id:'JO-2025-1980', title:'Turbocharger Compressor Cleaning',   type:'Planned',    status:'Completed',   priority:'Normal',   raised:'15 Oct 2025', dueDate:'20 Oct 2025', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2025-1870', title:'Fuel Injector Overhaul — All Units', type:'Planned',    status:'Completed',   priority:'High',     raised:'20 Sep 2025', dueDate:'28 Sep 2025', assignedTo:'Shore Technician',  dept:'Engine'},
                {id:'JO-2025-1760', title:'Cylinder Head Overhaul — Unit 4',    type:'Planned',    status:'Completed',   priority:'High',     raised:'25 Aug 2025', dueDate:'01 Sep 2025', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2025-1640', title:'Main Engine Oil Change',             type:'Routine',    status:'Completed',   priority:'Normal',   raised:'01 Aug 2025', dueDate:'03 Aug 2025', assignedTo:'Motorman',          dept:'Engine'},
                {id:'JO-2025-1520', title:'Exhaust Valve Timing Check',         type:'Inspection', status:'Completed',   priority:'Normal',   raised:'05 Jul 2025', dueDate:'07 Jul 2025', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2025-1410', title:'Bearing Wear Measurement',           type:'Inspection', status:'Completed',   priority:'High',     raised:'10 Jun 2025', dueDate:'14 Jun 2025', assignedTo:'2nd Engineer',      dept:'Engine'},
                {id:'JO-2025-1300', title:'Air Cooler Chemical Cleaning',       type:'Planned',    status:'Completed',   priority:'Normal',   raised:'15 May 2025', dueDate:'20 May 2025', assignedTo:'Motorman',          dept:'Engine'},
                {id:'JO-2025-1190', title:'Piston Ring Renewal — Unit 3&5',     type:'Planned',    status:'Completed',   priority:'High',     raised:'20 Apr 2025', dueDate:'28 Apr 2025', assignedTo:'2nd Engineer',      dept:'Engine'},
              ],
              /* ── Sub-equipment (children) ── */
              children:[
                { code:'TC-001', name:'ME Turbocharger', maker:'ABB', model:'TPL80-B', serial:'TC2019002', safetyLevel:'Critical', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:18420, status:'defect',
                  specs:{ type:'Axial', rpm:'9800', airFlow:'38 m³/s' },
                  jobPlans:[
                    { id:'JP-TC-001', title:'Bearing Inspection', freq:'4000 Hrs', lastDone:'05 Jan 26', nextDue:'22,420 hrs', status:'upcoming', priority:'High'   },
                    { id:'JP-TC-002', title:'Compressor Cleaning',freq:'3 Months', lastDone:'12 Mar 26', nextDue:'12 Jun 26',  status:'due-soon', priority:'Normal' },
                  ],
                  spareParts:[
                    { partNo:'TC-BRG-001', name:'Bearing Set', stock:2, min:2, unit:'Set', critical:true  },
                    { partNo:'TC-SEL-001', name:'Seal Kit',     stock:3, min:2, unit:'Set', critical:false },
                  ],
                },
                { code:'AC-001', name:'Air Cooler', maker:'Kuhne', model:'AC-60S', serial:'AC2018003', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:18420, status:'operational',
                  specs:{ coolantFlow:'85 m³/h', pressure:'2.5 bar' },
                  jobPlans:[
                    { id:'JP-AC-001', title:'Air Cooler Cleaning', freq:'6 Months', lastDone:'12 Dec 25', nextDue:'12 Jun 26', status:'due-soon', priority:'Normal' },
                  ],
                  spareParts:[
                    { partNo:'AC-TBN-001', name:'Tube Bundle', stock:0, min:1, unit:'Set', critical:false },
                  ],
                },
                { code:'FP-001', name:'Fuel Pump', maker:'Hamworthy', model:'HP-200', serial:'FP2018001', safetyLevel:'Critical', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:18420, status:'operational',
                  specs:{ capacity:'1800 l/h', pressure:'8 bar' },
                  jobPlans:[
                    { id:'JP-FP-001', title:'Fuel Pump Overhaul', freq:'8000 Hrs', lastDone:'Not Done', nextDue:'8,000 hrs', status:'not-started', priority:'Critical' },
                  ],
                  spareParts:[
                    { partNo:'FP-SEL-001', name:'Seal Kit', stock:2, min:2, unit:'Set', critical:true },
                  ],
                },
              ],
            },
          ],
        },
        {
          groupCode:'AE', groupName:'AUXILIARY ENGINE',
          items:[
            { code:'AE-001', name:'Aux Engine #1', maker:'Wartsila', model:'6L20', serial:'AE2018001', safetyLevel:'Critical', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:6210, status:'operational',
              specs:{ power:'1080 kW', rpm:'1000', cylinders:'6' },
              jobPlans:[
                { id:'JP-AE-001', title:'Cylinder Head Overhaul', freq:'2000 Hrs', lastDone:'18 Jan 26', nextDue:'6,500 hrs', status:'upcoming', priority:'Normal' },
                { id:'JP-AE-002', title:'Injection Pump Service',  freq:'3 Months', lastDone:'14 Mar 26', nextDue:'14 Jun 26', status:'due-soon', priority:'High'   },
              ],
              spareParts:[
                { partNo:'AE-IJ-001', name:'Injector Nozzle',     stock:4, min:4, unit:'Pcs', critical:true  },
                { partNo:'AE-GK-001', name:'Cylinder Head Gasket', stock:6, min:4, unit:'Pcs', critical:false },
              ],
              children:[
                { code:'AE-INJ-001', name:'Injector Set #1', maker:'Bosch', model:'PF1M', serial:'INJ2018001', safetyLevel:'High', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:6210, status:'operational',
                  specs:{ type:'Unit Injector', pressure:'1200 bar' }, jobPlans:[], spareParts:[] },
                { code:'AE-GOV-001', name:'Governor', maker:'Woodward', model:'723 PLUS', serial:'GOV2018001', safetyLevel:'Critical', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:6210, status:'operational',
                  specs:{ type:'Digital', input:'4-20 mA' }, jobPlans:[], spareParts:[] },
              ],
            },
            { code:'GEN-001', name:'Generator #1', maker:'Siemens', model:'1LG4 313', serial:'GN2018001', safetyLevel:'Critical', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:5820, status:'operational',
              specs:{ power:'800 kW', voltage:'440V', frequency:'60Hz' },
              jobPlans:[{ id:'JP-GEN1-001', title:'Winding Inspection', freq:'6 Months', lastDone:'10 Dec 25', nextDue:'10 Jun 26', status:'due-soon', priority:'Normal' }],
              spareParts:[{ partNo:'GEN-BRG-001', name:'Bearing Set', stock:1, min:2, unit:'Set', critical:true }],
            },
            { code:'GEN-002', name:'Generator #2', maker:'Siemens', model:'1LG4 313', serial:'GN2018002', safetyLevel:'Critical', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:4890, status:'due-soon',
              specs:{ power:'800 kW', voltage:'440V', frequency:'60Hz' },
              jobPlans:[
                { id:'JP-GEN2-001', title:'Generator Repair', freq:'1000 Hrs', lastDone:'02 Jan 26', nextDue:'5,000 hrs', status:'overdue',  priority:'Critical' },
                { id:'JP-GEN2-002', title:'Oil Change',        freq:'500 Hrs',  lastDone:'12 Apr 26', nextDue:'5,200 hrs', status:'upcoming', priority:'Normal'   },
              ],
              spareParts:[
                { partNo:'GEN-BRG-001', name:'Bearing Set', stock:1, min:2, unit:'Set', critical:true  },
                { partNo:'GEN-FLT-001', name:'Oil Filter',   stock:8, min:4, unit:'Pcs', critical:false },
              ],
            },
          ],
        },
        {
          groupCode:'FO', groupName:'Machinery',
          items:[
            { code:'FOP-001', name:'FO Purifier',            maker:'Alfa Laval', model:'FOPX-613',   serial:'FP2018001', safetyLevel:'Normal',   dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:2340, status:'operational',
              specs:{ capacity:'1200 l/h', power:'7.5 kW', rpm:'4500' },
              jobPlans:[
                { id:'JP-FOP-001', title:'Disk Stack Cleaning',   freq:'500 Hrs',  lastDone:'12 Mar 26', nextDue:'2,500 hrs', status:'due-soon', priority:'High'   },
                { id:'JP-FOP-002', title:'Bowl Assembly Overhaul',freq:'12 Months',lastDone:'10 Jun 25', nextDue:'10 Jun 26', status:'upcoming', priority:'Normal' },
              ],
              spareParts:[
                { partNo:'FOP-DSK-001', name:'Disc Stack',         stock:2, min:1, unit:'Set', critical:false },
                { partNo:'FOP-SEL-001', name:'O-Ring Kit',          stock:5, min:3, unit:'Set', critical:false },
              ],
            },
            { code:'LOP-001', name:'LO Purifier',            maker:'Alfa Laval', model:'LOPX-710',   serial:'LP2018001', safetyLevel:'Normal',   dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:1890, status:'operational',
              specs:{ capacity:'800 l/h', power:'5.5 kW' },
              jobPlans:[
                { id:'JP-LOP-001', title:'Disk Stack Cleaning',   freq:'500 Hrs',  lastDone:'22 Mar 26', nextDue:'2,390 hrs', status:'upcoming', priority:'Normal' },
              ],
              spareParts:[
                { partNo:'LOP-DSK-001', name:'Disc Stack',         stock:1, min:1, unit:'Set', critical:false },
              ],
            },
          ],
        },
        {
          groupCode:'DK', groupName:"Ship's Equipment and Outfit", icon:'🚢',
          items:[
            { code:'STG-001', name:'Steering Gear',          maker:'Rolls-Royce',model:'TF-4000',    serial:'SG2018001', safetyLevel:'Critical', dept:'Deck',   location:'Steering Room', installed:'15 Jan 2018', runHrs:1140, status:'operational',
              specs:{ torque:'400 kNm', pressure:'250 bar', type:'Rotary vane' },
              jobPlans:[
                { id:'JP-STG-001', title:'Hydraulic Oil Test',    freq:'3 Months', lastDone:'22 Mar 26', nextDue:'22 Jun 26', status:'upcoming',  priority:'Normal' },
                { id:'JP-STG-002', title:'Hydraulic Pump Overhaul',freq:'24 Months',lastDone:'Not Done', nextDue:'—',         status:'not-started',priority:'High'   },
              ],
              spareParts:[
                { partNo:'STG-HYD-001', name:'Hydraulic Pump Seal',stock:2, min:5, unit:'Set', critical:true },
                { partNo:'STG-OIL-001', name:'Hydraulic Oil 46',    stock:200,min:100,unit:'Ltrs',critical:false },
              ],
            },
            { code:'CP-001',  name:'Cargo Pump #1',          maker:'Framo',      model:'SP-200',     serial:'CP2018001', safetyLevel:'Normal',   dept:'Deck',   location:'Pump Room',  installed:'15 Jan 2018', runHrs:1120, status:'operational',
              specs:{ capacity:'800 m³/h', pressure:'8 bar', power:'350 kW' },
              jobPlans:[
                { id:'JP-CP-001', title:'Bearing Inspection',     freq:'1500 Hrs', lastDone:'Not Done',  nextDue:'1,500 hrs', status:'not-started',priority:'Normal' },
              ],
              spareParts:[
                { partNo:'CP-BRG-001', name:'Shaft Bearing',       stock:2, min:2, unit:'Pcs', critical:false },
                { partNo:'CP-SEL-001', name:'Mechanical Seal',      stock:1, min:2, unit:'Pcs', critical:true  },
              ],
            },
          ],
        },
        {
          groupCode:'SF', groupName:'Life Saving, Fire Fighting and Safety Equipment', icon:'🛡️',
          items:[
            { code:'FD-MAIN', name:'Fire Detection System',  maker:'Autronica',  model:'BS-620',     serial:'FD2018001', safetyLevel:'Critical', dept:'Deck',   location:'Bridge',     installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ zones:'24', detectors:'186', type:'Analog addressable' },
              jobPlans:[
                { id:'JP-FD-001', title:'Annual System Test',      freq:'12 Months',lastDone:'16 Jun 25', nextDue:'16 Jun 26', status:'due-soon',  priority:'Critical' },
                { id:'JP-FD-002', title:'Smoke Detector Check',    freq:'6 Months', lastDone:'16 Dec 25', nextDue:'16 Jun 26', status:'due-soon',  priority:'Normal'   },
              ],
              spareParts:[
                { partNo:'FD-DET-001', name:'Smoke Detector',       stock:12, min:10, unit:'Pcs', critical:true },
                { partNo:'FD-BTN-001', name:'Manual Call Point',     stock:5,  min:4,  unit:'Pcs', critical:true },
              ],
            },
            { code:'LB-ENG',  name:'Lifeboat Engine',        maker:'Yanmar',     model:'4JH-DTE',    serial:'LB2018001', safetyLevel:'Critical', dept:'Deck',   location:'Muster Station', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ power:'54 hp', cylinders:'4', fuel:'Diesel' },
              jobPlans:[
                { id:'JP-LB-001', title:'Annual Test',             freq:'12 Months',lastDone:'10 Jun 25', nextDue:'10 Jun 26', status:'upcoming',  priority:'Critical' },
              ],
              spareParts:[
                { partNo:'LB-SPK-001', name:'Spark Plug Set',       stock:4, min:4, unit:'Set', critical:false },
                { partNo:'LB-FLT-001', name:'Fuel Filter',           stock:4, min:2, unit:'Pcs', critical:false },
              ],
            },
          ],
        },
        {
          groupCode:'NV', groupName:'Navigation and Communication',
          items:[
            { code:'NAV-001', name:'Navigation Radar', maker:'Furuno', model:'FAR-2117', serial:'NV2018001', safetyLevel:'Critical', dept:'Bridge', location:'Bridge', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ range:'96 nm', band:'X-Band', power:'25 kW' },
              jobPlans:[
                { id:'JP-NAV-001', title:'Annual Calibration', freq:'12 Months', lastDone:'Not Done', nextDue:'—', status:'not-started', priority:'Normal' },
                { id:'JP-NAV-002', title:'Scanner Motor Check', freq:'6 Months', lastDone:'15 Dec 25', nextDue:'15 Jun 26', status:'due-soon', priority:'Normal' },
              ],
              spareParts:[
                { partNo:'NAV-MGA-001', name:'Magnetron', stock:1, min:1, unit:'Pcs', critical:true },
                { partNo:'NAV-SCN-001', name:'Scanner Motor', stock:0, min:1, unit:'Pcs', critical:false },
              ],
            },
            { code:'GPS-001', name:'GPS / GNSS System', maker:'JRC', model:'JLR-7600', serial:'GP2018001', safetyLevel:'Normal', dept:'Bridge', location:'Bridge', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ accuracy:'<1m', channels:'72', type:'DGPS' },
              jobPlans:[{ id:'JP-GPS-001', title:'Annual Check', freq:'12 Months', lastDone:'20 May 26', nextDue:'20 May 27', status:'upcoming', priority:'Normal' }],
              spareParts:[],
            },
            { code:'AIS-001', name:'AIS Transponder', maker:'Furuno', model:'FA-150', serial:'AI2018001', safetyLevel:'Critical', dept:'Bridge', location:'Bridge', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ class:'Class A', txPower:'12.5W', type:'SOTDMA' },
              jobPlans:[{ id:'JP-AIS-001', title:'Annual Survey Test', freq:'12 Months', lastDone:'10 Apr 26', nextDue:'10 Apr 27', status:'upcoming', priority:'Normal' }],
              spareParts:[],
            },
            { code:'ECDIS-001', name:'ECDIS System', maker:'Wärtsilä', model:'SAM ER-1200', serial:'EC2018001', safetyLevel:'Critical', dept:'Bridge', location:'Bridge', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ display:'27 inch', type:'Type Approved', update:'ENC Weekly' },
              jobPlans:[
                { id:'JP-EC-001', title:'ENC Update Verification', freq:'1 Month', lastDone:'10 May 26', nextDue:'10 Jun 26', status:'due-soon', priority:'High' },
                { id:'JP-EC-002', title:'Annual Performance Test', freq:'12 Months', lastDone:'10 Apr 26', nextDue:'10 Apr 27', status:'upcoming', priority:'Normal' },
              ],
              spareParts:[{ partNo:'EC-CPU-001', name:'CPU Board', stock:0, min:1, unit:'Pcs', critical:true }],
            },
          ],
        },
        {
          groupCode:'EL', groupName:'Electrical Systems',
          items:[
            { code:'MSB-001', name:'Main Switchboard', maker:'ABB', model:'MNS 3.0', serial:'MS2018001', safetyLevel:'Critical', dept:'Engine', location:'ECR', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ voltage:'440V AC', busbar:'3200A', protection:'IP42' },
              jobPlans:[
                { id:'JP-MSB-001', title:'Annual Insulation Test', freq:'12 Months', lastDone:'12 Apr 26', nextDue:'12 Apr 27', status:'upcoming', priority:'High' },
                { id:'JP-MSB-002', title:'Busbar Torque Check', freq:'24 Months', lastDone:'Not Done', nextDue:'—', status:'not-started', priority:'Normal' },
              ],
              spareParts:[
                { partNo:'MSB-ACB-001', name:'ACB 1600A', stock:1, min:1, unit:'Pcs', critical:true },
                { partNo:'MSB-FUS-001', name:'Fuse Set 400A', stock:6, min:4, unit:'Set', critical:false },
              ],
              children:[
                { code:'MSB-PNL-A', name:'MSB Panel A — Main Bus', maker:'ABB', model:'MNS 3.0', serial:'MSA2018001', safetyLevel:'Critical', dept:'Engine', location:'ECR', installed:'15 Jan 2018', runHrs:null, status:'operational',
                  specs:{ circuits:'24', rating:'3200A' },
                  jobPlans:[{ id:'JP-MSB-PA-001', title:'Panel Inspection', freq:'12 Months', lastDone:'12 Apr 26', nextDue:'12 Apr 27', status:'upcoming', priority:'Normal' }],
                  spareParts:[] },
                { code:'MSB-PNL-B', name:'MSB Panel B — Distribution', maker:'ABB', model:'MNS 3.0', serial:'MSB2018001', safetyLevel:'High', dept:'Engine', location:'ECR', installed:'15 Jan 2018', runHrs:null, status:'operational',
                  specs:{ circuits:'36', rating:'1600A' },
                  jobPlans:[], spareParts:[] },
              ],
            },
            { code:'ESB-001', name:'Emergency Switchboard', maker:'ABB', model:'MNS 2.0', serial:'ES2018001', safetyLevel:'Critical', dept:'Engine', location:'ECR', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ voltage:'440V AC', rating:'630A', protection:'IP42' },
              jobPlans:[
                { id:'JP-ESB-001', title:'Emergency Transfer Test', freq:'3 Months', lastDone:'15 Mar 26', nextDue:'15 Jun 26', status:'due-soon', priority:'Critical' },
              ],
              spareParts:[{ partNo:'ESB-MCB-001', name:'MCB 100A', stock:4, min:4, unit:'Pcs', critical:false }],
            },
            { code:'UPS-001', name:'UPS System — Bridge', maker:'Eaton', model:'9PX 6000i', serial:'UP2018001', safetyLevel:'High', dept:'Bridge', location:'Bridge', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ capacity:'6 kVA', autonomy:'30 min', battery:'VRLA' },
              jobPlans:[
                { id:'JP-UPS-001', title:'Battery Capacity Test', freq:'12 Months', lastDone:'10 Jan 26', nextDue:'10 Jan 27', status:'upcoming', priority:'Normal' },
              ],
              spareParts:[{ partNo:'UPS-BAT-001', name:'Battery Module', stock:2, min:2, unit:'Pcs', critical:true }],
            },
          ],
        },
        {
          groupCode:'FW', groupName:'Accommodation and Hotel Services',
          items:[
            { code:'FWG-001', name:'Fresh Water Generator', maker:'Alfa Laval', model:'JWP-26-C100', serial:'FW2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:3120, status:'operational',
              specs:{ capacity:'26 T/day', vacuum:'92%', feedTemp:'65°C' },
              jobPlans:[
                { id:'JP-FWG-001', title:'Plate Inspection & Cleaning', freq:'6 Months', lastDone:'18 Dec 25', nextDue:'18 Jun 26', status:'due-soon', priority:'Normal' },
                { id:'JP-FWG-002', title:'Ejector Pump Overhaul', freq:'12 Months', lastDone:'18 Jun 25', nextDue:'18 Jun 26', status:'due-soon', priority:'Normal' },
              ],
              spareParts:[
                { partNo:'FWG-PLT-001', name:'Plate Pack', stock:1, min:1, unit:'Set', critical:false },
                { partNo:'FWG-SLT-001', name:'Salinometer Cell', stock:2, min:1, unit:'Pcs', critical:false },
              ],
              children:[
                { code:'FWG-EJT-001', name:'Ejector Pump', maker:'Alfa Laval', model:'EP-26', serial:'EJ2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:3120, status:'operational',
                  specs:{ flow:'5 m³/h', pressure:'3 bar' },
                  jobPlans:[{ id:'JP-EJT-001', title:'Impeller Inspection', freq:'12 Months', lastDone:'18 Jun 25', nextDue:'18 Jun 26', status:'due-soon', priority:'Normal' }],
                  spareParts:[{ partNo:'EJT-IMP-001', name:'Impeller', stock:1, min:1, unit:'Pcs', critical:false }] },
                { code:'FWG-SNR-001', name:'Salinometer', maker:'KMT', model:'SND-20', serial:'SN2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:null, status:'operational',
                  specs:{ range:'0-20 ppm', alarm:'2 ppm' },
                  jobPlans:[], spareParts:[] },
              ],
            },
            { code:'HYD-001', name:'Hydrophore Unit', maker:'Grundfos', model:'HY-25-50', serial:'HY2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:2860, status:'operational',
              specs:{ pressure:'4 bar', tank:'200 L', pump:'1.5 kW' },
              jobPlans:[
                { id:'JP-HYD-001', title:'Pressure Tank Inspection', freq:'12 Months', lastDone:'20 May 26', nextDue:'20 May 27', status:'upcoming', priority:'Normal' },
              ],
              spareParts:[{ partNo:'HYD-MDM-001', name:'Membrane', stock:1, min:1, unit:'Pcs', critical:false }],
            },
            { code:'FWP-001', name:'Fresh Water Pump #1', maker:'Grundfos', model:'CM 10-4', serial:'FP2018002', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:4210, status:'operational',
              specs:{ flow:'10 m³/h', head:'40m', power:'2.2 kW' },
              jobPlans:[{ id:'JP-FWP-001', title:'Seal & Bearing Check', freq:'6 Months', lastDone:'10 Dec 25', nextDue:'10 Jun 26', status:'due-soon', priority:'Normal' }],
              spareParts:[{ partNo:'FWP-SEL-001', name:'Mechanical Seal', stock:2, min:2, unit:'Pcs', critical:false }],
            },
          ],
        },
        {
          groupCode:'CA', groupName:'Automation and Watch System',
          items:[
            { code:'CAC-001', name:'Main Air Compressor #1', maker:'Hamworthy', model:'Typhoon 150', serial:'CA2018001', safetyLevel:'High', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:7840, status:'operational',
              specs:{ capacity:'150 m³/h', pressure:'30 bar', power:'45 kW' },
              jobPlans:[
                { id:'JP-CAC-001', title:'Valve Overhaul', freq:'2000 Hrs', lastDone:'20 Feb 26', nextDue:'9,000 hrs', status:'upcoming', priority:'High' },
                { id:'JP-CAC-002', title:'Oil Change & Filter', freq:'500 Hrs', lastDone:'15 Apr 26', nextDue:'8,340 hrs', status:'upcoming', priority:'Normal' },
              ],
              spareParts:[
                { partNo:'CAC-VLV-001', name:'Valve Plate Set', stock:2, min:2, unit:'Set', critical:true },
                { partNo:'CAC-FLT-001', name:'Oil Filter', stock:6, min:4, unit:'Pcs', critical:false },
              ],
              children:[
                { code:'CAC-MTR-001', name:'Compressor Motor', maker:'ABB', model:'M2AA 200', serial:'CM2018001', safetyLevel:'High', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:7840, status:'operational',
                  specs:{ power:'45 kW', rpm:'1480', voltage:'440V' },
                  jobPlans:[{ id:'JP-CMT-001', title:'Winding Test', freq:'12 Months', lastDone:'15 Jan 26', nextDue:'15 Jan 27', status:'upcoming', priority:'Normal' }],
                  spareParts:[{ partNo:'CMT-BRG-001', name:'Bearing Set', stock:1, min:1, unit:'Set', critical:false }] },
                { code:'CAC-UFT-001', name:'Air Dryer Unit', maker:'Hamworthy', model:'AD-150', serial:'AD2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:7840, status:'operational',
                  specs:{ dewPoint:'-40°C', flow:'150 m³/h' },
                  jobPlans:[{ id:'JP-ADR-001', title:'Desiccant Replacement', freq:'12 Months', lastDone:'15 Jan 26', nextDue:'15 Jan 27', status:'upcoming', priority:'Normal' }],
                  spareParts:[{ partNo:'ADR-DSC-001', name:'Desiccant Cartridge', stock:2, min:2, unit:'Pcs', critical:false }] },
              ],
            },
            { code:'CAC-002', name:'Main Air Compressor #2', maker:'Hamworthy', model:'Typhoon 150', serial:'CA2018002', safetyLevel:'High', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:6110, status:'due-soon',
              specs:{ capacity:'150 m³/h', pressure:'30 bar', power:'45 kW' },
              jobPlans:[
                { id:'JP-CAC2-001', title:'Valve Overhaul', freq:'2000 Hrs', lastDone:'Not Done', nextDue:'6,000 hrs', status:'overdue', priority:'High' },
              ],
              spareParts:[{ partNo:'CAC-VLV-001', name:'Valve Plate Set', stock:1, min:2, unit:'Set', critical:true }],
            },
            { code:'CAB-001', name:'Air Reservoir — Main', maker:'Sperre', model:'AR-500', serial:'AR2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:null, status:'operational',
              specs:{ capacity:'500 L', pressure:'30 bar', material:'Carbon Steel' },
              jobPlans:[{ id:'JP-CAB-001', title:'Internal Inspection', freq:'30 Months', lastDone:'15 Jan 24', nextDue:'15 Jul 26', status:'due-soon', priority:'Normal' }],
              spareParts:[{ partNo:'CAB-SFV-001', name:'Safety Valve', stock:1, min:1, unit:'Pcs', critical:true }],
            },
          ],
        },
        {
          groupCode:'HV', groupName:'Hull Part',
          items:[
            { code:'ACP-001', name:'AC Central Plant', maker:'Daikin', model:'RZASG200', serial:'AC2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:5430, status:'operational',
              specs:{ capacity:'200 kW', refrigerant:'R-407C', compressors:'4' },
              jobPlans:[
                { id:'JP-ACP-001', title:'Refrigerant Level Check', freq:'3 Months', lastDone:'15 Mar 26', nextDue:'15 Jun 26', status:'due-soon', priority:'Normal' },
                { id:'JP-ACP-002', title:'Compressor Overhaul', freq:'12 Months', lastDone:'20 Apr 26', nextDue:'20 Apr 27', status:'upcoming', priority:'High' },
              ],
              spareParts:[
                { partNo:'ACP-REF-001', name:'Refrigerant R-407C', stock:10, min:5, unit:'Kg', critical:false },
                { partNo:'ACP-FLT-001', name:'Filter Dryer', stock:4, min:2, unit:'Pcs', critical:false },
              ],
              children:[
                { code:'ACP-CMP-001', name:'Compressor Unit #1', maker:'Bitzer', model:'4FC-3.2', serial:'CP2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:5430, status:'operational',
                  specs:{ power:'18 kW', refrigerant:'R-407C' },
                  jobPlans:[{ id:'JP-CMP-001', title:'Oil Change', freq:'2000 Hrs', lastDone:'20 Feb 26', nextDue:'7,430 hrs', status:'upcoming', priority:'Normal' }],
                  spareParts:[] },
                { code:'ACP-CMP-002', name:'Compressor Unit #2', maker:'Bitzer', model:'4FC-3.2', serial:'CP2018002', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:4910, status:'operational',
                  specs:{ power:'18 kW', refrigerant:'R-407C' },
                  jobPlans:[], spareParts:[] },
                { code:'ACP-CHW-001', name:'Chilled Water Pump', maker:'Grundfos', model:'CM 15-4', serial:'CW2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:5430, status:'operational',
                  specs:{ flow:'15 m³/h', head:'30m' },
                  jobPlans:[{ id:'JP-CHW-001', title:'Seal Inspection', freq:'6 Months', lastDone:'20 Dec 25', nextDue:'20 Jun 26', status:'due-soon', priority:'Normal' }],
                  spareParts:[{ partNo:'CHW-SEL-001', name:'Mechanical Seal', stock:1, min:2, unit:'Pcs', critical:false }] },
              ],
            },
            { code:'ERF-001', name:'Engine Room Exhaust Fan #1', maker:'Novenco', model:'AXVC-900', serial:'EF2018001', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:18420, status:'operational',
              specs:{ flow:'32000 m³/h', power:'22 kW', speed:'980 rpm' },
              jobPlans:[{ id:'JP-ERF-001', title:'Bearing Lubrication', freq:'3 Months', lastDone:'15 Mar 26', nextDue:'15 Jun 26', status:'due-soon', priority:'Normal' }],
              spareParts:[{ partNo:'ERF-BRG-001', name:'Bearing Set', stock:2, min:2, unit:'Set', critical:false }],
            },
            { code:'ERF-002', name:'Engine Room Exhaust Fan #2', maker:'Novenco', model:'AXVC-900', serial:'EF2018002', safetyLevel:'Normal', dept:'Engine', location:'Engine Room', installed:'15 Jan 2018', runHrs:16800, status:'defect',
              specs:{ flow:'32000 m³/h', power:'22 kW', speed:'980 rpm' },
              jobPlans:[{ id:'JP-ERF2-001', title:'Motor Winding Check', freq:'12 Months', lastDone:'12 Apr 25', nextDue:'12 Apr 26', status:'overdue', priority:'High' }],
              spareParts:[{ partNo:'ERF-MTR-001', name:'Fan Motor', stock:0, min:1, unit:'Pcs', critical:true }],
            },
          ],
        },
      ],

      /* ── Upcoming maintenance ── */
      upcoming: [
        { day:'14', month:'Jun', title:'FO Purifier — Disk Stack Cleaning',    meta:'V-2850 · FOP-001 · 500 Hrs · High',       daysLeft:'3 days',  status:'due-soon'  },
        { day:'16', month:'Jun', title:'Fire Detection System — Annual Test',   meta:'O-1930 · FD-MAIN · 12 Month · Critical',  daysLeft:'5 days',  status:'critical'  },
        { day:'22', month:'Jun', title:'Steering Gear — Hydraulic Oil Test',    meta:'V-2852 · STG-001 · 3 Month',              daysLeft:'11 days', status:'scheduled' },
        { day:'28', month:'Jun', title:'Aux Engine #1 — Cylinder Head Overhaul',meta:'V-2855 · AE-001 · 2000 Hrs',             daysLeft:'17 days', status:'scheduled' },
        { day:'05', month:'Jul', title:'Engine Room — Round Job Inspection',    meta:'RJ-012 · Monthly cycle · All Dept.',      daysLeft:'24 days', status:'round-job' },
      ],

      /* ── Open defects ── */
      defects: [
        { id:'DEF-0112', title:'ME Turbocharger — Oil Leak',             section:'Main Engine',  priority:'Urgent', status:'WIP',        date:'08 Jun' },
        { id:'DEF-0111', title:'Steering Gear — Hydraulic Pump Noise',   section:'Steering',     priority:'Urgent', status:'Pending',     date:'06 Jun' },
        { id:'DEF-0109', title:'Navigation Light — Starboard Fault',     section:'Bridge',       priority:'High',   status:'Pending',     date:'05 Jun' },
        { id:'DEF-0108', title:'Bilge Pump — Reduced Efficiency',        section:'Engine Room',  priority:'High',   status:'Wait Spares', date:'03 Jun' },
        { id:'DEF-0107', title:'Main Engine — Exhaust Valve Wear',       section:'Main Engine',  priority:'High',   status:'Shore Asst.', date:'01 Jun' },
        { id:'DEF-0106', title:'Cargo Hold #3 — Hatch Seal Worn',        section:'Cargo',        priority:'Medium', status:'Pending',     date:'30 May' },
      ],

      /* ── Recent activity ── */
      activity: [
        { color:'#dc2626', text:'V-2845 Generator Repair flagged <strong>OVERDUE</strong> — 6 days past due',    time:'8 min ago'  },
        { color:'#16a34a', text:'V-2838 Aux Engine Oil Change — Completed by Motorman Singh',                    time:'35 min ago' },
        { color:'#d97706', text:'Postponement request V-2841 submitted to TSI for approval',                     time:'1 hr ago'   },
        { color:'#1565c0', text:'Running hours updated — Main Engine: 18,420 hrs logged',                        time:'2 hrs ago'  },
        { color:'#7c3aed', text:'GC-0042 Guarantee Claim opened — ME Turbocharger failure',                      time:'3 hrs ago'  },
        { color:'#16a34a', text:'DEF-0110 Cargo pump defect closed after successful repair',                     time:'4 hrs ago'  },
        { color:'#d97706', text:'Spare Nav Antenna ROB (1) fell below minimum stock level (3)',                   time:'5 hrs ago'  },
      ],

      /* ── Notifications ── */
      notifications: [
        { type:'error',   icon:'🚨', title:'V-2841 Main Engine Piston Overhaul is <strong>4 days OVERDUE</strong>',   module:'Due Jobs',     time:'8 min ago',  unread:true  },
        { type:'warning', icon:'⚡', title:'Generator #2 — <strong>110 hrs</strong> remaining to next service',        module:'Running Hours',time:'25 min ago', unread:true  },
        { type:'error',   icon:'🔴', title:'V-2845 Generator Repair <strong>OVERDUE</strong> — 6 days past due',       module:'Due Jobs',     time:'1 hr ago',   unread:true  },
        { type:'warning', icon:'📋', title:'<strong>3 job orders</strong> from crew pending your approval',            module:'Job Order',    time:'2 hrs ago',  unread:true  },
        { type:'error',   icon:'🔩', title:'Nav Antenna ROB (1) below minimum (3) — requisition needed',               module:'Spare Parts',  time:'3 hrs ago',  unread:true  },
        { type:'success', icon:'✅', title:'V-2838 Oil Change completed by Motorman Singh',                            module:'Due Jobs',     time:'4 hrs ago',  unread:false },
        { type:'info',    icon:'📋', title:'O-1918 Hull Inspection approved by TSI',                                   module:'Job Approval', time:'5 hrs ago',  unread:false },
      ],

      /* ── Job Plans ── */
      jobPlans: {
        total: 48,
        calendarBased: 29,
        counterBased: 14,
        conditionBased: 3,
        eventBased: 2,
        notStarted: 5,
        typeDistribution: [29, 14, 3, 2],   // calendar, counter, condition, event
        /* Upcoming by horizon: [dueNow, 7days, 30days, 60days, notStarted] */
        horizonCalendar: [2, 4, 9, 8, 3],
        horizonCounter:  [1, 1, 4, 5, 2],
        records: [
          { equipment:'Main Engine',    title:'Piston Overhaul',             type:'counter',  frequency:'6000 Hrs',  lastDone:'07 Dec 25', nextDue:'18,500 hrs', status:'overdue',     critical:true  },
          { equipment:'Main Engine',    title:'Turbocharger Inspection',     type:'counter',  frequency:'2000 Hrs',  lastDone:'02 Mar 26', nextDue:'20,420 hrs', status:'upcoming',    critical:false },
          { equipment:'Main Engine',    title:'Air Cooler Cleaning',         type:'calendar', frequency:'6 Months',  lastDone:'12 Dec 25', nextDue:'12 Jun 26',  status:'due-soon',    critical:false },
          { equipment:'Main Engine',    title:'Fuel Pump Overhaul',          type:'counter',  frequency:'8000 Hrs',  lastDone:'Not Done',  nextDue:'8,000 hrs',  status:'not-started', critical:true  },
          { equipment:'Generator #2',   title:'Cylinder Head Overhaul',      type:'counter',  frequency:'1000 Hrs',  lastDone:'02 Jan 26', nextDue:'5,000 hrs',  status:'overdue',     critical:true  },
          { equipment:'Generator #2',   title:'Oil Change',                  type:'counter',  frequency:'500 Hrs',   lastDone:'12 Apr 26', nextDue:'5,200 hrs',  status:'upcoming',    critical:false },
          { equipment:'Aux Engine #1',  title:'Cylinder Head Overhaul',      type:'counter',  frequency:'2000 Hrs',  lastDone:'18 Jan 26', nextDue:'6,500 hrs',  status:'upcoming',    critical:false },
          { equipment:'Aux Engine #1',  title:'Injection Pump Service',      type:'calendar', frequency:'3 Months',  lastDone:'14 Mar 26', nextDue:'14 Jun 26',  status:'due-soon',    critical:false },
          { equipment:'FO Purifier',    title:'Disk Stack Cleaning',         type:'counter',  frequency:'500 Hrs',   lastDone:'12 Mar 26', nextDue:'2,500 hrs',  status:'due-soon',    critical:false },
          { equipment:'FO Purifier',    title:'Bowl Assembly Overhaul',      type:'calendar', frequency:'12 Months', lastDone:'10 Jun 25', nextDue:'10 Jun 26',  status:'upcoming',    critical:false },
          { equipment:'Steering Gear',  title:'Hydraulic Oil Test',          type:'calendar', frequency:'3 Months',  lastDone:'22 Mar 26', nextDue:'22 Jun 26',  status:'upcoming',    critical:false },
          { equipment:'Steering Gear',  title:'Hydraulic Pump Overhaul',     type:'calendar', frequency:'24 Months', lastDone:'Not Done',  nextDue:'—',          status:'not-started', critical:false },
          { equipment:'Fire Detection', title:'Annual System Test',          type:'calendar', frequency:'12 Months', lastDone:'16 Jun 25', nextDue:'16 Jun 26',  status:'due-soon',    critical:true  },
          { equipment:'Fire Detection', title:'Smoke Detector Check',        type:'calendar', frequency:'6 Months',  lastDone:'16 Dec 25', nextDue:'16 Jun 26',  status:'due-soon',    critical:false },
          { equipment:'Bilge System',   title:'Pump Strainer Cleaning',      type:'calendar', frequency:'1 Month',   lastDone:'11 May 26', nextDue:'11 Jun 26',  status:'due-soon',    critical:false },
          { equipment:'Cargo Pump',     title:'Bearing Inspection',          type:'counter',  frequency:'1500 Hrs',  lastDone:'Not Done',  nextDue:'1,500 hrs',  status:'not-started', critical:false },
          { equipment:'Air Compressor', title:'Valve & Ring Inspection',     type:'calendar', frequency:'6 Months',  lastDone:'15 Dec 25', nextDue:'15 Jun 26',  status:'due-soon',    critical:false },
          { equipment:'Boiler',         title:'Tube Inspection',             type:'calendar', frequency:'12 Months', lastDone:'20 Apr 26', nextDue:'20 Apr 27',  status:'upcoming',    critical:false },
          { equipment:'FW Generator',   title:'Scale Removal',               type:'calendar', frequency:'3 Months',  lastDone:'10 Mar 26', nextDue:'10 Jun 26',  status:'due-soon',    critical:false },
          { equipment:'Nav Radar',      title:'Annual Calibration',          type:'calendar', frequency:'12 Months', lastDone:'Not Done',  nextDue:'—',          status:'not-started', critical:false },
        ],
      },
    }, // end saraswati

    /* ══════════════════════════════════════════════════
     *  VESSEL — MV Neptune Star
     * ══════════════════════════════════════════════════ */
    neptune: {
      info: { id:'neptune', name:'MV Neptune Star', imo:'IMO 9387421', type:'Tanker', flag:'🇮🇳', status:'operational', location:'Arabian Sea', position:'19.2°N 64.5°E', speed:'12.8 kn', dayAtSea:7, watch:'08:00 – 12:00', chiefEngineer:'Rajan Kumar' },
      kpi: { overdue:0, dueSoon:2, totalJobs:38, completed:36, completionRate:95, defects:2, lowStock:1, pendingApprovals:1 },
      maData: { labels:['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'], jobsDue:[35,32,38,34,36,33,35,37,32,38,36,38], completed:[34,31,37,33,35,33,34,36,31,37,35,36], overdue:[1,1,1,1,1,0,1,1,1,1,1,0] },
      eqStatus: { operational:16, dueSoon:2, defect:0 },
      health: 95,
      jobs: [
        { joNo:'V-3101', equipment:'LO Purifier',   eqCode:'LOP-001', title:'Disk Cleaning',             frequency:'500 Hrs',  lastDone:'14 Mar 26', nextDue:'Due 18 Jun', priority:'High',   status:'due-soon'  },
        { joNo:'V-3102', equipment:'Cargo Pump #1', eqCode:'CP-001',  title:'Bearing Inspection',        frequency:'3 Months', lastDone:'20 Mar 26', nextDue:'Due 20 Jun', priority:'Normal', status:'due-soon'  },
        { joNo:'O-2010', equipment:'Nav Radar',     eqCode:'NAV-001', title:'Annual Calibration',        frequency:'12 Months',lastDone:'25 Jun 25', nextDue:'Due 25 Jun', priority:'Normal', status:'scheduled' },
      ],
      jobOrders: {
        total: 38, summary: { completed:36, inProgress:1, overdue:0, pending:1 },
        statuses: [ { label:'Completed', count:36, color:'#16a34a' }, { label:'In Progress', count:1, color:'#0891b2' }, { label:'Pending', count:1, color:'#1565c0' } ],
      },
      runningHours: [
        { name:'Main Engine',   code:'ME-001',  current:22100, nextDue:24000, status:'good'    },
        { name:'Aux Engine #1', code:'AE-001',  current:8400,  nextDue:9000,  status:'warning' },
        { name:'Cargo Pump #1', code:'CP-001',  current:3200,  nextDue:4000,  status:'good'    },
        { name:'LO Purifier',   code:'LOP-001', current:1450,  nextDue:1500,  status:'warning' },
      ],
      upcoming: [
        { day:'18', month:'Jun', title:'LO Purifier — Disk Cleaning',      meta:'V-3101 · LOP-001 · 500 Hrs · High',   daysLeft:'7 days',  status:'due-soon'  },
        { day:'20', month:'Jun', title:'Cargo Pump — Bearing Inspection',  meta:'V-3102 · CP-001 · 3 Month',            daysLeft:'9 days',  status:'scheduled' },
        { day:'25', month:'Jun', title:'Nav Radar — Annual Calibration',   meta:'O-2010 · NAV-001 · 12 Months',         daysLeft:'14 days', status:'scheduled' },
      ],
      defects: [
        { id:'DEF-0220', title:'Aux Engine #1 — Minor Oil Seep',   section:'Engine Room', priority:'Low',    status:'Monitoring', date:'05 Jun' },
        { id:'DEF-0219', title:'Cargo Pump #2 — Vibration',         section:'Cargo',       priority:'Medium', status:'Pending',    date:'02 Jun' },
      ],
      activity: [
        { color:'#16a34a', text:'Monthly maintenance report submitted to TSI', time:'1 hr ago'  },
        { color:'#1565c0', text:'Running hours updated — all equipment logged', time:'3 hrs ago' },
        { color:'#d97706', text:'LO Purifier approaching next service threshold',time:'6 hrs ago' },
      ],
      notifications: [
        { type:'warning', icon:'⚡', title:'LO Purifier — service due in <strong>7 days</strong>', module:'Due Jobs', time:'1 hr ago', unread:true },
      ],
      jobPlans: {
        total:42, calendarBased:26, counterBased:14, conditionBased:2, eventBased:0, notStarted:2,
        typeDistribution:[26,14,2,0],
        horizonCalendar:[0,1,7,9,1], horizonCounter:[0,1,3,6,1],
        records: [
          { equipment:'Main Engine',   title:'Cylinder Head Overhaul',  type:'counter',  frequency:'2000 Hrs',  lastDone:'10 Mar 26', nextDue:'24,000 hrs', status:'upcoming', critical:false },
          { equipment:'LO Purifier',   title:'Disk Cleaning',           type:'counter',  frequency:'500 Hrs',   lastDone:'14 Mar 26', nextDue:'18 Jun 26',  status:'due-soon', critical:false },
          { equipment:'Nav Radar',     title:'Annual Calibration',      type:'calendar', frequency:'12 Months', lastDone:'25 Jun 25', nextDue:'25 Jun 26',  status:'upcoming', critical:false },
        ],
      },
    }, // end neptune

    /* ══════════════════════════════════════════════════
     *  VESSEL — TS Bay Explorer
     * ══════════════════════════════════════════════════ */
    bayexplorer: {
      info: { id:'bayexplorer', name:'TS Bay Explorer', imo:'IMO 9112345', type:'Survey Vessel', flag:'🇮🇳', status:'maintenance', location:'Kochi Yard', position:'9.9°N 76.3°E', speed:'0 kn', dayAtSea:0, watch:'Day Shift', chiefEngineer:'Rajan Kumar' },
      kpi: { overdue:7, dueSoon:4, totalJobs:52, completed:23, completionRate:44, defects:11, lowStock:6, pendingApprovals:5 },
      maData: { labels:['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'], jobsDue:[48,44,50,46,49,45,47,51,44,52,50,52], completed:[38,34,40,36,39,35,37,41,34,42,40,23], overdue:[4,4,5,4,5,4,4,5,5,4,5,7] },
      eqStatus: { operational:8, dueSoon:4, defect:6 },
      health: 56,
      jobs: [
        { joNo:'V-4201', equipment:'Main Engine',      eqCode:'ME-001',  title:'Major Overhaul',       frequency:'6 Months',  lastDone:'01 Nov 25', nextDue:'21d Overdue', priority:'Critical', status:'overdue'   },
        { joNo:'V-4205', equipment:'Survey Equipment', eqCode:'SEQ-001', title:'Calibration',          frequency:'3 Months',  lastDone:'08 Mar 26', nextDue:'3d Overdue',  priority:'High',     status:'overdue'   },
        { joNo:'V-4207', equipment:'DP System',        eqCode:'DP-MAIN', title:'Annual Test',          frequency:'12 Months', lastDone:'16 Jun 25', nextDue:'Due 16 Jun',  priority:'Critical', status:'due-soon'  },
        { joNo:'O-3001', equipment:'Hull',             eqCode:'HULL-M',  title:'Class Survey',         frequency:'12 Months', lastDone:'—',          nextDue:'Due 20 Jun',  priority:'High',     status:'due-soon'  },
      ],
      jobOrders: {
        total:52, summary:{completed:23,inProgress:7,overdue:7,pending:15},
        statuses:[
          {label:'Completed',count:23,color:'#16a34a'},{label:'Pending',count:15,color:'#1565c0'},
          {label:'Work in Progress',count:7,color:'#0891b2'},{label:'Overdue',count:7,color:'#dc2626'},
        ],
      },
      runningHours: [
        { name:'Main Engine',    code:'ME-001',  current:15200, nextDue:15200, status:'critical' },
        { name:'Generator #1',   code:'GEN-001', current:6800,  nextDue:7000,  status:'warning'  },
        { name:'Survey Winch',   code:'SW-001',  current:980,   nextDue:1000,  status:'warning'  },
      ],
      upcoming: [
        { day:'16', month:'Jun', title:'DP System — Annual Test',     meta:'V-4207 · DP-MAIN · 12 Months · Critical', daysLeft:'5 days',  status:'critical'  },
        { day:'20', month:'Jun', title:'Hull — Class Survey',          meta:'O-3001 · HULL-M · Annual',                daysLeft:'9 days',  status:'due-soon'  },
        { day:'30', month:'Jun', title:'Generator #1 — Overhaul',     meta:'GEN-001 · Counter 7000 Hrs',              daysLeft:'19 days', status:'scheduled' },
      ],
      defects: [
        { id:'DEF-0330', title:'ME — Cooling Water Pump Leak',     section:'Main Engine', priority:'Urgent', status:'WIP',     date:'04 Jun' },
        { id:'DEF-0329', title:'DP System — Thruster #2 Fault',    section:'Bridge',      priority:'Urgent', status:'Pending', date:'02 Jun' },
        { id:'DEF-0328', title:'Survey Winch — Brake Worn',        section:'Deck',        priority:'High',   status:'Pending', date:'01 Jun' },
      ],
      activity: [
        { color:'#dc2626', text:'V-4201 Main Engine Major Overhaul <strong>21 days OVERDUE</strong>', time:'15 min ago' },
        { color:'#d97706', text:'Drydock scheduled — maintenance backlog critical',                    time:'2 hrs ago'  },
        { color:'#1565c0', text:'Shore assistance requested for DEF-0329 DP System fault',             time:'4 hrs ago'  },
      ],
      notifications: [
        { type:'error',   icon:'🚨', title:'Main Engine Overhaul <strong>21 DAYS OVERDUE</strong>',     module:'Due Jobs',  time:'15 min ago', unread:true },
        { type:'error',   icon:'🔴', title:'DP System Annual Test — <strong>5 days to deadline</strong>',module:'Due Jobs',  time:'1 hr ago',   unread:true },
        { type:'warning', icon:'⚡', title:'11 open defects — 2 urgent require immediate attention',    module:'Defects',   time:'2 hrs ago',  unread:true },
      ],
      jobPlans: {
        total:52, calendarBased:30, counterBased:18, conditionBased:4, eventBased:0, notStarted:8,
        typeDistribution:[30,18,4,0],
        horizonCalendar:[3,4,8,6,4], horizonCounter:[2,2,5,5,4],
        records: [
          { equipment:'Main Engine',    title:'Major Overhaul',   type:'counter',  frequency:'6000 Hrs',  lastDone:'01 Nov 25', nextDue:'Overdue',    status:'overdue',     critical:true  },
          { equipment:'DP System',      title:'Annual Test',       type:'calendar', frequency:'12 Months', lastDone:'16 Jun 25', nextDue:'16 Jun 26',  status:'due-soon',    critical:true  },
          { equipment:'Survey Winch',   title:'Brake Inspection',  type:'calendar', frequency:'6 Months',  lastDone:'10 Dec 25', nextDue:'10 Jun 26',  status:'due-soon',    critical:false },
        ],
      },
    }, // end bayexplorer

    /* ══════════════════════════════════════════════════
     *  VESSEL — MV Trident
     * ══════════════════════════════════════════════════ */
    trident: {
      info: { id:'trident', name:'MV Trident', imo:'IMO 9445632', type:'Container Ship', flag:'🇮🇳', status:'operational', location:'Chennai Port', position:'13.1°N 80.3°E', speed:'0 kn', dayAtSea:0, watch:'08:00 – 12:00', chiefEngineer:'Rajan Kumar' },
      kpi: { overdue:0, dueSoon:1, totalJobs:41, completed:39, completionRate:95, defects:1, lowStock:0, pendingApprovals:0 },
      maData: { labels:['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'], jobsDue:[38,35,42,37,39,36,38,41,35,43,40,41], completed:[37,34,41,36,38,35,37,40,34,42,39,39], overdue:[1,1,1,1,1,1,1,1,1,1,1,0] },
      eqStatus: { operational:17, dueSoon:2, defect:0 },
      health: 97,
      jobs: [
        { joNo:'V-5301', equipment:'Main Engine', eqCode:'ME-001', title:'Air Cooler Cleaning', frequency:'6 Months', lastDone:'28 Dec 25', nextDue:'Due 28 Jun', priority:'Normal', status:'scheduled' },
      ],
      jobOrders: {
        total:41, summary:{completed:39,inProgress:1,overdue:0,pending:1},
        statuses:[{label:'Completed',count:39,color:'#16a34a'},{label:'In Progress',count:1,color:'#0891b2'},{label:'Pending',count:1,color:'#1565c0'}],
      },
      runningHours: [
        { name:'Main Engine',   code:'ME-001', current:31400, nextDue:34000, status:'good'    },
        { name:'Aux Engine #1', code:'AE-001', current:9800,  nextDue:10000, status:'warning' },
        { name:'Cargo Crane',   code:'CC-001', current:2100,  nextDue:3000,  status:'good'    },
      ],
      upcoming: [
        { day:'28', month:'Jun', title:'Main Engine — Air Cooler Cleaning', meta:'V-5301 · ME-001 · 6 Months · Normal', daysLeft:'17 days', status:'scheduled' },
      ],
      defects: [
        { id:'DEF-0440', title:'Crane #2 — Hydraulic Hose Seep', section:'Deck', priority:'Low', status:'Monitoring', date:'08 Jun' },
      ],
      activity: [
        { color:'#16a34a', text:'V-5298 Aux Engine Oil Change — Completed successfully', time:'2 hrs ago'  },
        { color:'#1565c0', text:'Port clearance obtained — departure scheduled 14 Jun',  time:'4 hrs ago'  },
      ],
      notifications: [],
      jobPlans: {
        total:41, calendarBased:25, counterBased:14, conditionBased:2, eventBased:0, notStarted:1,
        typeDistribution:[25,14,2,0],
        horizonCalendar:[0,0,4,10,1], horizonCounter:[0,0,2,8,0],
        records: [
          { equipment:'Main Engine',   title:'Air Cooler Cleaning',      type:'calendar', frequency:'6 Months', lastDone:'28 Dec 25', nextDue:'28 Jun 26', status:'upcoming',    critical:false },
          { equipment:'Aux Engine #1', title:'Valve Overhaul',           type:'counter',  frequency:'1000 Hrs', lastDone:'15 Jan 26', nextDue:'10,000 hrs',status:'due-soon',    critical:false },
        ],
      },
    }, // end trident

    /* ══════════════════════════════════════════════════
     *  VESSEL — TS Deep Scan
     * ══════════════════════════════════════════════════ */
    deepscan: {
      info: { id:'deepscan', name:'TS Deep Scan', imo:'IMO 9501234', type:'Research Vessel', flag:'🇮🇳', status:'offline', location:'Visakhapatnam', position:'17.7°N 83.3°E', speed:'0 kn', dayAtSea:0, watch:'—', chiefEngineer:'Rajan Kumar' },
      kpi: { overdue:2, dueSoon:3, totalJobs:29, completed:24, completionRate:83, defects:3, lowStock:2, pendingApprovals:2 },
      maData: { labels:['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'], jobsDue:[28,25,30,27,28,26,27,30,25,30,28,29], completed:[26,23,29,26,27,25,26,28,24,29,27,24], overdue:[2,2,1,1,1,1,1,2,1,1,1,2] },
      eqStatus: { operational:10, dueSoon:3, defect:2 },
      health: 72,
      jobs: [
        { joNo:'V-6401', equipment:'Research Sonar', eqCode:'SN-001',  title:'Calibration',     frequency:'3 Months',  lastDone:'12 Mar 26', nextDue:'1d Overdue', priority:'High',     status:'overdue'   },
        { joNo:'V-6402', equipment:'Aux Engine #2',  eqCode:'AE-002',  title:'Injector Overhaul',frequency:'1000 Hrs', lastDone:'—',          nextDue:'2d Overdue', priority:'Critical', status:'overdue'   },
        { joNo:'O-5001', equipment:'DP System',      eqCode:'DP-MAIN', title:'Annual Test',       frequency:'12 Months',lastDone:'—',          nextDue:'Due 19 Jun', priority:'Critical', status:'due-soon'  },
      ],
      jobOrders: {
        total:29, summary:{completed:24,inProgress:2,overdue:2,pending:1},
        statuses:[
          {label:'Completed',count:24,color:'#16a34a'},{label:'In Progress',count:2,color:'#0891b2'},
          {label:'Overdue',count:2,color:'#dc2626'},{label:'Pending',count:1,color:'#1565c0'},
        ],
      },
      runningHours: [
        { name:'Main Engine',    code:'ME-001',  current:18900, nextDue:20000, status:'good'    },
        { name:'Aux Engine #2',  code:'AE-002',  current:4950,  nextDue:5000,  status:'critical'},
        { name:'Research Sonar', code:'SN-001',  current:820,   nextDue:1000,  status:'good'    },
      ],
      upcoming: [
        { day:'19', month:'Jun', title:'DP System — Annual Test',          meta:'O-5001 · DP-MAIN · 12 Months · Critical', daysLeft:'8 days',  status:'due-soon'  },
        { day:'25', month:'Jun', title:'Main Engine — Cylinder Head OH',    meta:'ME-001 · 20,000 Hrs',                     daysLeft:'14 days', status:'scheduled' },
      ],
      defects: [
        { id:'DEF-0550', title:'Aux Engine #2 — Injector Failure',  section:'Engine Room', priority:'Critical', status:'WIP',     date:'07 Jun' },
        { id:'DEF-0549', title:'Research Sonar — Signal Dropout',   section:'Lab',         priority:'High',     status:'Pending', date:'05 Jun' },
        { id:'DEF-0548', title:'Anchor Winch — Brake Slip',         section:'Deck',        priority:'Medium',   status:'Pending', date:'03 Jun' },
      ],
      activity: [
        { color:'#dc2626', text:'V-6402 Aux Engine #2 Injector Overhaul <strong>OVERDUE</strong>', time:'20 min ago' },
        { color:'#d97706', text:'Shore power connected — vessel in standby mode',                   time:'2 hrs ago'  },
        { color:'#1565c0', text:'Maintenance planning meeting scheduled for tomorrow',              time:'5 hrs ago'  },
      ],
      notifications: [
        { type:'error',   icon:'🚨', title:'V-6402 Aux Engine #2 Injector Overhaul <strong>OVERDUE</strong>', module:'Due Jobs',  time:'20 min ago', unread:true },
        { type:'warning', icon:'⚡', title:'Aux Engine #2 — critical hours threshold reached',                 module:'Running Hours',time:'1 hr ago',unread:true },
      ],
      jobPlans: {
        total:29, calendarBased:17, counterBased:10, conditionBased:2, eventBased:0, notStarted:3,
        typeDistribution:[17,10,2,0],
        horizonCalendar:[1,2,5,4,2], horizonCounter:[1,1,2,3,1],
        records: [
          { equipment:'Aux Engine #2',  title:'Injector Overhaul',   type:'counter',  frequency:'1000 Hrs',  lastDone:'Not Done',  nextDue:'Overdue',   status:'overdue',     critical:true  },
          { equipment:'DP System',      title:'Annual Test',          type:'calendar', frequency:'12 Months', lastDone:'Not Done',  nextDue:'19 Jun 26', status:'due-soon',    critical:true  },
          { equipment:'Research Sonar', title:'Calibration',          type:'calendar', frequency:'3 Months',  lastDone:'12 Mar 26', nextDue:'12 Jun 26', status:'due-soon',    critical:false },
          { equipment:'Main Engine',    title:'Cylinder Head OH',     type:'counter',  frequency:'5000 Hrs',  lastDone:'10 Jan 26', nextDue:'20,000 hrs',status:'upcoming',    critical:false },
        ],
      },
    }, // end deepscan

    /* ══════════════════════════════════════════════════
     *  VESSEL HEALTH SCORES (fleet overview)
     * ══════════════════════════════════════════════════ */
    /* ══════════════════════════════════════════════════
     *  DUE JOBS — Full list per vessel for Due Jobs screen
     *  status: 'overdue' | 'due-soon' | 'scheduled' | 'postponed' | 'waiting-spares' | 'waiting-shore'
     *  joType: 'O' = Office generated, 'V' = Vessel generated
     *  jobType: Planned | Defect | Unplanned | Round Job | Class Survey
     * ══════════════════════════════════════════════════ */
    dueJobs: {
      saraswati: [
        /* ── OVERDUE ── */
        { joNo:'V-2841', joType:'V', equipment:'Main Engine',        eqCode:'ME-001',  title:'Piston Overhaul',              jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Critical', priority:'Critical', freqPrimary:'6 Months', freqSecondary:'—',       lastDoneDate:'07 Dec 25', lastDoneHrs:'15,200', nextDueDate:'07 Jun 26', nextDueHrs:'18,500', daysOverdue:4,  status:'overdue',        flags:['critical'],                  workPermit:true,  riskAssmt:true  },
        { joNo:'V-2845', joType:'V', equipment:'Generator #2',       eqCode:'GEN-002', title:'Generator Overhaul & Repair',  jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Critical', priority:'Critical', freqPrimary:'1000 Hrs', freqSecondary:'—',       lastDoneDate:'02 Jan 26', lastDoneHrs:'4,000',  nextDueDate:'—',         nextDueHrs:'5,000',  daysOverdue:6,  status:'overdue',        flags:['critical'],                  workPermit:false, riskAssmt:true  },
        { joNo:'O-1923', joType:'O', equipment:'Hull Structure',      eqCode:'HULL-M',  title:'Annual Hull Survey',           jobType:'Class Survey',maintType:'Class',          discipline:'Deck',    safetyLevel:'Critical', priority:'High',     freqPrimary:'12 Months',freqSecondary:'—',       lastDoneDate:'09 Jun 25', lastDoneHrs:'—',      nextDueDate:'09 Jun 26', nextDueHrs:'—',      daysOverdue:2,  status:'overdue',        flags:['class'],                     workPermit:false, riskAssmt:false },
        { joNo:'V-2833', joType:'V', equipment:'ME Turbocharger',     eqCode:'TC-001',  title:'Bearing & Seal Inspection',    jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Critical', priority:'Critical', freqPrimary:'4000 Hrs', freqSecondary:'—',       lastDoneDate:'05 Jan 26', lastDoneHrs:'14,420', nextDueDate:'—',         nextDueHrs:'18,420', daysOverdue:1,  status:'overdue',        flags:['critical'],                  workPermit:true,  riskAssmt:true  },

        /* ── DUE SOON (within 7 days) ── */
        { joNo:'V-2850', joType:'V', equipment:'FO Purifier',        eqCode:'FOP-001', title:'Disk Stack Cleaning',          jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Normal',   priority:'High',     freqPrimary:'500 Hrs',  freqSecondary:'6 Months',lastDoneDate:'12 Mar 26', lastDoneHrs:'1,840', nextDueDate:'14 Jun 26', nextDueHrs:'2,500',  daysOverdue:0,  status:'due-soon',       flags:[],                            workPermit:false, riskAssmt:false },
        { joNo:'O-1930', joType:'O', equipment:'Fire Detection Sys.', eqCode:'FD-MAIN', title:'Annual System Function Test',  jobType:'Planned',   maintType:'Company Policy',  discipline:'Deck',    safetyLevel:'Critical', priority:'Critical', freqPrimary:'12 Months',freqSecondary:'—',       lastDoneDate:'16 Jun 25', lastDoneHrs:'—',      nextDueDate:'16 Jun 26', nextDueHrs:'—',      daysOverdue:0,  status:'due-soon',       flags:['critical'],                  workPermit:false, riskAssmt:true  },
        { joNo:'V-2851', joType:'V', equipment:'Air Cooler',          eqCode:'AC-001',  title:'Tube Bundle Cleaning',         jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'6 Months', freqSecondary:'—',       lastDoneDate:'15 Dec 25', lastDoneHrs:'—',      nextDueDate:'15 Jun 26', nextDueHrs:'—',      daysOverdue:0,  status:'due-soon',       flags:[],                            workPermit:false, riskAssmt:false },
        { joNo:'V-2849', joType:'V', equipment:'Bilge System',        eqCode:'BS-001',  title:'Strainer Cleaning',            jobType:'Round Job', maintType:'Company Policy',  discipline:'Engine',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'1 Month',  freqSecondary:'—',       lastDoneDate:'11 May 26', lastDoneHrs:'—',      nextDueDate:'11 Jun 26', nextDueHrs:'—',      daysOverdue:0,  status:'due-soon',       flags:['round-job'],                 workPermit:false, riskAssmt:false },
        { joNo:'O-1929', joType:'O', equipment:'FW Generator',        eqCode:'FWG-001', title:'Scale Removal & Cleaning',     jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'3 Months', freqSecondary:'—',       lastDoneDate:'10 Mar 26', lastDoneHrs:'—',      nextDueDate:'10 Jun 26', nextDueHrs:'—',      daysOverdue:0,  status:'due-soon',       flags:[],                            workPermit:false, riskAssmt:false },

        /* ── SCHEDULED ── */
        { joNo:'V-2852', joType:'V', equipment:'Steering Gear',       eqCode:'STG-001', title:'Hydraulic Oil Test & Analysis',jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Critical', priority:'Normal',   freqPrimary:'3 Months', freqSecondary:'—',       lastDoneDate:'22 Mar 26', lastDoneHrs:'—',      nextDueDate:'22 Jun 26', nextDueHrs:'—',      daysOverdue:0,  status:'scheduled',      flags:[],                            workPermit:false, riskAssmt:false },
        { joNo:'V-2853', joType:'V', equipment:'Aux Engine #1',       eqCode:'AE-001',  title:'Air Filter Cleaning',          jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'1 Month',  freqSecondary:'—',       lastDoneDate:'20 May 26', lastDoneHrs:'—',      nextDueDate:'20 Jun 26', nextDueHrs:'—',      daysOverdue:0,  status:'scheduled',      flags:[],                            workPermit:false, riskAssmt:false },
        { joNo:'V-2855', joType:'V', equipment:'Aux Engine #1',       eqCode:'AE-001',  title:'Cylinder Head Overhaul',       jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'2000 Hrs', freqSecondary:'—',       lastDoneDate:'18 Jan 26', lastDoneHrs:'4,210', nextDueDate:'28 Jun 26', nextDueHrs:'6,500',  daysOverdue:0,  status:'scheduled',      flags:[],                            workPermit:true,  riskAssmt:false },
        { joNo:'V-2856', joType:'V', equipment:'Cargo Pump #1',       eqCode:'CP-001',  title:'Bearing Inspection',           jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'1500 Hrs', freqSecondary:'—',       lastDoneDate:'—',         lastDoneHrs:'—',      nextDueDate:'30 Jun 26', nextDueHrs:'1,500',  daysOverdue:0,  status:'scheduled',      flags:[],                            workPermit:false, riskAssmt:false },
        { joNo:'O-1931', joType:'O', equipment:'Lifeboat Engine',     eqCode:'LB-ENG',  title:'Annual Engine Test',           jobType:'Planned',   maintType:'Statutory',       discipline:'Deck',    safetyLevel:'Critical', priority:'Critical', freqPrimary:'12 Months',freqSecondary:'—',       lastDoneDate:'10 Jun 25', lastDoneHrs:'—',      nextDueDate:'10 Jul 26', nextDueHrs:'—',      daysOverdue:0,  status:'scheduled',      flags:['critical','class'],          workPermit:false, riskAssmt:false },
        { joNo:'V-2857', joType:'V', equipment:'Boiler',              eqCode:'BLR-001', title:'Water Treatment Check',        jobType:'Round Job', maintType:'Company Policy',  discipline:'Engine',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'1 Week',   freqSecondary:'—',       lastDoneDate:'04 Jun 26', lastDoneHrs:'—',      nextDueDate:'11 Jun 26', nextDueHrs:'—',      daysOverdue:0,  status:'due-soon',       flags:['round-job'],                 workPermit:false, riskAssmt:false },
        { joNo:'V-2858', joType:'V', equipment:'Nav Radar',           eqCode:'NAV-001', title:'Annual Calibration',           jobType:'Planned',   maintType:'Manufacturer',    discipline:'Bridge',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'12 Months',freqSecondary:'—',       lastDoneDate:'—',         lastDoneHrs:'—',      nextDueDate:'15 Jul 26', nextDueHrs:'—',      daysOverdue:0,  status:'scheduled',      flags:[],                            workPermit:false, riskAssmt:false },
        { joNo:'V-2859', joType:'V', equipment:'Air Compressor',      eqCode:'AC-COMP', title:'Valve & Ring Inspection',      jobType:'Planned',   maintType:'Manufacturer',    discipline:'Engine',  safetyLevel:'Normal',   priority:'Normal',   freqPrimary:'6 Months', freqSecondary:'—',       lastDoneDate:'15 Dec 25', lastDoneHrs:'—',      nextDueDate:'15 Jun 26', nextDueHrs:'—',      daysOverdue:0,  status:'due-soon',       flags:[],                            workPermit:false, riskAssmt:false },
        { joNo:'V-2860', joType:'V', equipment:'Aux Engine #2',       eqCode:'AE-002',  title:'Injector Overhaul',            jobType:'Defect',    maintType:'Company Policy',  discipline:'Engine',  safetyLevel:'High',     priority:'High',     freqPrimary:'—',        freqSecondary:'—',       lastDoneDate:'—',         lastDoneHrs:'—',      nextDueDate:'In Progress',nextDueHrs:'—',    daysOverdue:0,  status:'in-progress',    flags:[],                            workPermit:true,  riskAssmt:false },

        /* ── POSTPONED ── */
        { joNo:'V-2840', joType:'V', equipment:'Hydraulic System',    eqCode:'HYD-001', title:'Pressure Relief Valve Test',   jobType:'Planned',   maintType:'Company Policy',  discipline:'Engine',  safetyLevel:'High',     priority:'High',     freqPrimary:'6 Months', freqSecondary:'—',       lastDoneDate:'10 Dec 25', lastDoneHrs:'—',      nextDueDate:'Postponed',  nextDueHrs:'—',    daysOverdue:0,  status:'postponed',      flags:['postponed'],                 workPermit:false, riskAssmt:false },

        /* ── WAITING FOR SPARES ── */
        { joNo:'V-2848', joType:'V', equipment:'Bilge Pump',          eqCode:'BP-001',  title:'Efficiency Restoration Repair',jobType:'Defect',    maintType:'Company Policy',  discipline:'Engine',  safetyLevel:'High',     priority:'High',     freqPrimary:'—',        freqSecondary:'—',       lastDoneDate:'—',         lastDoneHrs:'—',      nextDueDate:'Wait Spares',nextDueHrs:'—',    daysOverdue:0,  status:'waiting-spares', flags:['waiting-spares'],            workPermit:false, riskAssmt:false },
      ],
    },

    fleetHealth: [
      { name:'MV Saraswati',   score:84, color:'#16a34a' },
      { name:'MV Neptune Star',score:95, color:'#16a34a' },
      { name:'TS Bay Explorer',score:56, color:'#dc2626' },
      { name:'MV Trident',     score:97, color:'#16a34a' },
      { name:'TS Deep Scan',   score:72, color:'#d97706' },
    ],

  }; // end SAMPLE_DATA

  /* ══════════════════════════════════════════════════
   *  PUBLIC API
   *  ─────────────────────────────────────────────────
   *  window.PAL4.loadVessel(vesselId)
   *    → Promise<VesselDashboard>
   *
   *  To swap to REST API, replace the body of this
   *  function with your fetch() call.
   * ══════════════════════════════════════════════════ */
  global.PAL4 = {

    /**
     * Load dashboard data for a given vessel.
     * @param {string} vesselId - e.g. 'saraswati'
     * @returns {Promise<object>}
     *
     * FUTURE REST EXAMPLE:
     *   const res = await fetch(`/api/v1/dashboard/${vesselId}`, {
     *     headers: { 'Authorization': `Bearer ${PAL4.getToken()}` }
     *   });
     *   return res.json();
     */
    loadVessel: function (vesselId) {
      return Promise.resolve(SAMPLE_DATA[vesselId] || SAMPLE_DATA.saraswati);
    },

    /**
     * Load the vessel list for the dropdown.
     * @returns {Promise<Array>}
     *
     * FUTURE REST EXAMPLE:
     *   const res = await fetch('/api/v1/vessels');
     *   return res.json();
     */
    loadVesselList: function () {
      return Promise.resolve(SAMPLE_DATA.vesselList);
    },

    /**
     * Load fleet health scores.
     * @returns {Promise<Array>}
     */
    loadFleetHealth: function () {
      return Promise.resolve(SAMPLE_DATA.fleetHealth);
    },

    /**
     * Synchronous accessor — returns data directly from the local cache.
     * Use this from the dashboard JS while working with sample data.
     * Switch to `await loadVessel(id)` when connecting to REST API.
     */
    getVessel: function (vesselId) {
      return SAMPLE_DATA[vesselId] || SAMPLE_DATA.saraswati;
    },

    /** Equipment tree for a given vessel. */
    getEquipmentTree: function (vesselId) {
      const v = SAMPLE_DATA[vesselId] || SAMPLE_DATA.saraswati;
      return v.equipmentTree || [];
    },

    /** Synchronous vessel list for dropdown. */
    getVesselList: function () {
      return SAMPLE_DATA.vesselList;
    },

    /** Synchronous fleet health for the health score widget. */
    getFleetHealth: function () {
      return SAMPLE_DATA.fleetHealth;
    },

    /** Full Due Jobs list for a vessel — use for the Due Jobs screen. */
    getDueJobs: function (vesselId) {
      return (SAMPLE_DATA.dueJobs || {})[vesselId] || [];
    },

    /* Auth token helper (stub — replace with your auth logic) */
    getToken: function () {
      return localStorage.getItem('pal4_token') || '';
    },
  };

})(window);
