import { memo } from 'react';
import StarRating from './StarRating';
import { Link } from 'react-router';
import { IoTrashOutline } from 'react-icons/io5';

const MemoizedPlace = memo( function Place({ id, name, rating, onDelete, onRate }) {

  const handleRate = (newRating) => {
    onRate({id, name, rating: newRating});
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="p-3 outline outline-black/5 dark:outline-white/20 rounded-md shadow-md dark:shadow-gray-700/50 mb-4 
    flex flex-col">
      <h5 className="text-xl font-medium mb-2">
        <Link className="text-blue-600 underline" to={`/places/${id}`}>{name}</Link>
      </h5>
      <StarRating selectedStars={rating} onRate={handleRate} />
      <div className="flex justify-end mt-4">
        <button 
          className='primary' 
          onClick={handleDelete}
        >
          <IoTrashOutline/>
        </button>
      </div>
    </div>
  );
});

export default MemoizedPlace;