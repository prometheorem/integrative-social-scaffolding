import React, { useState } from 'react'

const SystemLegend = ({ systemsInfo }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="system-legend">
      <h3 onClick={() => setExpanded(!expanded)} className="legend-toggle">
        The 10 Social Systems {expanded ? '−' : '+'}
      </h3>
      
      {expanded && (
        <div className="systems-list">
          {Object.entries(systemsInfo).map(([key, info]) => (
            <div key={key} className="system-info-item">
              <h4>{info.name}</h4>
              <p className="system-function">{info.function}</p>
              <p className="system-description">{info.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {!expanded && (
        <p className="legend-hint">Click to expand framework details</p>
      )}
    </div>
  )
}

export default SystemLegend
