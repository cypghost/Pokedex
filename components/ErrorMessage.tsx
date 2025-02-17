interface Props {
  onRetry: () => void
}

export default function ErrorMessage({ onRetry }: Props) {
  return (
    <div className="text-center">
      <p className="text-red-500 text-xl mb-4">Oops! Something went wrong.</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300"
      >
        Retry
      </button>
    </div>
  )
}

