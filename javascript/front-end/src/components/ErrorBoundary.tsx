import React, { ErrorInfo, ReactNode } from "react";
import { handleApiError } from "@/utils/errorHandler";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        handleApiError({ status: 500, message: error.message });
    }

    render() {
        if (this.state.hasError) {
            return <h1>متأسفیم، خطایی رخ داده است.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
