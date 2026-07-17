import Reveal from "./Reveal";

export default function SectionHead({
  label,
  title,
  text,
  align = "center",
}: {
  label: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-14`}
    >
      <p className="glass mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
        {label}
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-base leading-relaxed text-fog">{text}</p>}
    </Reveal>
  );
}
