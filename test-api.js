// Simple test to verify the API is working
async function testAPI() {
  try {
    const response = await fetch('http://localhost:3002/api/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: `const user = data?.name ?? 'Anonymous';

.container {
  display: grid;
  
  .nested {
    color: blue;
    
    &:hover {
      color: red;
    }
  }
}

.parent:has(.child) {
  background: yellow;
}`,
        baseline: '2021'
      })
    });

    const result = await response.json();
    console.log('API Response:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('API Test Error:', error.message);
  }
}

testAPI();