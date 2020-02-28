import React, { Component } from 'react';

class ErrorBoundry extends Component {
    constructor( props ){
        super( props )
        this.state = {
            hasEror: false
        }
    }

    componentDidCatch(){
        this.setState ({ hasEror: true })
    }

    render(){
        if(this.state.hasEror) {
            return <h1>Ooops, this not good</h1>
        }
        return this.props.children
    }

}

export default ErrorBoundry;