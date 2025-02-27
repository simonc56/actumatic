import { Anchor, Table } from '@mantine/core';
import { INewsDto } from '@shared-libs';
import { Link } from 'react-router-dom';
import { isoToShortDateString, isoToTimeString } from 'src/utils/datetime';
import classes from './NewsList.module.css';

type Props = {
  providerId: string;
  providerName: string;
  news: INewsDto[];
  color: string;
};

function NewsList({ providerId, providerName, news, color }: Props) {
  if (!news.length) return null;
  const rows =
    news.map((news) => (
      <Table.Tr key={news.url}>
        <Table.Td w={76} opacity={0.7} fz={12} style={{ paddingInline: 6 }}>
          {isoToShortDateString(news.createdAt)}{' '}
          {isoToTimeString(news.createdAt)}
        </Table.Td>
        <Table.Td
          maw="md"
          style={{
            paddingInline: 6,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Anchor
            href={news.url}
            target="_blank"
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
        maxWidth: '946px', // half fullHD screen
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
              fz={18}
              fw={600}
              bg={color}
              className={classes.tableHeader}
            >
              <Link
                to={`provider/${providerId}?date=all`}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {providerName}
              </Link>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default NewsList;
