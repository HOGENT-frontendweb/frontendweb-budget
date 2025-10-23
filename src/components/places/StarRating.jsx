import { IoStarSharp } from 'react-icons/io5';
import { useThemeColor } from '../../contexts';

const Star = ({ index, selected = false, onSelect = (f) => f }) => {
  const {darkmode} = useThemeColor();
  const handleSelect = () => {
    onSelect(index + 1);
  };

  return (
    <IoStarSharp color={selected ? 'gold' :  darkmode?'white': 'grey'} onClick={handleSelect} />
  );
};

export default function StarRating({ totalStars = 5, selectedStars = 0, onRate }) {
  const stars = [...new Array(totalStars)];
  return (
    <>
      <div className="flex">
        {stars.map((_, i) => (
          <Star key={i} index={i} selected={selectedStars > i} onSelect={onRate} />
        ))}
      </div>
      <p className="text-gray-700 mt-2 dark:text-white">
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}