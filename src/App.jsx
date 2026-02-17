import React, { useState, useEffect } from 'react'
import WorldMap from './components/WorldMap'
import CountryDetail from './components/CountryDetail'
import SystemLegend from './components/SystemLegend'
import './App.css'

// Initial placeholder data structure
const initialData = {
  USA: {
    name: "United States",
    overall: 65,
    systems: {
      family: { score: 55, status: 'marginal' },
      religion: { score: 60, status: 'marginal' },
      community: { score: 50, status: 'marginal' },
      education: { score: 45, status: 'disrupted' },
      economy: { score: 70, status: 'healthy' },
      law: { score: 65, status: 'healthy' },
      culture: { score: 55, status: 'marginal' },
      nationhood: { score: 60, status: 'marginal' },
      gender: { score: 40, status: 'disrupted' },
      speech: { score: 75, status: 'healthy' }
    }
  },
  CAN: {
    name: "Canada",
    overall: 70,
    systems: {
      family: { score: 60, status: 'marginal' },
      religion: { score: 45, status: 'disrupted' },
      community: { score: 65, status: 'healthy' },
      education: { score: 55, status: 'marginal' },
      economy: { score: 75, status: 'healthy' },
      law: { score: 80, status: 'healthy' },
      culture: { score: 60, status: 'marginal' },
      nationhood: { score: 50, status: 'marginal' },
      gender: { score: 55, status: 'marginal' },
      speech: { score: 70, status: 'healthy' }
    }
  },
  GBR: {
    name: "United Kingdom",
    overall: 68,
    systems: {
      family: { score: 55, status: 'marginal' },
      religion: { score: 35, status: 'disrupted' },
      community: { score: 60, status: 'marginal' },
      education: { score: 60, status: 'marginal' },
      economy: { score: 70, status: 'healthy' },
      law: { score: 75, status: 'healthy' },
      culture: { score: 70, status: 'healthy' },
      nationhood: { score: 55, status: 'marginal' },
      gender: { score: 50, status: 'marginal' },
      speech: { score: 65, status: 'healthy' }
    }
  },
  DEU: {
    name: "Germany",
    overall: 72,
    systems: {
      family: { score: 65, status: 'healthy' },
      religion: { score: 40, status: 'disrupted' },
      community: { score: 70, status: 'healthy' },
      education: { score: 75, status: 'healthy' },
      economy: { score: 80, status: 'healthy' },
      law: { score: 85, status: 'healthy' },
      culture: { score: 75, status: 'healthy' },
      nationhood: { score: 60, status: 'marginal' },
      gender: { score: 65, status: 'healthy' },
      speech: { score: 70, status: 'healthy' }
    }
  },
  FRA: {
    name: "France",
    overall: 66,
    systems: {
      family: { score: 60, status: 'marginal' },
      religion: { score: 30, status: 'disrupted' },
      community: { score: 65, status: 'healthy' },
      education: { score: 70, status: 'healthy' },
      economy: { score: 65, status: 'healthy' },
      law: { score: 70, status: 'healthy' },
      culture: { score: 80, status: 'healthy' },
      nationhood: { score: 70, status: 'healthy' },
      gender: { score: 60, status: 'marginal' },
      speech: { score: 60, status: 'marginal' }
    }
  },
  AUS: {
    name: "Australia",
    overall: 73,
    systems: {
      family: { score: 65, status: 'healthy' },
      religion: { score: 45, status: 'disrupted' },
      community: { score: 70, status: 'healthy' },
      education: { score: 65, status: 'healthy' },
      economy: { score: 80, status: 'healthy' },
      law: { score: 85, status: 'healthy' },
      culture: { score: 65, status: 'healthy' },
      nationhood: { score: 75, status: 'healthy' },
      gender: { score: 60, status: 'marginal' },
      speech: { score: 70, status: 'healthy' }
    }
  },
  NZL: {
    name: "New Zealand",
    overall: 74,
    systems: {
      family: { score: 60, status: 'marginal' },
      religion: { score: 40, status: 'disrupted' },
      community: { score: 75, status: 'healthy' },
      education: { score: 70, status: 'healthy' },
      economy: { score: 70, status: 'healthy' },
      law: { score: 85, status: 'healthy' },
      culture: { score: 65, status: 'healthy' },
      nationhood: { score: 70, status: 'healthy' },
      gender: { score: 65, status: 'healthy' },
      speech: { score: 75, status: 'healthy' }
    }
  },
  SWE: {
    name: "Sweden",
    overall: 78,
    systems: {
      family: { score: 70, status: 'healthy' },
      religion: { score: 25, status: 'disrupted' },
      community: { score: 75, status: 'healthy' },
      education: { score: 85, status: 'healthy' },
      economy: { score: 85, status: 'healthy' },
      law: { score: 90, status: 'healthy' },
      culture: { score: 80, status: 'healthy' },
      nationhood: { score: 75, status: 'healthy' },
      gender: { score: 85, status: 'healthy' },
      speech: { score: 80, status: 'healthy' }
    }
  },
  NOR: {
    name: "Norway",
    overall: 80,
    systems: {
      family: { score: 75, status: 'healthy' },
      religion: { score: 30, status: 'disrupted' },
      community: { score: 80, status: 'healthy' },
      education: { score: 85, status: 'healthy' },
      economy: { score: 90, status: 'healthy' },
      law: { score: 90, status: 'healthy' },
      culture: { score: 75, status: 'healthy' },
      nationhood: { score: 85, status: 'healthy' },
      gender: { score: 80, status: 'healthy' },
      speech: { score: 85, status: 'healthy' }
    }
  },
  DNK: {
    name: "Denmark",
    overall: 79,
    systems: {
      family: { score: 75, status: 'healthy' },
      religion: { score: 35, status: 'disrupted' },
      community: { score: 80, status: 'healthy' },
      education: { score: 80, status: 'healthy' },
      economy: { score: 85, status: 'healthy' },
      law: { score: 90, status: 'healthy' },
      culture: { score: 75, status: 'healthy' },
      nationhood: { score: 80, status: 'healthy' },
      gender: { score: 75, status: 'healthy' },
      speech: { score: 85, status: 'healthy' }
    }
  },
  NLD: {
    name: "Netherlands",
    overall: 75,
    systems: {
      family: { score: 70, status: 'healthy' },
      religion: { score: 35, status: 'disrupted' },
      community: { score: 75, status: 'healthy' },
      education: { score: 80, status: 'healthy' },
      economy: { score: 85, status: 'healthy' },
      law: { score: 85, status: 'healthy' },
      culture: { score: 80, status: 'healthy' },
      nationhood: { score: 70, status: 'healthy' },
      gender: { score: 80, status: 'healthy' },
      speech: { score: 80, status: 'healthy' }
    }
  },
  CHE: {
    name: "Switzerland",
    overall: 82,
    systems: {
      family: { score: 80, status: 'healthy' },
      religion: { score: 50, status: 'marginal' },
      community: { score: 85, status: 'healthy' },
      education: { score: 85, status: 'healthy' },
      economy: { score: 90, status: 'healthy' },
      law: { score: 90, status: 'healthy' },
      culture: { score: 80, status: 'healthy' },
      nationhood: { score: 85, status: 'healthy' },
      gender: { score: 75, status: 'healthy' },
      speech: { score: 85, status: 'healthy' }
    }
  },
  IRL: {
    name: "Ireland",
    overall: 76,
    systems: {
      family: { score: 65, status: 'healthy' },
      religion: { score: 55, status: 'marginal' },
      community: { score: 80, status: 'healthy' },
      education: { score: 75, status: 'healthy' },
      economy: { score: 85, status: 'healthy' },
      law: { score: 80, status: 'healthy' },
      culture: { score: 75, status: 'healthy' },
      nationhood: { score: 75, status: 'healthy' },
      gender: { score: 75, status: 'healthy' },
      speech: { score: 75, status: 'healthy' }
    }
  },
  BEL: {
    name: "Belgium",
    overall: 72,
    systems: {
      family: { score: 65, status: 'healthy' },
      religion: { score: 35, status: 'disrupted' },
      community: { score: 65, status: 'healthy' },
      education: { score: 75, status: 'healthy' },
      economy: { score: 80, status: 'healthy' },
      law: { score: 80, status: 'healthy' },
      culture: { score: 75, status: 'healthy' },
      nationhood: { score: 55, status: 'marginal' },
      gender: { score: 70, status: 'healthy' },
      speech: { score: 70, status: 'healthy' }
    }
  },
  AUT: {
    name: "Austria",
    overall: 74,
    systems: {
      family: { score: 75, status: 'healthy' },
      religion: { score: 55, status: 'marginal' },
      community: { score: 75, status: 'healthy' },
      education: { score: 80, status: 'healthy' },
      economy: { score: 80, status: 'healthy' },
      law: { score: 85, status: 'healthy' },
      culture: { score: 80, status: 'healthy' },
      nationhood: { score: 70, status: 'healthy' },
      gender: { score: 70, status: 'healthy' },
      speech: { score: 75, status: 'healthy' }
    }
  },
  ITA: {
    name: "Italy",
    overall: 62,
    systems: {
      family: { score: 75, status: 'healthy' },
      religion: { score: 50, status: 'marginal' },
      community: { score: 70, status: 'healthy' },
      education: { score: 60, status: 'marginal' },
      economy: { score: 55, status: 'marginal' },
      law: { score: 50, status: 'marginal' },
      culture: { score: 85, status: 'healthy' },
      nationhood: { score: 65, status: 'healthy' },
      gender: { score: 60, status: 'marginal' },
      speech: { score: 60, status: 'marginal' }
    }
  },
  ESP: {
    name: "Spain",
    overall: 64,
    systems: {
      family: { score: 70, status: 'healthy' },
      religion: { score: 40, status: 'disrupted' },
      community: { score: 75, status: 'healthy' },
      education: { score: 65, status: 'healthy' },
      economy: { score: 60, status: 'marginal' },
      law: { score: 60, status: 'marginal' },
      culture: { score: 80, status: 'healthy' },
      nationhood: { score: 70, status: 'healthy' },
      gender: { score: 70, status: 'healthy' },
      speech: { score: 65, status: 'healthy' }
    }
  },
  POL: {
    name: "Poland",
    overall: 60,
    systems: {
      family: { score: 75, status: 'healthy' },
      religion: { score: 75, status: 'healthy' },
      community: { score: 70, status: 'healthy' },
      education: { score: 55, status: 'marginal' },
      economy: { score: 60, status: 'marginal' },
      law: { score: 45, status: 'disrupted' },
      culture: { score: 70, status: 'healthy' },
      nationhood: { score: 75, status: 'healthy' },
      gender: { score: 50, status: 'marginal' },
      speech: { score: 40, status: 'disrupted' }
    }
  }
}

