Add tsconfig.js

```
{
    "compilerOptions": {
      "target": "ES6", // Compile to ES6 JavaScript
      "module": "CommonJS", // Use CommonJS modules
      "strict": true, // Enable strict type-checking
      "sourceMap": true, // Generate source maps for debugging
      "esModuleInterop": true, // Enable ES module interop
      "outDir": "./dist", // Output compiled files to the 'dist' directory
      "rootDir": "./src", // Set the root directory for TypeScript files
      "skipLibCheck": true, // Skip type-checking of declaration files
      "allowJs": true // Allow JavaScript files to be compiled
    },
    // "include": ["pages/**/*", "utils/**/*"], // Include all files in the 'pages' directory
    "exclude": ["node_modules", "tests", "test-data"] // Exclude 'node_modules' and 'tests'
}
```