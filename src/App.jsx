import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const C = {
  bg: "#0b0e14", surface: "#131720", card: "#181e2a", border: "#222840",
  text: "#e2e8f0", muted: "#566080", electricity: "#f5c842",
  water_cold: "#4fc3f7", water_hot: "#ff7043", heating: "#ef5350",
  management: "#66bb6a",
};

const INVOICES = [
  {
    period: "2025-01", label: "Jan '25", partial: true, note: "5/31 days",
    grand_total: 41.56, electricity_day_kwh: 15, electricity_night_kwh: 18, electricity_total_kwh: 33,
    electricity_day_price: 0.220697, electricity_night_price: 0.121366,
    electricity_day_total: 3.31, electricity_night_total: 2.18, electricity_common_total: 1.71, electricity_total: 7.20,
    cold_water_m3: 0.599, hot_water_m3: 0.504, cold_water_total: 2.49, hot_water_heating_total: 2.76, water_total: 5.29,
    heating_per_m2: 1.44721, heating_total: 17.81,
    mgmt_admin: 0.47, mgmt_board: 0.68, mgmt_accounting: 0.51, mgmt_technical: 0.78, mgmt_ats: 0.26, mgmt_lift: 0.35,
    mgmt_cleaning_in: 1.04, mgmt_cleaning_out: 1.57, mgmt_doormats: 0.26, mgmt_snow: 0.30, mgmt_reserve: 3.69,
    mgmt_phones: 0.03, mgmt_parking: 0.03, mgmt_insurance: 0.32, mgmt_waste: 0.97, mgmt_payment: 0,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 11.26,
  },
  {
    period: "2025-02", label: "Feb '25",
    grand_total: 349.37, electricity_day_kwh: 144, electricity_night_kwh: 112, electricity_total_kwh: 256,
    electricity_day_price: 0.285036, electricity_night_price: 0.205594,
    electricity_day_total: 41.05, electricity_night_total: 23.03, electricity_common_total: 19.47, electricity_total: 83.55,
    cold_water_m3: 6.946, hot_water_m3: 8.804, cold_water_total: 35.55, hot_water_heating_total: 48.60, water_total: 84.20,
    heating_per_m2: 1.48899, heating_total: 113.61,
    mgmt_admin: 2.94, mgmt_board: 4.20, mgmt_accounting: 3.16, mgmt_technical: 4.83, mgmt_ats: 1.59, mgmt_lift: 2.18,
    mgmt_cleaning_in: 6.45, mgmt_cleaning_out: 9.72, mgmt_doormats: 1.60, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.17, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 5.99, mgmt_payment: 0.03,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 68.01,
  },
  {
    period: "2025-03", label: "Mar '25",
    grand_total: 304.01, electricity_day_kwh: 111, electricity_night_kwh: 119, electricity_total_kwh: 230,
    electricity_day_price: 0.214973, electricity_night_price: 0.128038,
    electricity_day_total: 23.86, electricity_night_total: 15.24, electricity_common_total: 10.81, electricity_total: 49.91,
    cold_water_m3: 8.416, hot_water_m3: 8.552, cold_water_total: 38.30, hot_water_heating_total: 47.21, water_total: 85.51,
    heating_per_m2: 1.14718, heating_total: 87.53,
    mgmt_admin: 2.94, mgmt_board: 4.20, mgmt_accounting: 3.16, mgmt_technical: 4.83, mgmt_ats: 1.59, mgmt_lift: 2.18,
    mgmt_cleaning_in: 6.45, mgmt_cleaning_out: 9.72, mgmt_doormats: 1.60, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.18, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 6.42, mgmt_payment: 0.03,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 12.61, management_total: 81.06,
  },
  {
    period: "2025-04", label: "Apr '25",
    grand_total: 273.67, electricity_day_kwh: 121, electricity_night_kwh: 88, electricity_total_kwh: 209,
    electricity_day_price: 0.178036, electricity_night_price: 0.116289,
    electricity_day_total: 21.54, electricity_night_total: 10.23, electricity_common_total: 10.32, electricity_total: 42.09,
    cold_water_m3: 8.831, hot_water_m3: 10.186, cold_water_total: 42.92, hot_water_heating_total: 55.31, water_total: 96.79,
    heating_per_m2: 0.73853, heating_total: 56.35,
    mgmt_admin: 2.94, mgmt_board: 4.20, mgmt_accounting: 3.39, mgmt_technical: 4.83, mgmt_ats: 1.59, mgmt_lift: 2.18,
    mgmt_cleaning_in: 6.45, mgmt_cleaning_out: 5.80, mgmt_doormats: 1.60, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.18, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 6.91, mgmt_payment: 0.03,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 13.19, mgmt_extra: 0, management_total: 78.44,
  },
  {
    period: "2025-05", label: "May '25",
    grand_total: 264.25, electricity_day_kwh: 122, electricity_night_kwh: 96, electricity_total_kwh: 218,
    electricity_day_price: 0.155720, electricity_night_price: 0.125081,
    electricity_day_total: 19.00, electricity_night_total: 12.01, electricity_common_total: 8.82, electricity_total: 39.83,
    cold_water_m3: 10.055, hot_water_m3: 12.075, cold_water_total: 56.70, hot_water_heating_total: 65.57, water_total: 123.38,
    heating_per_m2: 0.42414, heating_total: 32.36,
    mgmt_admin: 2.94, mgmt_board: 4.20, mgmt_accounting: 3.16, mgmt_technical: 4.83, mgmt_ats: 1.59, mgmt_lift: 2.18,
    mgmt_cleaning_in: 6.45, mgmt_cleaning_out: 5.80, mgmt_doormats: 1.60, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.22, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 6.35, mgmt_payment: 0.03,
    mgmt_lawn: 1.11, mgmt_windows: 3.07, mgmt_garage: 0, mgmt_extra: 0, management_total: 68.68,
  },
  {
    period: "2025-06", label: "Jun '25",
    grand_total: 183.33, electricity_day_kwh: 126, electricity_night_kwh: 110, electricity_total_kwh: 236,
    electricity_day_price: 0.129584, electricity_night_price: 0.083899,
    electricity_day_total: 16.33, electricity_night_total: 9.23, electricity_common_total: 3.79, electricity_total: 29.35,
    cold_water_m3: 6.901, hot_water_m3: 8.855, cold_water_total: 40.37, hot_water_heating_total: 48.15, water_total: 88.19,
    heating_per_m2: 0, heating_total: 0,
    mgmt_admin: 2.94, mgmt_board: 4.20, mgmt_accounting: 3.16, mgmt_technical: 4.83, mgmt_ats: 1.59, mgmt_lift: 2.18,
    mgmt_cleaning_in: 6.45, mgmt_cleaning_out: 5.80, mgmt_doormats: 1.60, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.24, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 6.51, mgmt_payment: 0.03,
    mgmt_lawn: 1.11, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 65.79,
  },
  {
    period: "2025-07", label: "Jul '25",
    grand_total: 170.17, electricity_day_kwh: 132, electricity_night_kwh: 134, electricity_total_kwh: 266,
    electricity_day_price: 0.121666, electricity_night_price: 0.085391,
    electricity_day_total: 16.06, electricity_night_total: 11.44, electricity_common_total: 5.25, electricity_total: 32.75,
    cold_water_m3: 7.358, hot_water_m3: 6.620, cold_water_total: 36.40, hot_water_heating_total: 34.52, water_total: 70.78,
    heating_per_m2: 0, heating_total: 0,
    mgmt_admin: 2.99, mgmt_board: 4.20, mgmt_accounting: 3.21, mgmt_technical: 4.91, mgmt_ats: 1.62, mgmt_lift: 2.22,
    mgmt_cleaning_in: 6.56, mgmt_cleaning_out: 5.89, mgmt_doormats: 1.61, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.24, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 6.88, mgmt_payment: 0.03,
    mgmt_lawn: 1.13, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 67.07,
  },
  {
    period: "2025-08", label: "Aug '25",
    grand_total: 179.49, electricity_day_kwh: 105, electricity_night_kwh: 105, electricity_total_kwh: 210,
    electricity_day_price: 0.190080, electricity_night_price: 0.128448,
    electricity_day_total: 19.96, electricity_night_total: 13.49, electricity_common_total: 7.93, electricity_total: 41.38,
    cold_water_m3: 7.515, hot_water_m3: 7.026, cold_water_total: 37.86, hot_water_heating_total: 35.99, water_total: 73.45,
    heating_per_m2: 0, heating_total: 0,
    mgmt_admin: 2.99, mgmt_board: 4.20, mgmt_accounting: 2.32, mgmt_technical: 4.91, mgmt_ats: 1.62, mgmt_lift: 2.22,
    mgmt_cleaning_in: 6.56, mgmt_cleaning_out: 5.89, mgmt_doormats: 1.62, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.24, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 6.91, mgmt_payment: 0.03,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 64.66,
  },
  {
    period: "2025-09", label: "Sep '25",
    grand_total: 168.20, electricity_day_kwh: 85, electricity_night_kwh: 88, electricity_total_kwh: 173,
    electricity_day_price: 0.205642, electricity_night_price: 0.117937,
    electricity_day_total: 17.48, electricity_night_total: 10.38, electricity_common_total: 10.82, electricity_total: 38.68,
    cold_water_m3: 4.643, hot_water_m3: 5.251, cold_water_total: 25.76, hot_water_heating_total: 23.18, water_total: 48.64,
    heating_per_m2: 0.21264, heating_total: 16.22,
    mgmt_admin: 2.99, mgmt_board: 4.20, mgmt_accounting: 2.32, mgmt_technical: 4.91, mgmt_ats: 1.62, mgmt_lift: 2.22,
    mgmt_cleaning_in: 6.56, mgmt_cleaning_out: 5.89, mgmt_doormats: 1.62, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.24, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 6.91, mgmt_payment: 0.03,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 64.66,
  },
  {
    period: "2025-10", label: "Oct '25", note: "away from home",
    grand_total: 153.00, electricity_day_kwh: 19, electricity_night_kwh: 24, electricity_total_kwh: 43,
    electricity_day_price: 0.240210, electricity_night_price: 0.102267,
    electricity_day_total: 4.56, electricity_night_total: 2.45, electricity_common_total: 13.11, electricity_total: 20.12,
    cold_water_m3: 0.041, hot_water_m3: 0.008, cold_water_total: 0.13, hot_water_heating_total: 0.04, water_total: -0.13,
    heating_per_m2: 0.81797, heating_total: 62.41,
    mgmt_admin: 2.99, mgmt_board: 4.20, mgmt_accounting: 2.32, mgmt_technical: 4.91, mgmt_ats: 1.62, mgmt_lift: 2.22,
    mgmt_cleaning_in: 6.56, mgmt_cleaning_out: 9.88, mgmt_doormats: 3.24, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.24, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 7.27, mgmt_payment: 0,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 70.21,
  },
  {
    period: "2025-11", label: "Nov '25", note: "away from home",
    grand_total: 171.51, electricity_day_kwh: 21, electricity_night_kwh: 24, electricity_total_kwh: 45,
    electricity_day_price: 0.241796, electricity_night_price: 0.119971,
    electricity_day_total: 5.08, electricity_night_total: 2.88, electricity_common_total: 9.97, electricity_total: 17.93,
    cold_water_m3: 0.016, hot_water_m3: 0, cold_water_total: 0.04, hot_water_heating_total: 0, water_total: -0.20,
    heating_per_m2: 1.14728, heating_total: 87.54,
    mgmt_admin: 2.99, mgmt_board: 4.20, mgmt_accounting: 2.32, mgmt_technical: 4.91, mgmt_ats: 1.62, mgmt_lift: 2.22,
    mgmt_cleaning_in: 6.56, mgmt_cleaning_out: 9.88, mgmt_doormats: 1.62, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.24, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 4.47, mgmt_payment: 0.06,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 66.24,
  },
  {
    period: "2025-12", label: "Dec '25",
    grand_total: 255.29, electricity_day_kwh: 99, electricity_night_kwh: 76, electricity_total_kwh: 175,
    electricity_day_price: 0.205375, electricity_night_price: 0.101402,
    electricity_day_total: 20.33, electricity_night_total: 7.71, electricity_common_total: 17.76, electricity_total: 45.80,
    cold_water_m3: 3.674, hot_water_m3: 4.555, cold_water_total: 21.43, hot_water_heating_total: 24.46, water_total: 45.98,
    heating_per_m2: 1.23603, heating_total: 94.31,
    mgmt_admin: 2.99, mgmt_board: 4.20, mgmt_accounting: 2.32, mgmt_technical: 4.91, mgmt_ats: 1.62, mgmt_lift: 2.22,
    mgmt_cleaning_in: 6.56, mgmt_cleaning_out: 9.88, mgmt_doormats: 1.62, mgmt_snow: 0, mgmt_reserve: 22.89,
    mgmt_phones: 0.24, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 7.46, mgmt_payment: 0.03,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 69.20,
  },
  {
    period: "2026-01", label: "Jan '26",
    grand_total: 420.31, electricity_day_kwh: 151, electricity_night_kwh: 164, electricity_total_kwh: 315,
    electricity_day_price: 0.341250, electricity_night_price: 0.199755,
    electricity_day_total: 51.53, electricity_night_total: 32.76, electricity_common_total: 14.67, electricity_total: 98.96,
    cold_water_m3: 6.404, hot_water_m3: 7.447, cold_water_total: 36.07, hot_water_heating_total: 41.79, water_total: 77.94,
    heating_per_m2: 2.26536, heating_total: 172.85,
    mgmt_admin: 2.99, mgmt_board: 4.20, mgmt_accounting: 2.32, mgmt_technical: 4.91, mgmt_ats: 1.62, mgmt_lift: 2.35,
    mgmt_cleaning_in: 6.56, mgmt_cleaning_out: 9.88, mgmt_doormats: 1.70, mgmt_snow: 1.80, mgmt_reserve: 22.89,
    mgmt_phones: 0.24, mgmt_parking: 0.17, mgmt_insurance: 2.09, mgmt_waste: 6.81, mgmt_payment: 0.03,
    mgmt_lawn: 0, mgmt_windows: 0, mgmt_garage: 0, mgmt_extra: 0, management_total: 70.56,
  },
];

