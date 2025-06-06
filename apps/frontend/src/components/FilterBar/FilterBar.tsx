import { SegmentedControl, TextInput } from '@mantine/core';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { setDate, setFilter } from 'src/app/services/settingsSlice';
import useGetDate from 'src/hooks/useGetDate';
import classes from './Filterbar.module.css';

function FilterBar({ allowAllTime = false }: { allowAllTime?: boolean }) {
  const date = useAppSelector((state) => state.settings.date);
  const humanReadabledate = useGetDate();
  const filter = useAppSelector((state) => state.settings.filter);
  const dispatch = useAppDispatch();
  if (!allowAllTime && date === 'all-time') {
    dispatch(setDate('today'));
  }
  const daysMap = new Map([
    ["Aujourd'hui", 'today'],
    ['Hier', 'yesterday'],
  ]);
  if (allowAllTime) {
    daysMap.set('Tout', 'all-time');
  }
  const handleOnChangeDate = (value: string) => {
    dispatch(setDate(daysMap.get(value) || ''));
  };
  const handleOnChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.currentTarget.value || ''));
  };

  return (
    <div
      className={classes.filterBar}
    >
      <div className={classes.filterBar__content}>
        <SegmentedControl
          withItemsBorders={false}
          radius="md"
          data={Array.from(daysMap.keys())}
          value={Array.from(daysMap.keys()).find(
            (key) => daysMap.get(key) === date,
          )}
          onChange={handleOnChangeDate}
          style={{ maxHeight: '40px' }}
        />
        <p className={classes.date}>{humanReadabledate}</p>
        <TextInput
          radius="md"
          placeholder="Filtre"
          value={filter}
          onChange={handleOnChangeFilter}
          w={150}
          className={classes.filter}
        />
      </div>
    </div>
  );
}

export default FilterBar;
