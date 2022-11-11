import './App.css';
import {PublicHome} from "./public/home/publicHome";
import {PrivateHome} from "./private/home/privateHome";
import {ToastContainer} from "react-toastify";
import { Routes, Route } from 'react-router-dom';
import {Login} from "./public/login/login";
import {Messages} from "./private/messages/messages";
import {Messages2} from "./private/messages/messages-2";
import {Documents} from "./private/documents/documents";
import {Settings} from "./private/settings/settings";
import {Administration} from "./private/admin/admin";
import {Partners} from "./private/partners/partners";
import {PrivateContainer} from "./private/private";
import Users from "./private/users/users";
import UserDetails from "./private/users/userDetailsViaStore";
import MessageDetails from "./private/message-details/messageDetails";
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from './shared/context/app.context';

function App() {
  const { ready } = useTranslation('translation');
  const client = new QueryClient();
  if (ready) {
    return (
        <div className="App">
          <QueryClientProvider client={client}>
            <AppProvider>
              <Routes>
                  <Route path="/" element={<PublicHome />} />
                  <Route path="/public" element={<PublicHome />} />
                  <Route path="/public/login" element={<Login />} />
                  <Route path="/private" element={<PrivateContainer />}>
                      <Route path='/private/home' element={<PrivateHome/>}/>
                      <Route path='/private/messages' element={<Messages2/>}/>
                      <Route path='/private/message/:id' element={<MessageDetails />}/>
                      <Route path='/private/documents' element={<Documents/>}/>
                      <Route path='/private/partners' element={<Partners/>}/>
                      <Route path='/private/users' element={<Users />}/>
                      <Route path="/private/users/:id" element={<UserDetails />} />
                      <Route path='/private/settings' element={<Settings/>}/>
                      <Route path='/private/admin' element={<Administration/>}/>
                  </Route>
              </Routes>
              <ToastContainer autoClose={3000} hideProgressBar />
            </AppProvider>

          </QueryClientProvider>
        </div>
    );
  } else {
    return (<></>);
  }
}

export default App;