const FULL = INVOICES.filter(i => !i.partial);
const CHART_TYPES = ["Line", "Bar", "Area"];
const GROUPS = ["overview", "electricity", "water", "heating", "management"];
const GROUP_LABELS = { overview: "Overview", electricity: "⚡ Electricity", water: "💧 Water", heating: "🔥 Heating", management: "🏢 Management" };

const MGMT_ITEMS = [
  { field: "mgmt_reserve",       label: "Reserve Fund",           color: "#a5d6a7" },
  { field: "mgmt_cleaning_out",  label: "Outdoor Cleaning",       color: "#81c784" },
  { field: "mgmt_cleaning_in",   label: "Indoor Cleaning",        color: "#66bb6a" },
  { field: "mgmt_waste",         label: "Waste Collection",       color: "#4caf50" },
  { field: "mgmt_insurance",     label: "Insurance",              color: "#388e3c" },
  { field: "mgmt_technical",     label: "Technical Maint.",       color: "#00bcd4" },
  { field: "mgmt_lift",          label: "Elevator",               color: "#0097a7" },
  { field: "mgmt_ats",           label: "Alarm System",           color: "#00838f" },
  { field: "mgmt_board",         label: "Board Fee",              color: "#b2dfdb" },
  { field: "mgmt_admin",         label: "Administration",         color: "#80cbc4" },
  { field: "mgmt_accounting",    label: "Accounting",             color: "#4db6ac" },
  { field: "mgmt_doormats",      label: "Doormats",               color: "#c8e6c9" },
  { field: "mgmt_phones",        label: "Phones & Remote",        color: "#b0bec5" },
  { field: "mgmt_parking",       label: "Parking Control",        color: "#90a4ae" },
  { field: "mgmt_snow",          label: "Snow Removal",           color: "#b3e5fc" },
  { field: "mgmt_lawn",          label: "Lawn Mowing",            color: "#dcedc8" },
  { field: "mgmt_windows",       label: "Window Washing",         color: "#fff9c4" },
  { field: "mgmt_garage",        label: "Garage Cleaning",        color: "#ffe0b2" },
  { field: "mgmt_extra",         label: "One-off Extras",         color: "#f8bbd0" },
];

