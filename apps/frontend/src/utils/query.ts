import { useAppSelector } from 'src/app/hooks';

type NewsQueryOptions = {
  providerId?: string | undefined;
  begin?: string;
  end?: string;
  filter?: string;
  limit?: number;
};

export const setQueryOptions = (
  providerId: string | undefined,
): NewsQueryOptions => {
  const date = useAppSelector((state) => state.settings.date);
  const options: NewsQueryOptions = {};
  if (providerId) {
    options.providerId = providerId;
  }
  // utilisation de setHours pour gérer les problèmes de fuseau horaire
  if (date === 'today') {
    const todayBegin = new Date(new Date().setHours(0, 0, 0, 0));
    options.begin = todayBegin.toISOString();
  }
  if (date === 'yesterday') {
    const yesterdayBegin = new Date(
      new Date().setDate(new Date().getDate() - 1),
    );
    yesterdayBegin.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterdayEnd.setHours(23, 59, 59, 999);
    console.log('yesterdayEnd', yesterdayEnd);
    options.begin = yesterdayBegin.toISOString();
    options.end = yesterdayEnd.toISOString();
  }
  if (date === 'last-week') {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    lastWeek.setHours(0, 0, 0, 0);
    options.begin = lastWeek.toISOString();
  }
  console.log(options);
  return options;
};
