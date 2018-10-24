import React,{Component} from 'react';

import priceDeterminer from "./operations";

class MovieList extends Component{

    clickToBuy(movie,price){
        this.props.clickToBuy(movie,price);
    }

    renderBuyButton(movie,ownedMovies) {

        if(ownedMovies.includes(movie.id)){
            console.log('you have a movie owned from this list');
            return <a type="button" id="owned" className="card-link btn btn-success disabled" onClick={event => this.clickToBuy(movie, priceDeterminer(movie.vote_average) )}>Owned</a>;
        }else{
            return <a type="button" className="card-link btn btn-success" onClick={event => this.clickToBuy(movie, priceDeterminer(movie.vote_average) )}>Buy</a>
        }

    }

    renderModal(movieTitle,bdPath, movieOverview) {
        return (
            <div className="modal" id={movieTitle}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <img src={bdPath}/>
                        </div>


                        <div className="modal-body">
                            {movieOverview}
                        </div>

                        <div className="modal-footer">

                        </div>

                    </div>
                </div>
            </div>
        )
    }
    renderCard() {
        let baseURL = 'https://image.tmdb.org/t/p/';
        let sizePoster= 'w300';
        if(!this.props.currentPageMovies)
            return <div className='container d-flex justify-content-center'><div className="lds-dual-ring" /></div>;
        return this.props.currentPageMovies.map((movie) => {
            return <div>
                {this.renderModal(movie.title.toLowerCase().replace(/[\W_]+/g," ").replace(/\s+/g, ''), baseURL+'w780'+movie.backdrop_path, movie.overview)}
                    <div key={movie.id} className="card border-success" style={{margin: '10px', height:'450px', borderRadius: '5px', width:'300px',backgroundImage: 'url('+baseURL+sizePoster+movie.poster_path+')'}}>
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <h6 className="card-subtitle mb-2">Rp. {priceDeterminer(movie.vote_average)},00</h6>
                        <p id='card-text' className="card-text" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{movie.overview.substring(0,200)}...</p>
                        <div className='container btn-holder d-flex justify-content-start' style={{position: 'absolute', bottom: '10px', left: '20px'}}>
                            {this.renderBuyButton(movie,this.props.ownedMovies)}
                            <a type="button" className="card-link btn btn-success" data-toggle="modal" data-target={'#'+(movie.title.toLowerCase().replace(/[\W_]+/g," ").replace(/\s+/g, ''))}>More Details..</a>

                        </div>
                    </div>
                </div>
            </div>


    });

    }

    render() {
        console.log(this.props.currentPageMovies);

        return (
            <div className= "container-fluid d-flex flex-row flex-wrap justify-content-center" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                {this.renderCard()}
            </div>
        );

    }

};

export default MovieList;