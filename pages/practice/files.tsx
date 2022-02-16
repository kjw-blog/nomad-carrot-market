export default function Files() {
  return (
    <div className="flex flex-col space-y-2 p-5">
      <p className="first-letter:text-7xl first-letter:hover:text-purple-400">
        Hello everyone!
      </p>
      <input
        type="file"
        className="file:cursor-pointer file:hover:text-purple-400 file:hover:bg-white file:hover:border-purple-400 file:hover:border file:transition-colors file:border-0 file:rounded-xl file:px-5 file:bg-purple-400 file:text-white"
      />
    </div>
  );
}
