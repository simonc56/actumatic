import { IProviderDto } from '@shared-libs';
import { renderHook, waitFor } from '@testing-library/react';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest';
import { enhancedApi as api } from '../../app/services/api';
import { setupApiStore } from '../../utils/test-utils';
import { useGetCategoriesQuery, useGetCategoryQuery } from '../category';
import { useGetAllNewsQuery, useGetNewsQuery } from '../news';
import {
  useCreateProviderMutation,
  useGetProviderQuery,
  useGetProvidersQuery,
} from '../provider';

const baseUrl = `${import.meta.env.VITE_API_BASEURL}/api`;

// Mock data
const mockProviders = [
  { id: '1', name: 'Provider 1', url: 'http://provider1.com', categoryId: '1' },
  { id: '2', name: 'Provider 2', url: 'http://provider2.com', categoryId: '1' },
];

const mockCategories = [
  { id: '1', name: 'Category 1' },
  { id: '2', name: 'Category 2' },
];

const mockNews = [
  {
    id: '1',
    title: 'News 1',
    url: 'http://news1.com',
    providerId: '1',
    createdAt: new Date('2024-07-14').toISOString(),
  },
  {
    id: '2',
    title: 'News 2',
    url: 'http://news2.com',
    providerId: '1',
    createdAt: new Date('2024-07-14').toISOString(),
  },
];

// Setup MSW server
export const server = setupServer(
  // Provider endpoints
  http.get(`${baseUrl}/provider`, () => {
    return Response.json(mockProviders);
  }),
  http.get(`${baseUrl}/provider/:id`, ({ params }) => {
    const { id } = params;
    return Response.json(mockProviders.find((p) => p.id === id));
  }),
  http.post(`${baseUrl}/provider`, async ({ request }) => {
    const newProvider = (await request.json()) as IProviderDto;
    return Response.json({ ...newProvider });
  }),

  // Category endpoints
  http.get(`${baseUrl}/category`, () => {
    return Response.json(mockCategories);
  }),
  http.get(`${baseUrl}/category/:id`, ({ params }) => {
    const { id } = params;
    return Response.json(mockCategories.find((c) => c.id === id));
  }),

  // News endpoints
  http.get(`${baseUrl}/news/all`, () => {
    return Response.json(mockNews);
  }),
  http.get(`${baseUrl}/news/:id`, ({ params }) => {
    const { id } = params;
    return Response.json(mockNews.find((n) => n.id === id));
  }),
);

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={setupApiStore(api).store}>{children}</Provider>
);

describe('API Tests', () => {
  beforeEach(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('Provider API', () => {
    it('fetches providers successfully', async () => {
      const { result } = renderHook(() => useGetProvidersQuery(), { wrapper });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockProviders);
    });

    it('fetches single provider successfully', async () => {
      const { result } = renderHook(() => useGetProviderQuery('1'), {
        wrapper,
      });

      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => {
        expect(result.current.data).toEqual(mockProviders[0]);
      });
    });

    it('creates provider successfully', async () => {
      const newProvider: IProviderDto = {
        name: 'New Provider',
        id: '3',
        url: 'http://new.provider.com',
        categoryId: '1',
      };
      const { result } = renderHook(() => useCreateProviderMutation(), {
        wrapper,
      });

      const [createProvider] = result.current;
      const response = await createProvider(newProvider).unwrap();
      expect(response).toEqual(newProvider);
    });
  });

  describe('Category API', () => {
    it('fetches categories successfully', async () => {
      const { result } = renderHook(() => useGetCategoriesQuery(), { wrapper });

      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => {
        expect(result.current.data).toEqual(mockCategories);
      });
    });

    it('fetches single category successfully', async () => {
      const { result } = renderHook(() => useGetCategoryQuery('1'), {
        wrapper,
      });

      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => {
        expect(result.current.data).toEqual(mockCategories[0]);
      });
    });
  });

  describe('News API', () => {
    it('fetches all news successfully', async () => {
      const { result } = renderHook(
        () => useGetAllNewsQuery({ after: '2024-01-01', before: '2024-12-31' }),
        { wrapper },
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => {
        expect(result.current.data).toEqual(mockNews);
      });
    });

    it('fetches single news successfully', async () => {
      const { result } = renderHook(() => useGetNewsQuery('1'), { wrapper });

      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => {
        expect(result.current.data).toEqual(mockNews[0]);
      });
    });
  });
});
