import React, { useEffect } from 'react';
import axios from 'axios'
import { CsrfToken } from './types/types';
import { useAppSelector } from './app/hooks';
import { selectCsrfState } from './slices/appSlice';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from './components/auth';
import { Todo } from './components/todo';


function App() {
  const csrf = useAppSelector(selectCsrfState)
  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrftoken`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
    }
    getCsrfToken()
  }, [csrf])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
