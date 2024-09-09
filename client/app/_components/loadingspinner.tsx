export function LoadingSpinner() {
    return (
        <div className="w-5 h-5 relative">
            <div className="w-full h-full border border-transparent rounded-full border-t-white animate-spin"></div>
        </div>
    );
}

export default LoadingSpinner;