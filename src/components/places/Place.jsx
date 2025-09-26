import StarRating from './StarRating';
export default function Place({ id, name, rating, onDelete, onRate }) {

  const handleDelete = () => {
    onDelete(id);
  };

  const handleRate = (newRating) => {
    onRate(id, newRating);
  };

  return (
    <div className="p-3 outline outline-black/5 rounded-md shadow-lg mb-4">
      <h5 className="text-xl font-medium mb-2">{name}</h5>
      <StarRating selectedStars={rating} onRate={handleRate} />
      <button className='mt-6 py-2 px-2.5 rounded-md bg-blue-600 text-white' onClick={handleDelete}>Verwijder</button>
    </div>
  );
}