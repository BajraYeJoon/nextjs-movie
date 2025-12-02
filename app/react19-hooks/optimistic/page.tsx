'use client';

import { useOptimistic, useState, useRef } from 'react';

type Comment = {
  id: number;
  text: string;
  author: string;
  timestamp: string;
};

// Simulate an API call to add a comment
async function addComment(comment: string): Promise<Comment> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate occasional failure
  if (Math.random() < 0.2) {
    throw new Error('Failed to add comment');
  }
  
  return {
    id: Date.now(),
    text: comment,
    author: 'You',
    timestamp: new Date().toLocaleTimeString()
  };
}

export default function OptimisticDemo() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: 'This is the first comment!', author: 'Alice', timestamp: '10:30 AM' },
    { id: 2, text: 'Great post, thanks for sharing.', author: 'Bob', timestamp: '11:15 AM' }
  ]);
  
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state: Comment[], newComment: Comment) => [...state, newComment]
  );
  
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const commentText = formData.get('comment') as string;
    
    if (!commentText.trim()) return;
    
    // Clear error
    setError(null);
    
    // Create optimistic comment
    const optimisticComment: Comment = {
      id: Date.now(),
      text: commentText,
      author: 'You',
      timestamp: 'Just now...'
    };
    
    // Add optimistic comment immediately
    addOptimisticComment(optimisticComment);
    
    // Clear form
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    
    try {
      // Actually add comment
      const newComment = await addComment(commentText);
      
      // Update with actual comment
      setComments(prev => [...prev, newComment]);
    } catch (err) {
      // Remove optimistic comment and show error
      setError('Failed to add comment. Please try again.');
      setComments(prev => prev.filter(c => c.id !== optimisticComment.id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">useOptimistic Hook</h1>
        <p className="text-muted-foreground mb-6">
          This hook enables optimistic UI updates, showing immediate feedback while async operations complete.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Comment System</h2>
            
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-3">
                <textarea
                  ref={textareaRef}
                  name="comment"
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Post Comment
              </button>
            </form>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Comments ({optimisticComments.length})</h3>
              {optimisticComments.length === 0 ? (
                <p className="text-muted-foreground">No comments yet.</p>
              ) : (
                <div className="space-y-3">
                  {optimisticComments.map(comment => (
                    <div key={comment.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium text-foreground">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="mt-1 text-foreground">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">useOptimistic</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Takes current state and an update function. Returns optimistic state and a setter.
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">
{`const [optimisticState, addOptimistic] = useOptimistic(
  currentState,
  (state, updateValue) => // update function
);`}
                </pre>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Implementation Pattern</h3>
                <ol className="text-sm text-muted-foreground mt-1 list-decimal pl-5 space-y-1">
                  <li>Show optimistic update immediately</li>
                  <li>Perform async operation</li>
                  <li>Replace with actual result or rollback on error</li>
                </ol>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Benefits</h3>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5 space-y-1">
                  <li>Improved perceived performance</li>
                  <li>Better user experience</li>
                  <li>Smoother interactions</li>
                  <li>Error handling with rollback</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Try It Out</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Add a comment to see the optimistic update in action. 
                  Notice how it appears immediately even though there's a simulated 1-second delay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}