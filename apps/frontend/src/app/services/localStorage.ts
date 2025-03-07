import { SettingsState } from 'src/@types/settings';

// en prévision d'un stockage des settings dans le localStorage
export const getInitialSettingsState = () => {
  const defaultSettingsState: SettingsState = {
    categories: [],
    providers: [],
    date: 'today',
    filter: '',
  };
  return defaultSettingsState;
};
