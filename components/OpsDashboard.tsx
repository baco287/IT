"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Check, Server, Shield, Clock } from "lucide-react";
import Counter from "./Counter";

const KPIS = [
  { icon: Activity, label: "Verfügbarkeit", value: <><Counter to={99} />,98 %</> },
  { icon: Clock, label: "Ø Reaktionszeit", value: <><Counter to={14} /> min</> },
  { icon: Server, label: "Systeme im Betrieb", value: <><Counter to={42} /></> },
];

const STATUS = [
  { label: "Server & Netzwerke", value: "Betriebsbereit" },
  { label: "Cloud & Microsoft 365", value: "Synchron" },
  { label: "Backups", value: "Heute 02:00" },
  { label: "Firewall & Endpoint", value: "Geschützt" },
  { label: "Sicherheitsupdates", value: "Aktuell" },
];

const BARS = [30, 42, 36, 54, 48, 66, 58, 78, 72, 90, 84, 100];

export default function OpsDashboard() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* Glow hinter dem Panel */}
      <div className="glow left-1/2 top-8 h-[22rem] w-[80%] -translate-x-1/2 bg-[#0e7c8e]/30" aria-hidden />

      <div className="glass relative overflow-hidden rounded-2xl p-2 shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
        {/* Licht-Sweep */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(110deg, transparent 35%, rgba(75,227,194,0.10) 48%, rgba(255,255,255,0.06) 52%, transparent 66%)",
            }}
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            aria-hidden
          />
        )}

        <div className="terminal overflow-hidden">
          {/* Kopfzeile */}
          <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5">
            <span className="h-3 w-3 rounded-full bg-white/12" />
            <span className="h-3 w-3 rounded-full bg-white/12" />
            <span className="h-3 w-3 rounded-full bg-white/12" />
            <span className="ml-3 text-sm font-medium text-fog">QonteX Operations</span>
            <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-cyan">
              <span className="status-dot" /> live
            </span>
          </div>

          <div className="grid gap-4 p-5 lg:grid-cols-[1.5fr_1fr]">
            {/* Links: KPIs + Chart */}
            <div>
              <div className="grid grid-cols-3 gap-3">
                {KPIS.map((k, i) => (
                  <motion.div
                    key={k.label}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="rounded-lg border border-white/8 bg-white/[0.03] p-3.5"
                  >
                    <k.icon size={16} className="text-cyan" aria-hidden />
                    <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                      {k.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-fog">{k.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-white/8 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-mist">
                    Anfragen über Kundensysteme
                  </span>
                  <span className="text-[11px] text-fog">12 Monate</span>
                </div>
                <div className="mt-4 flex h-28 items-end gap-1.5">
                  {BARS.map((h, i) => (
                    <motion.span
                      key={i}
                      className={`flex-1 rounded-t ${
                        i === BARS.length - 1
                          ? "bg-cyan"
                          : "bg-gradient-to-t from-cyan/15 to-cyan/45"
                      }`}
                      initial={reduce ? false : { height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.4 + i * 0.05, ease: [0.2, 0.7, 0.25, 1] }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Rechts: Status-Liste */}
            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2">
                <Shield size={15} className="text-cyan" aria-hidden />
                <span className="text-xs font-medium text-mist">Systemstatus</span>
              </div>
              <div className="mt-3 grid gap-2">
                {STATUS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={reduce ? false : { opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-between rounded-md border border-white/6 bg-white/[0.02] px-3 py-2.5"
                  >
                    <span className="flex items-center gap-2 text-[13px] text-mist">
                      <span className="status-dot" aria-hidden />
                      {s.label}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-fog">
                      <Check size={12} strokeWidth={3} className="text-cyan" aria-hidden />
                      {s.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
