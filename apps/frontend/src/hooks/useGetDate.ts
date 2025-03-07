import { useAppSelector } from 'src/app/hooks';

export default function useGetDate() {
  // const [searchParams] = useSearchParams();
  // const date = searchParams.get('date');
  const date = useAppSelector((state) => state.settings.date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  let humanReadableDate: string =
    "Aujourd'hui, " + new Date().toLocaleDateString('fr-FR', options);
  if (date === 'yesterday') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    humanReadableDate =
      'Hier, ' + yesterday.toLocaleDateString('fr-FR', options);
  }
  if (date === 'last-week') {
    humanReadableDate = 'La semaine dernière';
  }
  if (date === 'all-time') {
    humanReadableDate = 'Tout';
  }
  return humanReadableDate;
}
