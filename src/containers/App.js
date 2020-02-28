import React, { Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return{
        searchField: state.searchRobots.searchField,
        isPending: state.requestRobots.isPending,
        robots: state.requestRobots.robots,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSearchField: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}


class App extends Component {
    componentDidMount() {
        this.props.onRequestRobots()
    }

    render() {
        const { searchField, onSearchField, robots, isPending } = this.props
        const filteredRobots = robots.filter( robot => {
            return robot.name.toLowerCase().includes( searchField.toLowerCase() )
        })
        return isPending ? 
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <SearchBox searchRobot={onSearchField}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
    }        
}

export default connect(mapStateToProps, mapDispatchToProps)(App);