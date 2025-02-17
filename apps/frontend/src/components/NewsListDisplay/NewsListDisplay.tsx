import { Anchor, Table } from '@mantine/core';
import { isoToTimeString } from 'src/utils/datetime';

type Props = {
  providerName: string;
  news: {
    id: string;
    title: string;
    url: string;
    createdAt: string;
  }[];
};

function NewsListDisplay({ providerName, news }: Props) {
  if (!news.length) return null;
  const rows =
    news.map((news) => (
      <Table.Tr key={news.url}>
        <Table.Td w={1} opacity={0.7} fz={12}>
          {isoToTimeString(news.createdAt)}
        </Table.Td>
        <Table.Td
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Anchor href={news.url} target="_blank" c="inherit" fz={14}>
            {news.title}
          </Anchor>
        </Table.Td>
      </Table.Tr>
    )) ?? [];

  return (
    <Table
      striped
      highlightOnHover
      withRowBorders={false}
      verticalSpacing={3}
      // style={{ borderRadius: 5 }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th
            colSpan={2}
            fz={24}
            bg="blue.9"
            c="gray.3"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {providerName}
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default NewsListDisplay;