const METRICS = {
  overview: [
    { key: "grand_total",       label: "Total Bill (€)",      color: "#e879f9" },
    { key: "electricity_total", label: "Electricity (€)",     color: C.electricity },
    { key: "water_total",       label: "Water (€)",           color: C.water_cold },
    { key: "heating_total",     label: "Heating (€)",         color: C.heating },
    { key: "management_total",  label: "Management (€)",      color: C.management },
  ],
  electricity: [
    { key: "electricity_total_kwh",    label: "Total (kWh)",          color: C.electricity },
    { key: "electricity_day_kwh",      label: "Day (kWh)",            color: "#ffd54f" },
    { key: "electricity_night_kwh",    label: "Night (kWh)",          color: "#ffe082" },
    { key: "electricity_day_price",    label: "Day Price (€/kWh)",    color: "#ffb300" },
    { key: "electricity_night_price",  label: "Night Price (€/kWh)",  color: "#ff8f00" },
    { key: "electricity_day_total",    label: "Day Cost (€)",         color: "#ffa000" },
    { key: "electricity_night_total",  label: "Night Cost (€)",       color: "#ff6f00" },
    { key: "electricity_common_total", label: "Common Area (€)",      color: "#ffe57f" },
    { key: "electricity_total",        label: "Total Cost (€)",       color: "#f5c842" },
  ],
  water: [
    { key: "cold_water_m3",           label: "Cold Water (m³)",          color: C.water_cold },
    { key: "hot_water_m3",            label: "Hot Water (m³)",           color: C.water_hot },
    { key: "cold_water_total",        label: "Cold Water Cost (€)",      color: "#29b6f6" },
    { key: "hot_water_heating_total", label: "Hot Water Heating (€)",    color: "#ff7043" },
    { key: "water_total",             label: "Total Water (€)",          color: "#81d4fa" },
  ],
  heating: [
    { key: "heating_total",    label: "Heating Total (€)",      color: C.heating },
    { key: "heating_per_m2",   label: "Price per m² (€/m²)",   color: "#ef9a9a" },
  ],
  management: [
    { key: "management_total", label: "Total Management (€)", color: C.management },
    ...MGMT_ITEMS.map(m => ({ key: m.field, label: `${m.label} (€)`, color: m.color })),
  ],
};

