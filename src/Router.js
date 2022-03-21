import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*
 *  React-Router-Dom setup
 *  Docs: https://reactrouter.com/docs/en/v6/getting-started/overview
 */

// This is the main Layout.
import Layout from './components/layout/Layout';

// These are all the pages that use the main Layout.
import Home from './pages/Home';
import ApiTest from './pages/ApiTest';
import User from './pages/User';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
