// ─────────────────────────────────────────────────────────────────────────────
// Error Boundary Component
// Prevents the entire app from crashing if a component fails
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 text-center flex flex-col items-center justify-center min-h-[200px]">
                    <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Something went wrong</h3>
                    <p className="text-xs text-zinc-500 mb-6 max-w-xs mx-auto">
                        {this.state.error?.message || 'There was an error loading this component.'}
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" /> Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
