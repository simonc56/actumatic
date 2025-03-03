import { IProviderDto } from '@shared-libs';

export type SettingsState = {
  categories: ICategoryDetailedDto[];
  providers: Omit<IProviderDto, 'categoryId'>[];
};
