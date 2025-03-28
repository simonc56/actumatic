import { Flex, Title } from '@mantine/core';
import { INewsDto } from '@shared-libs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { selectCategoryByIdOrSlug } from 'src/app/store';
import { getCategoryColor } from 'src/utils/style';
import NewsList from '../NewsList/NewsList';
import classes from './ProvidersList.module.css';

type ProvidersListProps = {
  isHeaderWithLink?: boolean;
  categoryId: string;
  newsByProviders: {
    providerId: string;
    news: Omit<INewsDto, 'providerId'>[];
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

function ProvidersList({
  isHeaderWithLink = true,
  categoryId,
  newsByProviders,
}: ProvidersListProps) {
  const category = useAppSelector(selectCategoryByIdOrSlug(categoryId));
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

  if (!newsByProviders.length || !category) return null;
  return (
    <>
      <Title
        order={2}
        className={classes.categoryTitle}
        style={{ color: getCategoryColor(category.name) }}
      >
        {isHeaderWithLink ? (
          <Link
            to={`/category/${category.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {category.name}
          </Link>
        ) : (
          category.name
        )}
      </Title>
      <Flex
        direction="column"
        gap="lg"
        wrap="wrap"
        justify="flex-start"
        style={
          isNarrowScreen && newsByProviders.length > 1
            ? { maxHeight: 100 + totalHeightInPixels / 1.7 }
            : {}
        }
      >
        {newsByProviders.map((provider) => (
          <NewsList
            providerId={provider.providerId}
            key={provider.providerId}
            news={provider.news}
            color={getCategoryColor(category.name)}
          />
        ))}
      </Flex>
    </>
  );
}

export default ProvidersList;
