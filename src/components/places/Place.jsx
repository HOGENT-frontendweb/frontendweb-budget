import StarRating from './StarRating';
import { Link } from 'react-router';
export default function Place({ id, name, rating, onDelete, onRate }) {
  
  const handleRate = (newRating) => {
    onRate({id, name, rating: newRating});
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="p-3 outline outline-black/5 rounded-md shadow-lg mb-4">
      <h5 className="text-xl font-medium mb-2">
        <Link className="text-blue-600 underline" to={`/places/${id}`}>{name}</Link>
      </h5>
      <StarRating selectedStars={rating} onRate={handleRate} />
      <button className='mt-6 py-2 px-2.5 rounded-md bg-blue-600 text-white' onClick={handleDelete}>Verwijder</button>
    </div>
  );
}