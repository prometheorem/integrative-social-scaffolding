import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'

const westernCountries = ['USA', 'CAN', 'GBR', 'DEU', 'FRA', 'ITA', 'ESP', 'AUS', 'NZL', 
  'SWE', 'NOR', 'DNK', 'NLD', 'CHE', 'IRL', 'BEL', 'AUT', 'POL', 'GRC', 'PRT', 'FIN']

const getColorByScore = (score) => {
  if (score >= 75) return '#2d5016' // Dark green - healthy
  if (score >= 60) return '#84cc16' // Light green - marginal
  if (score >= 45) return '#fbbf24' // Yellow - strained
  return '#dc2626' // Red - disrupted
}

const WorldMap = ({ countryData, onCountryClick, onCountryHover, hoveredCountry }) => {
  const svgRef = useRef(null)
  const [worldData, setWorldData] = useState(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    // Load world map data
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => response.json())
      .then(data => {
        const countries = feature(data, data.objects.countries)
        setWorldData(countries)
      })
      .catch(error => console.error('Error loading map data:', error))
  }, [])

  useEffect(() => {
    if (!worldData || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    svg.selectAll('*').remove()

    const projection = d3.geoMercator()
      .scale(width / 6)
      .translate([width / 2, height / 1.5])

    const path = d3.geoPath().projection(projection)

    // Draw countries
    svg.selectAll('path')
      .data(worldData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', d => {
        const code = d.properties.iso_a3 || d.id
        if (westernCountries.includes(code) && countryData[code]) {
          return getColorByScore(countryData[code].overall)
        }
        return '#e5e7eb' // Gray for non-focus countries
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .attr('class', d => {
        const code = d.properties.iso_a3 || d.id
        return westernCountries.includes(code) ? 'country focus' : 'country'
      })
      .style('cursor', d => {
        const code = d.properties.iso_a3 || d.id
        return westernCountries.includes(code) ? 'pointer' : 'default'
      })
      .on('click', (event, d) => {
        const code = d.properties.iso_a3 || d.id
        if (westernCountries.includes(code) && countryData[code]) {
          onCountryClick(code)
        }
      })
      .on('mouseenter', (event, d) => {
        const code = d.properties.iso_a3 || d.id
        if (westernCountries.includes(code) && countryData[code]) {
          onCountryHover(code)
          setTooltip({
            x: event.pageX + 10,
            y: event.pageY - 10,
            country: countryData[code]
          })
        }
      })
      .on('mousemove', (event) => {
        if (tooltip) {
          setTooltip(prev => prev ? { ...prev, x: event.pageX + 10, y: event.pageY - 10 } : null)
        }
      })
      .on('mouseleave', () => {
        onCountryHover(null)
        setTooltip(null)
      })

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        svg.selectAll('path').attr('transform', event.transform)
      })

    svg.call(zoom)

  }, [worldData, countryData, onCountryClick, onCountryHover])

  return (
    <div className="world-map-container">
      <svg ref={svgRef} className="world-map" width="100%" height="100%" />
      
      <div className="map-legend">
        <h4>National Cohesiveness</h4>
        <div className="legend-item">
          <span className="color-box" style={{backgroundColor: '#2d5016'}}></span>
          <span>Healthy (75-100)</span>
        </div>
        <div className="legend-item">
          <span className="color-box" style={{backgroundColor: '#84cc16'}}></span>
          <span>Marginal (60-74)</span>
        </div>
        <div className="legend-item">
          <span className="color-box" style={{backgroundColor: '#fbbf24'}}></span>
          <span>Strained (45-59)</span>
        </div>
        <div className="legend-item">
          <span className="color-box" style={{backgroundColor: '#dc2626'}}></span>
          <span>Disrupted (&lt;45)</span>
        </div>
      </div>

      {tooltip && tooltip.country && (
        <div 
          className="tooltip"
          style={{left: tooltip.x, top: tooltip.y}}
        >
          <strong>{tooltip.country.name}</strong>
          <div>Overall Score: {tooltip.country.overall}</div>
          <div className={`status-badge ${tooltip.country.overall >= 75 ? 'healthy' : tooltip.country.overall >= 60 ? 'marginal' : tooltip.country.overall >= 45 ? 'strained' : 'disrupted'}`}>
            {tooltip.country.overall >= 75 ? 'Healthy' : tooltip.country.overall >= 60 ? 'Marginal' : tooltip.country.overall >= 45 ? 'Strained' : 'Disrupted'}
          </div>
        </div>
      )}
    </div>
  )
}

export default WorldMap
