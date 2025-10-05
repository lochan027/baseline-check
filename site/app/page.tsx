import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { FadeIn, Stagger, ScaleIn } from '../components/ui/animations'
import { GradientBackground } from '../components/ui/gradient-background'
import { CheckCircle, Zap, Shield, Code, Play, Download } from 'lucide-react'

export default function Home() {
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
                <Badge variant="secondary" className="text-xs">
                  v1.0.0
                </Badge>
              </div>
            </FadeIn>
            
            <FadeIn direction="right" delay={0.1}>
              <nav className="flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/playground" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Playground
                </Link>
              </nav>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <FadeIn>
              <Badge variant="outline" className="mb-6 bg-white/50 backdrop-blur-sm border-blue-200">
                🚀 Protect your web deployments
              </Badge>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
                Prevent Unsafe
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Modern Web Features
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                A powerful CLI tool that checks your code against Baseline web standards, 
                ensuring your features are supported across browsers for your target year.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/playground">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <Play className="w-5 h-5 mr-2" />
                    Try Live Playground
                  </Button>
                </Link>
                <a href="#install">
                  <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80 px-8 py-4 text-lg font-semibold">
                    <Download className="w-5 h-5 mr-2" />
                    Install CLI
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="install" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                Quick Installation
              </h2>
              <p className="text-xl text-gray-600">Get started in seconds with npm</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <Card className="bg-gradient-to-r from-gray-900 to-black border-0 shadow-2xl mb-12">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Install globally</h3>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/20">
                    npm
                  </Badge>
                </div>
                <div className="bg-black/50 rounded-lg p-4 font-mono">
                  <code className="text-green-400 text-lg">npm install -g baseline-check-cli-tool</code>
                </div>
                <div className="mt-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/20">
                  <p className="text-blue-300 text-sm">
                    🎉 <strong>Available on npm:</strong> <a href="https://www.npmjs.com/package/baseline-check-cli-tool" className="underline hover:text-blue-200">npmjs.com/package/baseline-check-cli-tool</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn delay={0.2}>
              <Card className="h-full bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <CardTitle className="text-xl">Create Configuration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <pre className="text-sm text-gray-800">
{`{
  "baseline": "2023"
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600">Save as <code className="bg-gray-200 px-2 py-1 rounded">baseline.config.json</code></p>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <Card className="h-full bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <CardTitle className="text-xl">Run Check</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400 text-sm font-mono">npx baseline-check</code>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400 text-sm font-mono">npx baseline-check --report</code>
                    <p className="text-xs text-gray-400 mt-2">Generate detailed report</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CI Integration */}
      <section className="py-24 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                CI/CD Integration
              </h2>
              <p className="text-xl text-gray-600">Protect your deployments automatically</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span>GitHub Actions</span>
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Ready to use
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 overflow-x-auto shadow-inner">
                  <pre className="text-sm text-gray-300 leading-relaxed">
{`name: Baseline Check

on:
  push:
    branches: ["*"]
  pull_request:
    branches: ["*"]

jobs:
  baseline:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Run baseline-check
        run: npx baseline-check`}
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    💡 <strong>Pro tip:</strong> Save as <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">.github/workflows/baseline.yml</code> in your repository
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to maintain web standards and browser compatibility
              </p>
            </div>
          </FadeIn>
          
          <Stagger>
            <div className="grid md:grid-cols-3 gap-8">
              <ScaleIn delay={0.1}>
                <Card className="h-full bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">Multi-Language Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      Intelligently scans JavaScript, TypeScript, CSS, and HTML files to detect modern web features and their browser compatibility.
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScaleIn>
              
              <ScaleIn delay={0.2}>
                <Card className="h-full bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">Baseline Standards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      Uses the official web-features dataset to validate against Baseline support years, ensuring reliable compatibility data.
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScaleIn>
              
              <ScaleIn delay={0.3}>
                <Card className="h-full bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">CI/CD Ready</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      Seamlessly integrates with GitHub Actions, Jenkins, and other CI systems to prevent unsafe deployments automatically.
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScaleIn>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeIn>
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  baseline-check
                </h3>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Built for developers who care about web standards and browser compatibility.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400 text-lg">
                Made with <span className="text-red-400 animate-pulse">❤️</span> for the web platform
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Ensuring safer deployments, one feature at a time
              </p>
            </div>
          </FadeIn>
        </div>
      </footer>
    </GradientBackground>
  )
}