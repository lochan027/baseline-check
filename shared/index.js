const { features } = require('web-features');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const postcss = require('postcss');
const htmlparser2 = require('htmlparser2');

// Feature detection mappings
const JS_FEATURES = {
  'optional-chaining': (node) => node.type === 'OptionalMemberExpression' || node.type === 'OptionalCallExpression',
  'nullish-coalescing': (node) => node.type === 'LogicalExpression' && node.operator === '??',
  'private-class-fields': (node) => node.type === 'ClassPrivateProperty' || node.type === 'PrivateName',
  'top-level-await': (node) => node.type === 'AwaitExpression' && !isInsideFunction(node),
  'dynamic-import': (node) => node.type === 'Import',
  'bigint': (node) => node.type === 'BigIntLiteral'
};

const CSS_FEATURES = {
  'nesting': /&\s*{|&\s*[a-zA-Z]/,
  'has': /:has\(/,
  'container-queries': /@container/,
  'cascade-layers': /@layer/,
  'subgrid': /subgrid/,
  'grid': /display:\s*grid|grid-template/,
  'flexbox': /display:\s*flex|flex-direction/,
  'custom-properties': /--[a-zA-Z-]+:/
};

const HTML_FEATURES = {
  'dialog': /<dialog/i,
  'details': /<details/i,
  'web-components': /<[a-z]+-[a-z-]+/i,
  'picture-element': /<picture/i
};

function isInsideFunction(node) {
  // Simple check - in real implementation, traverse up the AST
  return false;
}

function parseJSFeatures(code) {
  const foundFeatures = new Set();
  
  try {
    const ast = babelParser.parse(code, {
      sourceType: 'unambiguous',
      plugins: [
        'typescript',
        'jsx',
        'classProperties',
        'privateIn',
        'decorators-legacy',
        'dynamicImport',
        'optionalChaining',
        'nullishCoalescingOperator',
        'bigInt',
        'topLevelAwait'
      ]
    });

    traverse(ast, {
      enter(path) {
        const node = path.node;
        for (const [featureId, detector] of Object.entries(JS_FEATURES)) {
          if (detector(node)) {
            foundFeatures.add(featureId);
          }
        }
      }
    });
  } catch (error) {
    // Ignore parse errors for demo
  }

  return Array.from(foundFeatures);
}

function parseCSSFeatures(code) {
  const foundFeatures = new Set();
  
  try {
    // Simple regex-based detection for demo
    for (const [featureId, pattern] of Object.entries(CSS_FEATURES)) {
      if (pattern.test(code)) {
        foundFeatures.add(featureId);
      }
    }
  } catch (error) {
    // Ignore parse errors
  }

  return Array.from(foundFeatures);
}

function parseHTMLFeatures(code) {
  const foundFeatures = new Set();
  
  try {
    for (const [featureId, pattern] of Object.entries(HTML_FEATURES)) {
      if (pattern.test(code)) {
        foundFeatures.add(featureId);
      }
    }
  } catch (error) {
    // Ignore parse errors
  }

  return Array.from(foundFeatures);
}

function getFeatureBaselineYear(featureId) {
  const feature = features[featureId];
  if (!feature || !feature.status || !feature.status.baseline) return null;
  if (feature.status.baseline === false) return 9999; // Not baseline yet
  if (feature.status.baseline === 'low') return new Date(feature.status.baseline_low_date).getFullYear();
  if (feature.status.baseline === 'high') return new Date(feature.status.baseline_high_date).getFullYear();
  return null;
}

function checkFeatures(usedFeatures, baselineYear) {
  const errors = [];
  const safe = [];
  
  for (const featureId of usedFeatures) {
    const requiredYear = getFeatureBaselineYear(featureId);
    if (requiredYear && requiredYear > baselineYear) {
      errors.push({ feature: featureId, required: requiredYear });
    } else {
      safe.push({ feature: featureId, required: requiredYear || 'Unknown' });
    }
  }
  
  return { errors, safe };
}

module.exports = {
  parseJSFeatures,
  parseCSSFeatures,
  parseHTMLFeatures,
  getFeatureBaselineYear,
  checkFeatures
};