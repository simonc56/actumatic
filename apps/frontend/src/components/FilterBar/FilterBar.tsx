import { SegmentedControl, TextInput } from '@mantine/core';
import useGetDate from 'src/hooks/useGetDate';

function FilterBar() {
  const date = useGetDate();

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
        data={["Aujourd'hui", 'Hier', 'Tout']}
      />
      <p>{date}</p>
      <TextInput radius="md" placeholder="Filtre" />
    </div>
  );
}

export default FilterBar;
