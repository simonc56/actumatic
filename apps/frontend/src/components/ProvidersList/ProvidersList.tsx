import { Flex, Title } from '@mantine/core';
import { INewsDto } from '@shared-libs';
import { useEffect, useState } from 'react';
import { getCategoryColor } from 'src/utils/style';
import NewsList from '../NewsList/NewsList';
import classes from './ProvidersList.module.css';

type ProvidersListProps = {
  categoryName: string;
  newsByProviders: {
    id: string;
    name: string;
    news: INewsDto[];
  }[];
};

function countProvidersAndNews(
  newsByProviders: ProvidersListProps['newsByProviders'],
) {
  let nbOfProviders = 0;
  let nbOfNews = 0;
  for (const provider of newsByProviders) {
    nbOfProviders++;
    nbOfNews += provider.news.length;
  }
  return [nbOfProviders, nbOfNews];
}

function ProvidersList({ categoryName, newsByProviders }: ProvidersListProps) {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [nbOfProviders, nbOfNews] = countProvidersAndNews(newsByProviders);
  const totalHeightInPixels = nbOfProviders * 62 + nbOfNews * 28;

  useEffect(() => {
    // window.matchMedia is not dynamic, so we need to add an event listener
    // to update the 'isNarrowScreen' state when the screen size changes
    const mediaWatcher = window.matchMedia('(min-width: 1100px)');
    setIsNarrowScreen(mediaWatcher.matches);

    function updateIsNarrowScreen(event: MediaQueryListEvent) {
      setIsNarrowScreen(event.matches);
    }

    mediaWatcher.addEventListener('change', updateIsNarrowScreen);
    return function cleanup() {
      mediaWatcher.removeEventListener('change', updateIsNarrowScreen);
    };
  }, []);

  if (!newsByProviders?.length) return null;
  return (
    <>
      <Title
        order={2}
        className={classes.categoryTitle}
        style={{ color: getCategoryColor(categoryName) }}
      >
        {categoryName}
      </Title>
      <Flex
        direction="column"
        gap="lg"
        wrap="wrap"
        justify="flex-start"
        style={
          isNarrowScreen ? { maxHeight: 300 + totalHeightInPixels / 2 } : {}
        }
      >
        {newsByProviders.map((provider) => (
          <NewsList
            providerId={provider.id}
            providerName={provider.name}
            key={provider.id}
            news={provider.news}
            color={getCategoryColor(categoryName)}
          />
        ))}
      </Flex>
    </>
  );
}

export default ProvidersList;