const systemsInfo = {
  family: {
    name: "Family / Kinship",
    description: "Attachment and affect-regulation system",
    function: "Regulates safety, trust, and intergenerational continuity"
  },
  religion: {
    name: "Religion / Shared Moral Order",
    description: "Superego and transpersonal attachment system",
    function: "Provides stable moral hierarchy and shared symbolic order"
  },
  community: {
    name: "Community / Local Institutions",
    description: "Affiliation and social-bonding system",
    function: "Regulates belonging, cooperation, and empathic mirroring"
  },
  education: {
    name: "Education / Civic Formation",
    description: "Cognitive-moral integration system",
    function: "Develops agency, competence, and reality testing"
  },
  economy: {
    name: "Economy / Property Order",
    description: "Agency and self-efficacy system",
    function: "Links effort to reward and temporal continuity"
  },
  law: {
    name: "Law / Justice",
    description: "Moral-regulatory and impulse-control system",
    function: "Externalized conscience stabilizing reciprocity and trust"
  },
  culture: {
    name: "Cultural Canon / Aesthetic Continuity",
    description: "Symbolic-integration and narrative-self system",
    function: "Anchors psyche with enduring forms of beauty and meaning"
  },
  nationhood: {
    name: "Nationhood / Political Identity",
    description: "Collective-identity and macro-attachment system",
    function: "Integrates tribes under shared myth and destiny"
  },
  gender: {
    name: "Gender / Role Complementarity",
    description: "Sexual-polarity and individuation system",
    function: "Anchors differentiation, intimacy, and generativity"
  },
  speech: {
    name: "Speech / Inquiry",
    description: "Epistemic-integrity and reality-testing system",
    function: "Maintains reality testing through open dialogue"
  }
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [hoveredCountry, setHoveredCountry] = useState(null)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Integrative Social Scaffolding</h1>
        <p className="subtitle">National Integrity Across Western Christian-Heritage Nations</p>
      </header>
      
      <main className="app-main">
        <div className="map-container">
          <WorldMap 
            countryData={initialData}
            onCountryClick={setSelectedCountry}
            onCountryHover={setHoveredCountry}
            hoveredCountry={hoveredCountry}
          />
        </div>
        
        <div className="sidebar">
          {selectedCountry ? (
            <CountryDetail 
              country={initialData[selectedCountry]}
              countryCode={selectedCountry}
              systemsInfo={systemsInfo}
              onClose={() => setSelectedCountry(null)}
            />
          ) : (
            <div className="placeholder">
              <h3>Select a country</h3>
              <p>Click on a country to view detailed analysis across all 10 social systems.</p>
            </div>
          )}
          
          <SystemLegend systemsInfo={systemsInfo} />
        </div>
      </main>
    </div>
  )
}

export default App
