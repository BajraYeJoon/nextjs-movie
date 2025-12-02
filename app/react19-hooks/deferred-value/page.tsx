'use client';

import { useDeferredValue, useState, useMemo } from 'react';

// Simulate an expensive filtering operation
function filterItems(items: string[], query: string): string[] {
  if (!query) return items;
  
  // Simulate expensive computation
  const result = [];
  for (let i = 0; i < 50; i++) {
    for (const item of items) {
      if (item.toLowerCase().includes(query.toLowerCase())) {
        result.push(item);
      }
    }
  }
  return result.filter((item, index, self) => 
    self.indexOf(item) === index && 
    item.toLowerCase().includes(query.toLowerCase())
  );
}

export default function UseDeferredValueDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  
  // Sample data
  const allItems = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "PHP",
    "Ruby",
    "Dart",
    "Flutter",
    "Vue.js",
    "Angular",
    "Svelte",
    "Express",
    "NestJS",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "OpenCV",
    "Unity",
    "Unreal Engine",
    "Figma",
    "Adobe XD",
    "Sketch",
    "Photoshop",
    "Illustrator",
    "Blender",
    "Maya",
    "Autocad",
    "SolidWorks",
    "MATLAB",
    "R"
  ];

  // Expensive computation that depends on deferred value
  const filteredItems = useMemo(() => {
    return filterItems(allItems, deferredSearchTerm);
  }, [deferredSearchTerm]);

  // Immediate filtering for comparison
  const immediateFilteredItems = useMemo(() => {
    return filterItems(allItems, searchTerm);
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">useDeferredValue Hook</h1>
        <p className="text-muted-foreground mb-6">
          This hook defers updating a value until more urgent updates have completed, keeping UI responsive.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Technology Search</h2>
            
            <div className="mb-6">
              <label htmlFor="tech-search" className="block text-sm font-medium text-foreground mb-2">
                Search Technologies
              </label>
              <input
                type="text"
                id="tech-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type to search technologies..."
              />
              <div className="mt-2 text-sm text-muted-foreground">
                Deferred value: <span className="font-mono bg-muted px-1 rounded">{deferredSearchTerm}</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">
                  With useDeferredValue
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Deferred updates - typing remains responsive
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <div key={index} className="p-2 bg-muted rounded flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No technologies found</p>
                  )}
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">
                  Without useDeferredValue
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Immediate updates - typing may stutter
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {immediateFilteredItems.length > 0 ? (
                    immediateFilteredItems.map((item, index) => (
                      <div key={index} className="p-2 bg-muted rounded flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No technologies found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">useDeferredValue</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Returns a deferred version of the value that lags behind the original by a few milliseconds.
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`const [value, setValue] = useState('');
const deferredValue = useDeferredValue(value);

// Expensive computation uses deferred value
const filteredData = useMemo(() => {
  return expensiveFilter(data, deferredValue);
}, [deferredValue]);`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Key Differences</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li><strong>useTransition</strong>: Wraps state updates</li>
                  <li><strong>useDeferredValue</strong>: Defers value propagation</li>
                  <li>Both keep UI responsive during expensive operations</li>
                  <li>useDeferredValue is better for passing values to child components</li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">When to Use</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>Passing search terms to child components</li>
                  <li>Filtering lists in child components</li>
                  <li>Any scenario where you defer expensive computations</li>
                  <li>When you can't wrap the state update directly</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Try It Out</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Type quickly in the search box to see how useDeferredValue keeps the UI responsive.
                  Watch how the deferred value updates slightly after the immediate value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}