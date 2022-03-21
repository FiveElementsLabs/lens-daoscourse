import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*
 *  React-Router-Dom setup
 *  Docs: https://reactrouter.com/docs/en/v6/getting-started/overview
 */
//import Dao Profiles
import { DAO_PROFILES } from './lib/ConfigVars';

// This is the main Layout.
import Layout from './components/layout/Layout';

// These are all the pages that use the main Layout.
import Profile from './pages/Profile';
import Home from './pages/Home';
import ApiTest from './pages/ApiTest';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="/:dao" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
