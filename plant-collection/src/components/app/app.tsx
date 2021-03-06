import React from 'react';
import Header from '../header';
import Main from '../main'
import { BrowserRouter as Router, Switch, Route, match as routerMatch } from 'react-router-dom';
import Product from '../product';
import './app.css'
import AddNewPlant from '../manage/add-new-plant';
import Navigation from '../manage/navigation';
import RemovePlant from '../manage/remove-plant';
import EditPlant from '../manage/edit-plant';


export default (
  function App() {
    return (
      <div className="app-body">
        <Router>
          <Header></Header>
          <div className="app-container">
            <Switch>
              <Route path="/product/:id">
                <Product />
              </Route>
              <Route path="/admin" component={AdminRouter} />
              <Route path="/">
                <Main />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
)


const AdminRouter = ({ match }: { match: routerMatch }) => {
  return (
    <div>
      <Navigation></Navigation>
      <Route exact path={match.url}>
        <div className="flower-img">
          <img src="https://www.animatedimages.org/data/media/595/animated-plant-image-0076.gif"
            alt="animated-plant-0076" />
        </div>
      </Route>
      <Route path={match.url + '/remove-plant'}>
        <RemovePlant></RemovePlant>
      </Route>
      <Route path={match.url + '/add-new-plant'}>
        <AddNewPlant></AddNewPlant>
      </Route>
      <Route path={match.url + '/edit-existing-plant'}>
        <EditPlant></EditPlant>
      </Route>
    </div>

  )
}