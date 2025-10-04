import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById, updateById } from '../../api';
import PlacesCards from '../../components/places/PlacesCards';
import AsyncData from '../../components/AsyncData';

const PlacesList = () => {

  const { data, error, isLoading } = useSWR('places', getAll);

  const { trigger: deletePlace, error: deleteError } = useSWRMutation('places', deleteById);

  const { trigger: updatePlace, error: saveError } = useSWRMutation('places', updateById);

  return (
    <>
      <h1>Places</h1>

      <AsyncData loading={isLoading} error={error || deleteError || saveError}>
        <PlacesCards places={data} onRate={updatePlace} onDelete={deletePlace} />
      </AsyncData>
    </>
  );
};

export default PlacesList;
