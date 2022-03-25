import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

/*
 *  React-Router-Dom setup
 *  Docs: https://reactrouter.com/docs/en/v6/getting-started/overview
 */

// This is the main Layout.
import Layout from './components/layout/Layout';

// These are all the pages that use the main Layout.
import DaoPage from './pages/DaoPage';
import Home from './pages/Home';
import ApiTest from './pages/ApiTest';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import ProposalPage from './pages/ProposalPage';
import NotFound from './pages/NotFound';

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/api-test' element={<ApiTest />} />
            <Route path='/:daoPage/create-post' element={<CreatePost />} />
            <Route path='/:dao' element={<DaoPage />} />
            <Route path='/:dao/proposal/:postId' element={<ProposalPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='*' element={<NotFound />} /> {/* 404 like page*/}
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}
