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
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-16`}
    >
      <p className="mb-4 inline-flex rounded-full border border-cyan/25 bg-cyan/[0.07] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
        {label}
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.75rem]">
        {title}
      </h2>
      {text && (
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fog">
          {text}
        </p>
      )}
    </Reveal>
  );
}
