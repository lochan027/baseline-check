'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Textarea } from '../../components/ui/textarea'
import { Badge } from '../../components/ui/badge'
import { FadeIn, ScaleIn } from '../../components/ui/animations'
import { GradientBackground } from '../../components/ui/gradient-background'
import { Play, Code, CheckCircle, AlertCircle, Shield, Home } from 'lucide-react'

interface CheckResult {
  baseline: string
  safe: boolean
  issues: Array<{
    feature: string
    required: string | number
  }>
  features: Array<{
    feature: string
    required: string | number
  }>
  error?: string
}

export default function Playground() {
  const [code, setCode] = useState(`// Example JavaScript with modern features
const user = data?.user ?? 'Anonymous';

class MyClass {
  #privateField = 'secret';
  
  getPrivate() {
    return this.#privateField;
  }
}

// CSS with modern features
const styles = \`
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    
    .nested {
      color: blue;
    }
  }
  
  .has-example:has(.child) {
    background: red;
  }
\`;`)
  
  const [result, setResult] = useState<CheckResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [baseline, setBaseline] = useState('2023')

  const handleCheck = async () => {
    setLoading(true)
    try {
      const response = await fetch('/.netlify/functions/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, baseline }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult({
        baseline,
        safe: false,
        issues: [],
        features: [],
        error: 'Failed to analyze code. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <GradientBackground>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <FadeIn direction="left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    baseline-check
                  </h1>
                </div>
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Playground
                </Badge>
              </div>
            </FadeIn>
            
            <FadeIn direction="right" delay={0.1}>
              <nav className="flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link href="/playground" className="text-blue-600 font-medium flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Playground</span>
                </Link>
              </nav>
            </FadeIn>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Live Playground
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Test your JavaScript, CSS, or HTML code against Baseline standards in real-time. 
              See which features are safe for your target year.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <FadeIn delay={0.1}>
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Code Input</span>
                </CardTitle>
                <CardDescription>
                  Enter your code and select the target Baseline year
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Baseline Year:
                  </label>
                  <select 
                    value={baseline} 
                    onChange={(e) => setBaseline(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Code to Check
                  </label>
                  <Textarea
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
                    rows={18}
                    className="font-mono text-sm resize-none"
                    placeholder="Paste your JavaScript, CSS, or HTML code here..."
                  />
                </div>
                
                <Button
                  onClick={handleCheck}
                  disabled={loading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Check Baseline Compatibility
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Results Section */}
          <FadeIn delay={0.2}>
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-white/20 h-fit">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Analysis Results</span>
                </CardTitle>
                <CardDescription>
                  Real-time compatibility analysis for your code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!result ? (
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600 text-lg">Click "Check Baseline Compatibility" to analyze your code</p>
                    <p className="text-gray-500 text-sm mt-2">Results will appear here instantly</p>
                  </div>
                ) : (
                  <ScaleIn>
                    <div className="space-y-6">
                      {/* Status */}
                      <Card className={`${result.safe 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                        : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
                      } shadow-lg`}>
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              result.safe ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {result.safe ? (
                                <CheckCircle className="w-7 h-7 text-green-600" />
                              ) : (
                                <AlertCircle className="w-7 h-7 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className={`font-semibold text-lg ${result.safe ? 'text-green-800' : 'text-red-800'}`}>
                                {result.safe 
                                  ? `✨ All features are safe for Baseline ${result.baseline}`
                                  : `⚠️ Found ${result.issues.length} unsafe feature(s)`
                                }
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {result.safe 
                                  ? 'Your code is ready for deployment!' 
                                  : 'Consider updating these features for broader compatibility'
                                }
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Issues */}
                      {result.issues.length > 0 && (
                        <Card className="bg-red-50/50 border-red-200 shadow-lg">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-red-800 flex items-center space-x-2">
                              <AlertCircle className="w-5 h-5" />
                              <span>Unsafe Features</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {result.issues.map((issue, index) => (
                                <div key={index} className="bg-white/70 rounded-lg p-3 border border-red-200">
                                  <div className="flex items-center space-x-3">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                    <code className="font-mono text-red-700 font-medium">{issue.feature}</code>
                                    <Badge variant="outline" className="text-xs bg-red-100 text-red-700 border-red-200">
                                      requires Baseline {issue.required}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* All Features */}
                      {result.features.length > 0 && (
                        <Card className="bg-gray-50/50 border-gray-200 shadow-lg">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-gray-800 flex items-center space-x-2">
                              <Code className="w-5 h-5" />
                              <span>All Detected Features</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                              {result.features.map((feature, index) => {
                                const isUnsafe = result.issues.some(issue => issue.feature === feature.feature)
                                return (
                                  <div key={index} className="flex items-center justify-between p-2 bg-white/70 rounded-lg border border-gray-200">
                                    <div className="flex items-center space-x-3">
                                      {isUnsafe ? (
                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                      ) : (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      )}
                                      <code className="font-mono text-sm">{feature.feature}</code>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                      Baseline {feature.required}
                                    </Badge>
                                  </div>
                                )
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </ScaleIn>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </GradientBackground>
  )
}