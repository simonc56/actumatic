import { Title } from '@mantine/core';
import NewsListDisplay from '../NewsListDisplay/NewsListDisplay';
import classes from './ProvidersListDisplay.module.css';

type ProvidersListProps = {
  categoryName: string;
  newsByProviders: {
    id: string;
    name: string;
    news: {
      id: string;
      title: string;
      url: string;
      createdAt: string;
    }[];
  }[];
};

function ProvidersListDisplay({
  categoryName,
  newsByProviders,
}: ProvidersListProps) {
  if (!newsByProviders?.length) return null;
  return (
    <>
      <Title order={2} className={classes.categoryTitle}>
        {categoryName}
      </Title>
      {newsByProviders.map((provider) => (
        <NewsListDisplay
          providerName={provider.name}
          key={provider.id}
          news={provider.news}
        />
      ))}
    </>
  );
}

export default ProvidersListDisplay;
