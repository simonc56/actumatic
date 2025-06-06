import { Route, Routes } from 'react-router-dom';
import CategoryNewsPage from 'src/components/CategoryNewsPage/CategoryNewsPage';
import ContactPage from 'src/components/ContactPage/ContactPage';
import FAQPage from 'src/components/FAQPage/FAQPage';
import { FooterLinks } from 'src/components/Footer/FooterLinks';
import Header from 'src/components/Header/Header';
import LegalPage from 'src/components/LegalPAge/LegalPage';
import ProviderNewsPage from 'src/components/ProviderNewsPage/ProviderNewsPage';
import SortedNewsList from 'src/components/SortedNewsList/SortedNewsList';
import { useAppDispatch } from './hooks';
import { fetchCategoriesAndProviders } from './services/settingsSlice';

function App() {
  const dispatch = useAppDispatch();
  dispatch(fetchCategoriesAndProviders());
  return (
    <div style={{minHeight: '100vh', flexDirection: 'column', display: 'flex', justifyContent: 'space-between'}}>
      <Header />
        <Routes>
          <Route path="/category/:slug" element={<CategoryNewsPage />} />
          <Route path="/provider/:slug" element={<ProviderNewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/" element={<SortedNewsList />} />
          <Route path="*" element={<div>Page introuvable</div>} />
        </Routes>
      <FooterLinks />
    </div>
  );
}

export default App;