function fmtVal(v, label) {
  if (v == null) return "—";
  if (label?.includes("kWh)")) return `${v} kWh`;
  if (label?.includes("m³)")) return `${v.toFixed(3)} m³`;
  if (label?.includes("/kWh)")) return `€${v.toFixed(4)}`;
  if (label?.includes("/m²)")) return `€${v.toFixed(5)}`;
  return `€${v.toFixed(2)}`;
}

const CustomTooltip = ({ active, payload, label, metrics }) => {
  if (!active || !payload?.length) return null;
  const inv = INVOICES.find(i => i.label === label);
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", minWidth: 220, maxHeight: 300, overflowY: "auto" }}>
      <div style={{ color: C.muted, fontSize: 11, marginBottom: 6 }}>{label}{inv?.note ? ` · ${inv.note}` : ""}</div>
      {payload.filter(p => p.value > 0).map(p => {
        const m = metrics.find(x => x.key === p.dataKey);
        return (
          <div key={p.dataKey} style={{ color: p.color, fontSize: 12, marginBottom: 3 }}>
            {m?.label}: <strong>{fmtVal(p.value, m?.label)}</strong>
          </div>
        );
      })}
    </div>
  );
};

function StatCard({ label, color, field }) {
  const vals = FULL.filter(i => i[field] > 0).map(i => i[field]);
  if (!vals.length) return null;
  const latest = FULL[FULL.length - 1][field];
  const prev = FULL[FULL.length - 2][field];
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  const max = Math.max(...vals), min = Math.min(...vals);
  const pct = prev ? Math.round((latest - prev) / prev * 100) : null;
  const up = pct > 0;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", borderLeft: `3px solid ${color}` }}>
      <div style={{ color: C.muted, fontSize: 11, marginBottom: 5 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 17, color, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        €{latest?.toFixed(2)}
        {pct !== null && <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 99, background: up ? "rgba(239,83,80,0.15)" : "rgba(102,187,106,0.15)", color: up ? "#ef5350" : "#66bb6a" }}>{up ? "▲" : "▼"}{Math.abs(pct)}%</span>}
      </div>
      <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>Avg €{avg.toFixed(0)} · Min €{min.toFixed(0)} · Max €{max.toFixed(0)}</div>
    </div>
  );
}

