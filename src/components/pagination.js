import React,{Component} from 'react'

class Pagination extends Component {

    onClick(number) {
        this.props.onClickUpdate(number);
    }
    
    renderButtons() {

        let ceilVal = Math.ceil(this.props.currentPage/10);
        let N = 10;
        let mod = this.props.maxPage % 10;
        if(this.props.maxPage-this.props.currentPage < mod)
            N = mod;
        let arrayNum = Array.apply(null, {length: N}).map(Number.call, Number);
        return arrayNum.map((number) => {
            return <li key={number} className="page-item"><a className="page-link" onClick={ event => this.onClick(event.target.innerHTML)}>{number + 1 +(ceilVal-1)*10}</a></li>;
        });
    }

    render() {
        let ceilVal = Math.ceil(this.props.currentPage/10);
        let N = 10;
        let mod = this.props.maxPage % 10;
        if(this.props.maxPage-this.props.currentPage < mod)
            N = mod;
        let arrayNum = Array.apply(null, {length: N}).map(Number.call, Number);
        arrayNum = arrayNum.map( number =>
        number+1+(ceilVal-1)*10
        );

        return (
            <div className='container d-flex justify-content-center'>
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-lg bg-success" style={{marginTop: '1rem'}}>
                    <li className="page-item">
                        <a className="page-link" aria-label="Previous" onClick={ event => this.onClick(arrayNum[0]-1)}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {this.renderButtons()}
                    <li className="page-item">
                        <a className="page-link" aria-label="Next" onClick={ event => this.onClick(arrayNum[arrayNum.length - 1]+1)}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
            </div>
        )
    }

}

export default Pagination;