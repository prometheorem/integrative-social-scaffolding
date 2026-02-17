import React from 'react'

const getScoreColor = (score) => {
  if (score >= 75) return '#2d5016'
  if (score >= 60) return '#84cc16'
  if (score >= 45) return '#fbbf24'
  return '#dc2626'
}

const getStatusLabel = (score) => {
  if (score >= 75) return 'Healthy'
  if (score >= 60) return 'Marginal'
  if (score >= 45) return 'Strained'
  return 'Disrupted'
}

const CountryDetail = ({ country, countryCode, systemsInfo, onClose }) => {
  if (!country) return null

  return (
    <div className="country-detail">
      <div className="detail-header">
        <h2>{country.name}</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="overall-score">
        <div 
          className="score-circle"
          style={{borderColor: getScoreColor(country.overall)}}
        >
          <span className="score-value">{country.overall}</span>
          <span className="score-label">Overall</span>
        </div>
        <div 
          className="status-pill"
          style={{backgroundColor: getScoreColor(country.overall)}}
        >
          {getStatusLabel(country.overall)}
        </div>
      </div>

      <div className="systems-breakdown">
        <h3>System Breakdown</h3>
        {Object.entries(country.systems).map(([key, data]) => {
          const info = systemsInfo[key]
          return (
            <div key={key} className="system-item">
              <div className="system-header">
                <span className="system-name">{info.name}</span>
                <span 
                  className="system-score"
                  style={{color: getScoreColor(data.score)}}
                >
                  {data.score}
                </span>
              </div>
              <div className="system-bar">
                <div 
                  className="system-fill"
                  style={{
                    width: `${data.score}%`,
                    backgroundColor: getScoreColor(data.score)
                  }}
                />
              </div>
              <p className="system-desc">{info.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CountryDetail