export default function App() {
  const [activeGroup, setActiveGroup] = useState("overview");
  const [chartType, setChartType] = useState("Line");
  const [selected, setSelected] = useState(["grand_total", "electricity_total", "water_total", "heating_total", "management_total"]);
  const [showPartial, setShowPartial] = useState(false);

  const metrics = METRICS[activeGroup];
  const visibleMetrics = selected.filter(k => metrics.find(m => m.key === k));
  const toggle = (k) => setSelected(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);
  const ChartComp = chartType === "Bar" ? BarChart : chartType === "Area" ? AreaChart : LineChart;
  const displayData = showPartial ? INVOICES : INVOICES.filter(i => !i.partial);
  const avgMonthly = FULL.reduce((s, i) => s + i.grand_total, 0) / FULL.length;
  const fullMonths = FULL.filter(i => !i.partial);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "system-ui, sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } .btn { cursor: pointer; transition: all 0.15s; } .btn:hover { opacity: 0.8; }`}</style>

      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>⚡ UtilityLens</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>Kadaka tee 137-1 · 13 invoices · Jan 2025 – Jan 2026</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ color: C.muted, fontSize: 12 }}>Avg/month: <strong style={{ color: C.text }}>€{avgMonthly.toFixed(2)}</strong></span>
          <button className="btn" onClick={() => setShowPartial(p => !p)}
            style={{ background: showPartial ? "rgba(245,200,66,0.15)" : "transparent", color: showPartial ? C.electricity : C.muted, border: `1px solid ${showPartial ? C.electricity : C.border}`, borderRadius: 8, padding: "5px 12px", fontSize: 11, cursor: "pointer" }}>
            {showPartial ? "●" : "○"} Partial Jan
          </button>
          {CHART_TYPES.map(t => (
            <button key={t} className="btn" onClick={() => setChartType(t)}
              style={{ background: chartType === t ? C.electricity : "transparent", color: chartType === t ? "#000" : C.muted, border: `1px solid ${chartType === t ? C.electricity : C.border}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1150, margin: "0 auto", padding: "24px 16px" }}>

        <div style={{ background: "rgba(86,96,128,0.1)", border: "1px solid rgba(86,96,128,0.25)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: C.muted }}>
          📋 Still missing: <strong style={{ color: C.text }}>Feb 2026</strong> — expected in March.
        </div>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 10, marginBottom: 24 }}>
          <StatCard label="Total Bill" color="#e879f9" field="grand_total" />
          <StatCard label="Electricity" color={C.electricity} field="electricity_total" />
          <StatCard label="Water" color={C.water_cold} field="water_total" />
          <StatCard label="Heating" color={C.heating} field="heating_total" />
          <StatCard label="Management" color={C.management} field="management_total" />
        </div>

        {/* Group tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {GROUPS.map(g => (
            <button key={g} className="btn" onClick={() => {
              setActiveGroup(g);
              setSelected(g === "management"
                ? ["management_total", "mgmt_reserve", "mgmt_cleaning_out", "mgmt_cleaning_in", "mgmt_waste"]
                : METRICS[g].slice(0, 3).map(m => m.key));
            }}
              style={{ background: activeGroup === g ? C.card : "transparent", color: activeGroup === g ? C.text : C.muted, border: `1px solid ${activeGroup === g ? C.border : "transparent"}`, borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {GROUP_LABELS[g]}
            </button>
          ))}
        </div>

        {/* Metric toggles */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {metrics.map(({ key, label, color }) => {
            const on = visibleMetrics.includes(key);
            return (
              <div key={key} className="btn" onClick={() => toggle(key)}
                style={{ background: on ? `${color}22` : "transparent", border: `1px solid ${on ? color : C.border}`, borderRadius: 20, padding: "5px 12px", fontSize: 11, color: on ? color : C.muted, userSelect: "none" }}>
                {on ? "●" : "○"} {label}
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 12px 12px", marginBottom: 28 }}>
          {visibleMetrics.length === 0
            ? <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>Select at least one metric above</div>
            : (
              <ResponsiveContainer width="100%" height={340}>
                <ChartComp data={displayData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="label" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip metrics={metrics} />} />
                  <Legend wrapperStyle={{ paddingTop: 10, fontSize: 11 }} formatter={(v) => <span style={{ color: metrics.find(m => m.key === v)?.color }}>{metrics.find(m => m.key === v)?.label}</span>} />
                  {visibleMetrics.map(k => {
                    const m = metrics.find(x => x.key === k);
                    if (chartType === "Bar") return <Bar key={k} dataKey={k} fill={m.color} radius={[4, 4, 0, 0]} />;
                    if (chartType === "Area") return <Area key={k} type="monotone" dataKey={k} stroke={m.color} fill={`${m.color}33`} strokeWidth={2.5} dot={{ fill: m.color, r: 4 }} activeDot={{ r: 6 }} connectNulls />;
                    return <Line key={k} type="monotone" dataKey={k} stroke={m.color} strokeWidth={2.5} dot={{ fill: m.color, r: 4 }} activeDot={{ r: 6 }} connectNulls />;
                  })}
                </ChartComp>
              </ResponsiveContainer>
            )}
        </div>

        {/* Management breakdown table */}
        {activeGroup === "management" && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ color: C.muted, fontSize: 11, marginBottom: 10, letterSpacing: "0.08em" }}>FULL MANAGEMENT BREAKDOWN</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ padding: "10px 14px", color: C.muted, textAlign: "left", fontWeight: 500, whiteSpace: "nowrap", minWidth: 160 }}>Line Item</th>
                    {fullMonths.map(inv => (
                      <th key={inv.period} style={{ padding: "10px 8px", color: C.text, textAlign: "right", fontWeight: 600, whiteSpace: "nowrap", fontSize: 10 }}>{inv.label}</th>
                    ))}
                    <th style={{ padding: "10px 8px", color: "#e879f9", textAlign: "right", fontWeight: 700, fontSize: 10, borderLeft: `1px solid ${C.border}` }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { section: "FIXED (per apartment)" },
                    { field: "mgmt_admin",      label: "Administration",       color: "#80cbc4" },
                    { field: "mgmt_board",       label: "Board Chairman Fee",   color: "#b2dfdb" },
                    { field: "mgmt_accounting",  label: "Accounting",           color: "#4db6ac" },
                    { field: "mgmt_payment",     label: "Payment Link",         color: "#b2dfdb" },
                    { section: "PER m² (every month)" },
                    { field: "mgmt_reserve",     label: "Reserve Fund",         color: "#a5d6a7" },
                    { field: "mgmt_technical",   label: "Technical Maint.",     color: "#00bcd4" },
                    { field: "mgmt_ats",         label: "Alarm System (ATS)",   color: "#00838f" },
                    { field: "mgmt_lift",        label: "Elevator",             color: "#0097a7" },
                    { field: "mgmt_cleaning_in", label: "Indoor Cleaning",      color: "#66bb6a" },
                    { field: "mgmt_cleaning_out",label: "Outdoor Cleaning",     color: "#81c784" },
                    { field: "mgmt_doormats",    label: "Doormats",             color: "#c8e6c9" },
                    { field: "mgmt_phones",      label: "Phones & Remote",      color: "#b0bec5" },
                    { field: "mgmt_parking",     label: "Parking Control",      color: "#90a4ae" },
                    { field: "mgmt_insurance",   label: "Insurance",            color: "#388e3c" },
                    { field: "mgmt_waste",       label: "Waste Collection",     color: "#4caf50" },
                    { section: "SEASONAL (when applicable)" },
                    { field: "mgmt_snow",        label: "Snow Removal",         color: "#b3e5fc" },
                    { field: "mgmt_lawn",        label: "Lawn Mowing",          color: "#dcedc8" },
                    { field: "mgmt_windows",     label: "Window Washing",       color: "#fff9c4" },
                    { field: "mgmt_garage",      label: "Garage Floor Cleaning",color: "#ffe0b2" },
                    { field: "mgmt_extra",       label: "One-off Extras",       color: "#f8bbd0" },
                    { section: "TOTAL" },
                    { field: "management_total", label: "Management Total",     color: C.management, bold: true },
                  ].map((row, i) => {
                    if (row.section) return (
                      <tr key={i} style={{ background: "rgba(255,255,255,0.03)" }}>
                        <td colSpan={fullMonths.length + 2} style={{ padding: "6px 14px", color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em" }}>{row.section}</td>
                      </tr>
                    );
                    const vals = fullMonths.map(inv => inv[row.field] || 0);
                    const rowTotal = vals.reduce((a, b) => a + b, 0);
                    const max = Math.max(...vals);
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "7px 14px", color: row.bold ? C.text : C.muted, fontWeight: row.bold ? 700 : 400, whiteSpace: "nowrap" }}>{row.label}</td>
                        {vals.map((v, vi) => {
                          const isMax = v === max && max > 0;
                          return (
                            <td key={vi} style={{ padding: "7px 8px", color: v > 0 ? (isMax ? row.color : "#8090a8") : C.border, textAlign: "right", fontWeight: (isMax || row.bold) ? 700 : 400, background: isMax ? `${row.color}11` : "transparent" }}>
                              {v > 0 ? `€${v.toFixed(2)}` : "—"}
                            </td>
                          );
                        })}
                        <td style={{ padding: "7px 8px", color: row.bold ? C.management : row.color, textAlign: "right", fontWeight: 700, borderLeft: `1px solid ${C.border}` }}>
                          {rowTotal > 0 ? `€${rowTotal.toFixed(2)}` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* General data table for non-management tabs */}
        {activeGroup !== "management" && (
          <>
            <div style={{ color: C.muted, fontSize: 11, marginBottom: 10, letterSpacing: "0.08em" }}>FULL DATA TABLE</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ padding: "10px 14px", color: C.muted, textAlign: "left", fontWeight: 500, minWidth: 130 }}>Metric</th>
                    {INVOICES.map(inv => (
                      <th key={inv.period} style={{ padding: "10px 8px", color: inv.partial ? C.muted : C.text, textAlign: "right", fontWeight: 600, whiteSpace: "nowrap", fontSize: 10 }}>
                        {inv.label}{inv.partial ? "*" : inv.note ? " ⚠" : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { section: "TOTALS" },
                    { label: "Grand Total",   field: "grand_total",              color: "#e879f9",   fmt: v => `€${v.toFixed(2)}` },
                    { label: "Electricity",   field: "electricity_total",        color: C.electricity, fmt: v => `€${v.toFixed(2)}` },
                    { label: "Water",         field: "water_total",              color: C.water_cold, fmt: v => `€${v.toFixed(2)}` },
                    { label: "Heating",       field: "heating_total",            color: C.heating,   fmt: v => `€${v.toFixed(2)}` },
                    { label: "Management",    field: "management_total",         color: C.management, fmt: v => `€${v.toFixed(2)}` },
                    { section: "ELECTRICITY" },
                    { label: "Day kWh",       field: "electricity_day_kwh",      color: "#ffd54f",   fmt: v => `${v}` },
                    { label: "Night kWh",     field: "electricity_night_kwh",    color: "#ffe082",   fmt: v => `${v}` },
                    { label: "Total kWh",     field: "electricity_total_kwh",    color: C.electricity, fmt: v => `${v}` },
                    { label: "Day €/kWh",     field: "electricity_day_price",    color: "#ffb300",   fmt: v => `€${v.toFixed(4)}` },
                    { label: "Night €/kWh",   field: "electricity_night_price",  color: "#ff8f00",   fmt: v => `€${v.toFixed(4)}` },
                    { label: "Day cost",      field: "electricity_day_total",    color: "#ffa000",   fmt: v => `€${v.toFixed(2)}` },
                    { label: "Night cost",    field: "electricity_night_total",  color: "#ff6f00",   fmt: v => `€${v.toFixed(2)}` },
                    { label: "Common area",   field: "electricity_common_total", color: "#ffe57f",   fmt: v => `€${v.toFixed(2)}` },
                    { section: "WATER" },
                    { label: "Cold m³",       field: "cold_water_m3",            color: C.water_cold, fmt: v => `${v.toFixed(3)}` },
                    { label: "Hot m³",        field: "hot_water_m3",             color: C.water_hot, fmt: v => `${v.toFixed(3)}` },
                    { label: "Cold cost",     field: "cold_water_total",         color: "#29b6f6",   fmt: v => `€${v.toFixed(2)}` },
                    { label: "Hot heating",   field: "hot_water_heating_total",  color: "#ff7043",   fmt: v => `€${v.toFixed(2)}` },
                    { section: "HEATING" },
                    { label: "Heating total", field: "heating_total",            color: C.heating,   fmt: v => `€${v.toFixed(2)}` },
                    { label: "€/m²",          field: "heating_per_m2",           color: "#ef9a9a",   fmt: v => `€${v.toFixed(5)}` },
                  ].map((row, i) => {
                    if (row.section) return (
                      <tr key={i} style={{ background: "rgba(255,255,255,0.03)" }}>
                        <td colSpan={14} style={{ padding: "6px 14px", color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em" }}>{row.section}</td>
                      </tr>
                    );
                    const vals = INVOICES.map(inv => inv[row.field]);
                    const max = Math.max(...vals.filter(v => v != null && !isNaN(v)));
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "7px 14px", color: C.muted, whiteSpace: "nowrap" }}>{row.label}</td>
                        {vals.map((v, vi) => {
                          const isMax = v === max && max > 0;
                          const inv = INVOICES[vi];
                          return (
                            <td key={vi} style={{ padding: "7px 8px", color: isMax ? row.color : inv.partial ? C.border : "#8090a8", textAlign: "right", fontWeight: isMax ? 700 : 400, background: isMax ? `${row.color}11` : "transparent" }}>
                              {v != null ? row.fmt(v) : "—"}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ padding: "8px 14px", color: C.muted, fontSize: 10, borderTop: `1px solid ${C.border}` }}>
                * Jan 2025 partial (5/31 days). ⚠ Oct & Nov 2025 — away from home. Feb 2026 not yet received.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}