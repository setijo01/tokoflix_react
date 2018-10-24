import React, {Component} from 'react'


class NavSearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {searchTerm: ''};
    }
    renderLoginButton(){
        if(this.props.initiated)
            return <li className="nav-item"><a className="nav-link" href="#" onClick={event => this.props.onLogOut()}>Logout</a></li>;
        return <li className="nav-item"><a className="nav-link" href="#" onClick={event => this.props.onLogIn()}>Login</a></li>;
    }

    renderBalance() {
        if(this.props.initiated)
            return <span style={{color: 'white', marginRight: '10px'}}>Your Balance is Rp {this.props.balance},00</span>;
    }

    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <a className='navbar-brand' href='#'> Tokoflix </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler"
                        aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {this.renderLoginButton()}
                    </ul>
                    {this.renderBalance()}
                    <form className="form-inline my-2 my-lg-0">
                        <input
                            value={this.state.searchTerm}
                            id='movieSearchInput' className="form-control mr-sm-2" type="search" onChange={event => this.onInputChange(event.target.value)} placeholder="Search movie by name..."/>
                    </form>
                </div>
            </nav>
        );

    }
    onInputChange(term){
        this.setState({searchTerm: term});
        this.props.onSearchTermChange(term);
    }



}

export default NavSearchBar;