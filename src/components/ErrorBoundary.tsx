import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  onResetRoute?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'حدث خطأ غير متوقع في واجهة التطبيق.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AI Engineer Academy ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (this.props.onResetRoute) {
      this.props.onResetRoute();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          lang="ar"
          className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900 dark:bg-[#0B0F17] dark:text-slate-100"
        >
          <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" aria-hidden="true" />
              <h1 className="text-xl font-bold">حدث خطأ غير متوقع</h1>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              تعذر عرض هذا القسم مؤقتاً. يمكنك إعادة تعيين الواجهة والعودة إلى لوحة التحكم.
            </p>
            {this.state.errorMessage && (
              <p
                dir="ltr"
                className="font-mono text-xs p-3 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 break-words"
              >
                {this.state.errorMessage}
              </p>
            )}
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>العودة إلى لوحة التحكم</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
