import { Container } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import CategoryNewsPage from 'src/components/CategoryNewsPage/CategoryNewsPage';
import { FooterLinks } from 'src/components/Footer/FooterLinks';
import Header from 'src/components/Header/Header';
import ProviderNewsPage from 'src/components/ProviderNewsPage/ProviderNewsPage';
import SortedNewsList from 'src/components/SortedNewsList/SortedNewsList';

export function App() {
  return (
    <div>
      <Header />
      <Container size="2xl">
        <Routes>
          <Route path="/category/:id" element={<CategoryNewsPage />} />
          <Route path="/provider/:id" element={<ProviderNewsPage />} />
          <Route path="/" element={<SortedNewsList />} />
        </Routes>
      </Container>
      <FooterLinks />
    </div>
  );
}

export default App;
