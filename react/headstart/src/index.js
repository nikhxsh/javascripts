import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import './styles/bootstrap.min.css'
import './index.css';

import logo from './logo.svg';
import SpaceQuizApp from './quiz/spaceQuiz'
import * as serviceWorker from './serviceWorker';
import DemoLifeCycle from './basic/lifeCycle';
import HookExamples from './basic/reactHooks';
import OtherConcepts from './basic/otherConcepts';


export const AppContext = React.createContext();

const AppConfiguration = {
	searchToken: "Initial Search Token"
};

/**
 * Install react-router-dom
 * 1. Use "exact" to match entire path
 * 2. Dont use "exact" for partial match
 */
ReactDOM.render(
	<section>
		<BrowserRouter>
			<header>
				<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
					<Link to="/" className="navbar-brand">React Headstart</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
						aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<NavLink to="/spacequiz" className="nav-link" activeClassName="active">Space Quiz</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/lifecycle" className="nav-link" activeClassName="active">Lifecycle</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/hooks" className="nav-link" activeClassName="active">Hooks</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/otherConcepts" className="nav-link" activeClassName="active">Other</NavLink>
							</li>
						</ul>
						<form className="form-inline mt-2 mt-md-0">
							<input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={(e) => AppConfiguration.searchToken = e.target.value} />
							<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
						</form>
					</div>
				</nav>
			</header>
			<main className="container">
				<Route exact path="/" render={() => <div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<div>Welcome to React Headstart!</div>
					</header>
				</div>} />
				<Route path="/spacequiz" component={SpaceQuizApp} />
				<Route path="/lifecycle" component={DemoLifeCycle} />
				<AppContext.Provider value={AppConfiguration}>
					<Route path="/hooks" component={HookExamples} />
				</AppContext.Provider>
				<Route path="/otherConcepts" component={OtherConcepts} />
			</main>
		</BrowserRouter>
	</section>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
