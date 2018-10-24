import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import NavSearchBar from './components/navbar_search';
import Pagination from './components/pagination';
import MovieList from './components/movie_list';
import 'moviedb';
import _ from 'lodash';
import {BrowserRouter, Route} from 'react-router-dom';



const API_KEY = '607cc4bba6dca4cb96fbdef1ca9b62cd';
const MovieDb = require('moviedb');
const moviedb = new MovieDb(API_KEY);




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
          currentPageMovies: [],
          lastQuery: '',
          querySet: {},
          currentMaxPage: 0,
          currentPage: 1,
          user: this.initialUserState,
          initiated: false

      };
    this.runSearchMovie('');


  }

  get initialUserState(){
      return {ownedMovies:[], balance: 100000};
  }

  initializeState(){
      let storedUser= this.checkLocalStorage();
      this.setState({user: storedUser}, console.log(this.state.user));
      this.setState({initiated: true})



  }

  checkLocalStorage(){
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log('this is the data ', storedUser);
      return storedUser;
  }

  storeToLocalStorage(key,data) {
      localStorage.setItem(key, JSON.stringify(data));
  }

  runDiscoverMovie(pageNum=1) {
      let parameters = {
            language: 'en-US',
            sort_by: 'popularity.desc',
            page: pageNum,
            include_adult: 'false',
            include_video: 'false',

      };
      moviedb.discoverMovie(parameters, (err,res) => {
          console.log('discover movie function invoked');
          let temp ={};
          temp[res.page]= res.results;
          if(this.state.lastQuery !== '') {
              console.log('different query invoked')
              console.log('last query was ', this.state.lastQuery);
              this.setState({querySet: {}});
              this.setState({lastQuery: ''}, () => console.log(this.state.lastQuery));
          }

          if(!this.state.querySet[pageNum]) {
              console.log('different page searched')
              this.setState({querySet: {...this.state.querySet, ...temp}}, () => {
                  console.log(this.state.querySet)
              });
              this.setState({currentPage: pageNum});

          }
          this.setState({currentPageMovies: this.state.querySet[res.page]}, () => {console.log(this.state.currentPageMovies)
          this.setState({currentMaxPage: res.total_pages}, ()=> console.log('max page', this.state.currentMaxPage));
          });

      });

  }

  runSearchMovie(term,pageNum=1) {
      if(!term) {
          return this.runDiscoverMovie(pageNum);
      }
      moviedb.searchMovie({ query: term, page: pageNum, include_adult: false }, (err, res) => {
          console.log('movie search invoked')
          let temp = {};
          temp[res.page] = res.results;
          if(term !== this.state.lastQuery) {
              console.log('different query invoked')
              console.log('last query was ', this.state.lastQuery);
              this.setState({querySet: {}});
              this.setState({lastQuery: term}, () => console.log(this.state.lastQuery));
              this.setState({currentMaxPage: res.total_pages}, ()=> console.log('max page', this.state.currentMaxPage));
          }
          if(!this.state.querySet[pageNum]) {
              console.log('different page searched')
              this.setState({querySet: {...this.state.querySet, ...temp}}, () => {
                  console.log(this.state.querySet)
              });
              this.setState({currentPage: pageNum});

          }
          this.setState({currentPageMovies: this.state.querySet[res.page]}, () => {
                  console.log(this.state.currentPageMovies)
              });
      });

  }

  updatePage(num) {
    if(num > 0 && num <= this.state.currentMaxPage){
        this.setState({currentPage: num}, ()=> console.log(this.state.currentPage));
        this.runSearchMovie(this.state.lastQuery,num);
    }
  }

  clickToBuy(movie,price){
      if(!this.state.initiated) {
          alert('You need to login first!');
          return;
      }
      console.log('before buying ', this.state.user.ownedMovies);
      if(this.state.user.ownedMovies.includes(movie.id)){
          console.log('Movie already bought');
          alert('Movie already bought');
          return;
      }

      else if(this.state.user.balance < price) {
          console.log('Not Enough Balance');
          alert('Not Enough Balance');
      }
      else {
          let newBalance = this.state.user.balance - price
          this.setState({user: {...this.state.user, balance: newBalance, ownedMovies: [...this.state.user.ownedMovies, movie.id] } }, () => console.log('after buying ', this.state.user.ownedMovies))
          console.log('Movie is successfully bought!');
          alert('Movie is successfully bought! You have Rp '+ String(newBalance)+ ',00 left.');
          let storedUser = this.checkLocalStorage();
          if(storedUser) {
             storedUser = {...storedUser, 'balance': newBalance, 'ownedMovies': [...storedUser.ownedMovies, movie.id]};
             this.storeToLocalStorage('user', storedUser);
          }
          else {
              this.storeToLocalStorage('user', {'balance': newBalance, 'ownedMovies': [movie.id]});
          }

      }


  }

  onLogIn() {
      if(this.checkLocalStorage() && this.state.initiated===false)
         this.initializeState();
  }

  onLogOut() {
      this.setState({user: this.initialUserState});
      this.setState({initiated: false})
  }


  render() {
    const movieSearch = _.debounce(term => this.runSearchMovie(term), 500);
    return (
      <div className="App">
          <NavSearchBar balance={this.state.user.balance} onSearchTermChange={movieSearch} initiated={this.state.initiated} onLogIn={()=> this.onLogIn()} onLogOut={()=> this.onLogOut()}/>

          <MovieList ownedMovies={this.state.user.ownedMovies} clickToBuy={(movie,price) => this.clickToBuy(movie,price)} currentPageMovies={this.state.currentPageMovies} />
          <Pagination maxPage={this.state.currentMaxPage} onClickUpdate={number=> this.updatePage(number)} currentPage={this.state.currentPage}/>

      </div>
    );
  }
}



export default App;
