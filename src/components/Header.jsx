import React, { Component } from 'react';
import {newsCategory} from '../news'

class Header extends Component {
    
    state = {
        searchTerm: '',
    };
    
    handleChange = (e) => {
        this.setState({searchTerm: e.target.value });
    }
    
    handleKeyPress = (e) => {
        
    }
    
    render() {
        const {category} = this.props;
        // console.log(this.props)
        return (
            <div className='my-4'>
                <h1 className='mb-4' style={{fontWeight:'300'}}>
                    Block Blustar Headlines
                </h1>
                <input 
                    type='search'
                    className='form-control'
                    placeholder='Type Anything & Press Enter To Search'
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <div className='my-4'>
                    {newsCategory && Object.keys(newsCategory).map((item) => {
                        if(category == newsCategory[item]){
                            return (
                                <button 
                                    className='btn btn-warning btn-sm mr-2 mb-2'
                                    onClick={() => this.props.changeCategory(newsCategory[item])}
                                    >
                                    {`#${newsCategory[item]}`}
                                </button>
                            )
                        }
                        return(
                            <button 
                                className='btn btn-light btn-sm mr-2 mb-2' 
                                onClick={() => this.props.changeCategory(newsCategory[item])}
                            >
                                    {`#${newsCategory[item]}`}
                                </button>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Header;