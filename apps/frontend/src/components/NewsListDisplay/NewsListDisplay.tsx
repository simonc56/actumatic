import { Anchor, Table } from '@mantine/core';
import { isoToTimeString } from 'src/utils/datetime';
import classes from './NewsListDisplay.module.css';

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
          <Anchor
            href={news.url}
            target="_blank"
            // c="inherit"
            fz={14}
            className={classes.newsTitle}
          >
            {news.title}
          </Anchor>
        </Table.Td>
      </Table.Tr>
    )) ?? [];

  return (
    <div
      style={{
        borderRadius: '8px',
        border: `1px solid rgba(128, 128, 128, .2)`,
        overflow: 'hidden',
        marginBottom: '20px',
      }}
    >
      <Table
        striped
        highlightOnHover
        withRowBorders={false}
        verticalSpacing={3}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              colSpan={2}
              fz={24}
              bg="blue.9"
              className={classes.tableHeader}
            >
              {providerName}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default NewsListDisplay;
