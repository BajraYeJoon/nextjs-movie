'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';

// Simulate a form action (in a real app, this would be a Server Action)
async function submitForm(prevState: any, formData: FormData) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Simulate validation
  if (!email || !message) {
    return { message: 'Please fill in all fields', success: false };
  }
  
  if (!email.toString().includes('@')) {
    return { message: 'Please enter a valid email', success: false };
  }
  
  // Simulate success
  return { 
    message: `Form submitted successfully for ${email}`, 
    success: true,
    email: email.toString(),
    messageText: message.toString()
  };
}

export default function FormStateDemo() {
  const [state, formAction] = useFormState(submitForm, { message: '', success: false });
  const [formData, setFormData] = useState({ email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">useFormState & useFormStatus</h1>
        <p className="text-muted-foreground mb-6">
          These hooks simplify form handling by managing submission state and providing status information.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Form Implementation</h2>
            <form action={formAction} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your message..."
                />
              </div>
              
              <SubmitButton />
            </form>
            
            {state.message && (
              <div className={`mt-4 p-3 rounded-md ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {state.message}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">useFormState</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Manages form state and handles submission. Takes an action function and initial state.
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`const [state, formAction] = useFormState(
  submitForm, 
  { message: '', success: false }
);`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">useFormStatus</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Provides information about the form submission status, including pending state.
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`const { pending } = useFormStatus();`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Benefits</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>Built-in state management</li>
                  <li>Automatic pending state handling</li>
                  <li>Progressive enhancement</li>
                  <li>Simplified error handling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? 'Submitting...' : 'Submit Form'}
    </button>
  );
}