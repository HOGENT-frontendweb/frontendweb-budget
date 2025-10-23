// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className='flex flex-col items-center'  data-cy='loader'>
      <div className='animate-spin rounded-full h-15 w-15 border-b-4 border-blue-600'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
}
