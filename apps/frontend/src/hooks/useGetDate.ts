import { useSearchParams } from 'react-router-dom';

export default function useGetDate() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
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
