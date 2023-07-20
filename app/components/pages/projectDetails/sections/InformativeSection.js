export default function informativeSection({ sectionsRef, section, sectionIndex }) {
  return (
    <section ref={element => { if (sectionsRef.current) sectionsRef.current[sectionIndex] = element }} className="space-y-3" >
      {/* Heading */}
      <h2 className="sub-heading">
        {section.heading}
      </h2>
      {/* Brief Description (if available) */}
      {section.description && (
        <p className="text-gray-600">
          {section.description}
        </p>
      )}
      {/* Bullet Points (if available) */}
      {section.points?.length && (
        <ul className={`${section.description ? 'pt-4' : 'pt-1'} space-y-4 leading-relaxed text-gray-600`}>
          {section.points.map((point, pointIndex) => (
            <div key={pointIndex} className="space-y-3">
              <li className="bullet-point">
                <span>&#9679;</span> {point.introduction || point}
              </li>
              {/* Bullet Subpoints (if available) */}
              {point.subpoints?.length && (
                <ul className="space-y-2 pl-5 xl:pl-6 2xl:pl-7">
                  {point.subpoints.map((subpoint, subpointIndex) => (
                    <li key={subpointIndex} className="bullet-point">
                      <span>&#9675;</span> {subpoint}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      )}
    </section>
  );
}
