import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import jsonUsers from './data/users.json'
import jsonRecipes from './data/recipes.json'
import AddRecipe from "./pages/AddRecipe";
import LoginPage from "./pages/LoginPage";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        activeUser: null,
     //     activeUser:   {
     //       "id": 1,
     //     "fname": "Mary",
     //     "lname": "Samovol",
     //     "email": "marsam@ua.com",
     //     "pwd": "123"
     // },
      allUsers: jsonUsers.map(item =>
                [this.id = item.id, this.fname = item.fname ,this.lname = item.lname,this.email = item.email,this.pdw= item.pwd]),
      allRecipes: jsonRecipes.map(item =>
                [item.id, item.name ,item.desc  , item.img, item.difficulty, item.userId]),
      activeUserRecipes: jsonRecipes.filter(recipe => recipe.userId === 1)
    }
      this.handleLogout = this.handleLogout.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    this.addRecipe = this.addRecipe.bind(this);

    console.log(this.state.allRecipes);
  }

    handleLogout() {
        this.setState({activeUser: null});
    }

    handleLogin(activeUser) {

        const activeUserRecipes = this.state.allRecipes.filter(recipe => recipe[4] === activeUser[0])

        this.setState({activeUser, activeUserRecipes});
    }

  addRecipe(newRecipe) {

    newRecipe.userId = this.state.activeUser.id;
    newRecipe.id = this.state.allRecipes[this.state.allRecipes.length - 1].id + 1;

    const allRecipes = this.state.allRecipes.concat(newRecipe);
    const activeUserRecipes = this.state.activeUserRecipes.concat(newRecipe);

    this.setState({allRecipes, activeUserRecipes});

    return newRecipe;
  }

  render() {

    const { activeUser, allUsers, activeUserRecipes } = this.state;
    // const activeUser = this.state.activeUser;

    return (
      <Switch>
          <Route exact path="/">
              <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
          </Route>
          <Route path="/login">
              <LoginPage users={this.state.allUsers} handleLogin={this.handleLogin}/>
          </Route>
        <Route path="/recipes">
          <RecipesPage recipes={activeUserRecipes} activeUser={activeUser} handleLogout={this.handleLogout} addRecipe={this.addRecipe}/>
        </Route>
          <Route path="/add">
          <AddRecipe recipes={activeUserRecipes} activeUser={activeUser} handleLogout={this.handleLogout} addRecipe={this.addRecipe}/>
          </Route>
      </Switch>
    );
  }
}

export default App;
