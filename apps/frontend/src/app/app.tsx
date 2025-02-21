import { Container } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import CategoryNewsPage from 'src/components/CategoryNewsPage/CategoryNewsPage';
import Header from 'src/components/Header/Header';
import ProviderNewsPage from 'src/components/ProviderNewsPage/ProviderNewsPage';
import SortedNewsList from 'src/components/SortedNewsList/SortedNewsList';

export function App() {
  return (
    <div>
      <Header />
      <Container>
        <Routes>
          <Route path="/category/:id" element={<CategoryNewsPage />} />
          <Route path="/provider/:id" element={<ProviderNewsPage />} />
          <Route path="/" element={<SortedNewsList />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
