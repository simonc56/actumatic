import { Container } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import CategoryNewsPage from 'src/components/CategoryNewsPage/CategoryNewsPage';
import ContactPage from 'src/components/ContactPage/ContactPage';
import { FooterLinks } from 'src/components/Footer/FooterLinks';
import Header from 'src/components/Header/Header';
import ProviderNewsPage from 'src/components/ProviderNewsPage/ProviderNewsPage';
import SortedNewsList from 'src/components/SortedNewsList/SortedNewsList';
import { useAppDispatch } from './hooks';
import { fetchCategoriesAndProviders } from './services/settingsSlice';

export function App() {
  const dispatch = useAppDispatch();
  dispatch(fetchCategoriesAndProviders());
  return (
    <div>
      <Header />
      <Container size={1600}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryNewsPage />} />
          <Route path="/provider/:slug" element={<ProviderNewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/" element={<SortedNewsList />} />
          <Route path="*" element={<div>Page introuvable</div>} />
        </Routes>
      </Container>
      <FooterLinks />
    </div>
  );
}

export default App;
