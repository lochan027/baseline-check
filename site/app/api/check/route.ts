import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    console.log('API called')
    
    const body = await request.json()
    console.log('Request body:', body)

    const { code, baseline } = body
    
    if (!code || !baseline) {
      console.log('Missing parameters:', { code: !!code, baseline: !!baseline })
      return NextResponse.json(
        { error: 'Missing code or baseline parameter' },
        { status: 400, headers: corsHeaders }
      )
    }

    const baselineYear = parseInt(baseline, 10)
    
    // Simple feature detection for demo
    const features: string[] = []
    const issues: Array<{feature: string, required: number}> = []
    const allFeatures: Array<{feature: string, required: number}> = []
    
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

    return NextResponse.json(response, { headers: corsHeaders })
  } catch (error) {
    console.error('API Error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      },
      { status: 500, headers: corsHeaders }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}