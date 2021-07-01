import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Index from './pages/index/index'
import Search from './pages/search/search'
import Post from './pages/post/post'
import Profile from './pages/profile/profile'
import Community from './pages/community/community'
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import Welcome from './pages/welcome/welcome'
import Context from './context'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://onmhtrttxuqkpgzbcmrg.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export const pages = {
  index: "index",
  profile: "profile"
}

function App() {

  const [ person, setPerson ] = useState(null)

  const defaultContextValue = useMemo(() => ({
    tabs: [
      { page: pages.index, 
        tabNames: ['Your Community', 'The Larger Network'], 
        isTabOneActive: true 
      },
      { page: pages.profile, 
        tabNames: ['Searches', 'Suggestions'], 
        isTabOneActive: true
      }
    ],
    getPageTabs: (page, tabs) => { return tabs.filter((tab) => tab.page === page)[0] },
    currentUser: person
  }), [person])

  const [ value, setValue ] = useState(defaultContextValue)

  const providerValue = useMemo(() => ({value, setValue}), [value, setValue]);

  const [ user, setUser ] = useState(null);

  const getCurrentPerson = useCallback(async (currentUser) => {
    const { data: person, error } = await supabase
      .from('person')
      .select('*')
      .eq('userId', currentUser.id)
      if(error) console.log(error)
      else {
        setPerson(person)
        setValue({
          ...defaultContextValue,
          currentUser: person
        })
      }
  }, [defaultContextValue])

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    if(user && !person){
      getCurrentPerson(user)
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {

            const currentUser = session?.user;
            setUser(currentUser ?? null);

            if (currentUser){
              let { data: person, error } = await supabase
                .from('person')
                .select('*')
                .eq('userId', currentUser.id)

                //change the value of isEmailConfirmed for a newly registered user
                if(event === 'SIGNED_IN' && document.location.pathname === '/welcome' && person.isEmailConfirmed !== true){
                  await supabase
                    .from('person')
                    .update({ 'isEmailConfirmed': true })
                    .eq('userId', currentUser.id)
                }

                if(error) console.log(error)
                else setPerson(person)
            }
        }
    );

    return () => {
        authListener?.unsubscribe();
    };
  }, [user, defaultContextValue, person, getCurrentPerson]);

  return (
    <Router>
      <Switch>
        <Context.Provider value={providerValue}>
          <Route exact path='/'>
            <Index page={pages.index} />
          </Route>

          <Route path='/search/:id' component={Search} />

          <Route path='/post'>
            <Post />
          </Route>

          <Route exact path='/profile/:name'>
            <Profile page={pages.profile} />
          </Route>

          <Route path='/profile/:name/community'>
            <Community />
          </Route>

          {/* Auth Routes */}

          <Route path='/register'>
            <Register />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/welcome'>
            <Welcome />
          </Route>

        </Context.Provider>
      </Switch>
    </Router>
  );
}

export default App;
