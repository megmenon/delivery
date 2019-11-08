import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Restaurant from './Restaurant';

class Main extends Component{

    state = {
        input: '',
        redirect: false,
        isComplete: false,
        restaurants: []
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { input } = this.state
        const addressArr =  input.split(' ')
        // console.log(addressArr)
        const addressString = addressArr.map((address, i) => {
            return address + '+'
        }).join('')
        const makeApiCall = async () => {
            const url = `https://eatstreet.com/publicapi/v1/restaurant/search?method=both&street-address=${addressString}`
            await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Access-Token': '580d73fe5b54013d' 
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        restaurants: data.restaurants,
                        redirect: true,
                        isComplete: true,
                        input: ''
                    })
                })
        }
        makeApiCall()
    }

    handleChange = (e) => {
        let input = e.target.value;
        this.setState({
            input
        })
    }

    handleRedirect = () => {
        const { redirect } = this.state;
        return redirect ? <Redirect to="/restaurant" /> : null;
    }

    render(){
        const { isComplete, restaurants } = this.state;
        return(
            <div>
                Welcome, <br/>
                Enter address in here: <input name="input" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
                {isComplete ? <Restaurant restaurants={restaurants}/> : null}
                {this.handleRedirect()}
            </div>
        )
    }
}

export default Main