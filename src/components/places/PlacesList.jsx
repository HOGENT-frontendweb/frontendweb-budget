import { useState } from 'react';
import { PLACE_DATA } from '../../api/mock_data';
import Place from './Place';

const PlacesList = () => {
  const [places, setPlaces] = useState(PLACE_DATA);

  const handleDeletePlace = (id) => {
    setPlaces((places) => places.filter((p) => p.id !== id));
  };

  const handleRatePlace = (id, rating) => {
    const newPlaces = places.map((p) => (p.id === id ? { ...p, rating } : p));
    setPlaces(newPlaces);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
      {
        places.sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
          .map((p) => <div key={p.id}><Place {...p} onDelete={handleDeletePlace} onRate={handleRatePlace} /></div>)
      }
    </div>
  );
};

export default PlacesList;
