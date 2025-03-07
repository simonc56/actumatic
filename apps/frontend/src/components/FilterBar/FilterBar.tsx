import { SegmentedControl, TextInput } from '@mantine/core';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { setDate, setFilter } from 'src/app/services/settingsSlice';
import useGetDate from 'src/hooks/useGetDate';

function FilterBar() {
  const date = useGetDate();
  const filter = useAppSelector((state) => state.settings.filter);
  const dispatch = useAppDispatch();
  const daysMap = new Map([
    ["Aujourd'hui", 'today'],
    ['Hier', 'yesterday'],
  ]);

  const handleOnChangeDate = (value: string) => {
    dispatch(setDate(daysMap.get(value) || 'today'));
  };
  const handleOnChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.currentTarget.value || ''));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxHeight: '40px',
      }}
    >
      <SegmentedControl
        withItemsBorders={false}
        radius="md"
        data={Array.from(daysMap.keys())}
        onChange={handleOnChangeDate}
      />
      <p>{date}</p>
      <TextInput
        radius="md"
        placeholder="Filtre"
        value={filter}
        onChange={handleOnChangeFilter}
      />
    </div>
  );
}

export default FilterBar;
