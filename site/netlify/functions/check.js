exports.handler = async (event, context) => {
  console.log('Function called:', { 
    httpMethod: event.httpMethod, 
    body: event.body?.substring(0, 100),
    headers: event.headers 
  })

  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request')
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({}),
    }
  }

  if (event.httpMethod !== 'POST') {
    console.log('Invalid method:', event.httpMethod)
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    console.log('Parsing request body')
    
    if (!event.body) {
      console.log('No body provided')
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No request body provided' }),
      }
    }

    let parsedBody
    try {
      parsedBody = JSON.parse(event.body)
    } catch (parseError) {
      console.log('JSON parse error:', parseError.message)
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      }
    }

    const { code, baseline } = parsedBody
    console.log('Extracted parameters:', { code: !!code, baseline })
    
    if (!code || !baseline) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing code or baseline parameter' }),
      }
    }

    const baselineYear = parseInt(baseline, 10)
    console.log('Processing analysis:', { baselineYear, codeLength: code.length })
    
    if (isNaN(baselineYear)) {
      console.log('Invalid baseline year:', baseline)
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid baseline year' }),
      }
    }
    
    // Simple feature detection for demo
    const features = []
    const issues = []
    const allFeatures = []
    
    // Ensure code is a string
    const codeStr = String(code || '')
    
    // Check for JavaScript features
    if (codeStr.includes('?.')) {
      features.push('optional-chaining')
      allFeatures.push({ feature: 'optional-chaining', required: 2020 })
      if (2020 > baselineYear) issues.push({ feature: 'optional-chaining', required: 2020 })
    }
    
    if (codeStr.includes('??')) {
      features.push('nullish-coalescing')
      allFeatures.push({ feature: 'nullish-coalescing', required: 2020 })
      if (2020 > baselineYear) issues.push({ feature: 'nullish-coalescing', required: 2020 })
    }
    
    if (codeStr.includes('#')) {
      features.push('private-class-fields')
      allFeatures.push({ feature: 'private-class-fields', required: 2022 })
      if (2022 > baselineYear) issues.push({ feature: 'private-class-fields', required: 2022 })
    }
    
    // Check for CSS features
    if (/&\s*{|&\s*[a-zA-Z]/.test(codeStr)) {
      features.push('nesting')
      allFeatures.push({ feature: 'nesting', required: 2024 })
      if (2024 > baselineYear) issues.push({ feature: 'nesting', required: 2024 })
    }
    
    if (/:has\(/.test(codeStr)) {
      features.push('has')
      allFeatures.push({ feature: 'has', required: 2024 })
      if (2024 > baselineYear) issues.push({ feature: 'has', required: 2024 })
    }
    
    if (/display:\s*grid|grid-template/.test(codeStr)) {
      features.push('grid')
      allFeatures.push({ feature: 'grid', required: 2017 })
      if (2017 > baselineYear) issues.push({ feature: 'grid', required: 2017 })
    }
    
    if (/@container/.test(codeStr)) {
      features.push('container-queries')
      allFeatures.push({ feature: 'container-queries', required: 2024 })
      if (2024 > baselineYear) issues.push({ feature: 'container-queries', required: 2024 })
    }
    
    // Check for HTML features
    if (/<dialog/i.test(codeStr)) {
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

    console.log('Analysis complete:', { 
      safe: response.safe, 
      issuesCount: issues.length, 
      featuresCount: allFeatures.length 
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.error('Function Error:', error)
    console.error('Error stack:', error.stack)
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    })
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        timestamp: new Date().toISOString()
      }),
    }
  }
}