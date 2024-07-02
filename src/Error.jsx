function Error({ errorMessage }) {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-10 backdrop-blur-md z-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-lg text-gray-700">
          {errorMessage ||
            "Something went wrong! Please try again in few minutes."}
        </p>
      </div>
    </div>
  );
}

export default Error;
