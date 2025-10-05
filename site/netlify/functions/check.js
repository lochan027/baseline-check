exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({}),
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { code, baseline } = JSON.parse(event.body)
    
    if (!code || !baseline) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing code or baseline parameter' }),
      }
    }

    const baselineYear = parseInt(baseline, 10)
    
    // Simple feature detection for demo
    const features = []
    const issues = []
    const allFeatures = []
    
    // Check for JavaScript features
    if (code.includes('?.')) {
      features.push('optional-chaining')
      allFeatures.push({ feature: 'optional-chaining', required: 2020 })
      if (2020 > baselineYear) issues.push({ feature: 'optional-chaining', required: 2020 })
    }
    
    if (code.includes('??')) {
      features.push('nullish-coalescing')
      allFeatures.push({ feature: 'nullish-coalescing', required: 2020 })
      if (2020 > baselineYear) issues.push({ feature: 'nullish-coalescing', required: 2020 })
    }
    
    if (code.includes('#')) {
      features.push('private-class-fields')
      allFeatures.push({ feature: 'private-class-fields', required: 2022 })
      if (2022 > baselineYear) issues.push({ feature: 'private-class-fields', required: 2022 })
    }
    
    // Check for CSS features
    if (/&\s*{|&\s*[a-zA-Z]/.test(code)) {
      features.push('nesting')
      allFeatures.push({ feature: 'nesting', required: 2024 })
      if (2024 > baselineYear) issues.push({ feature: 'nesting', required: 2024 })
    }
    
    if (/:has\(/.test(code)) {
      features.push('has')
      allFeatures.push({ feature: 'has', required: 2024 })
      if (2024 > baselineYear) issues.push({ feature: 'has', required: 2024 })
    }
    
    if (/display:\s*grid|grid-template/.test(code)) {
      features.push('grid')
      allFeatures.push({ feature: 'grid', required: 2017 })
      if (2017 > baselineYear) issues.push({ feature: 'grid', required: 2017 })
    }
    
    if (/@container/.test(code)) {
      features.push('container-queries')
      allFeatures.push({ feature: 'container-queries', required: 2024 })
      if (2024 > baselineYear) issues.push({ feature: 'container-queries', required: 2024 })
    }
    
    // Check for HTML features
    if (/<dialog/i.test(code)) {
      features.push('dialog')
      allFeatures.push({ feature: 'dialog', required: 2022 })
      if (2022 > baselineYear) issues.push({ feature: 'dialog', required: 2022 })
    }

    const response = {
      baseline: baseline,
      safe: issues.length === 0,
      issues: issues,
      features: allFeatures
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.error('Function Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}