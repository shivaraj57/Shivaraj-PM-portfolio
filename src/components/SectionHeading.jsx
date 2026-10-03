const SectionHeading = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="mb-12">
      <p className="section-heading-label mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  )
}

export default SectionHeading
