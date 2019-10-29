import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'glyphicons-only-bootstrap/css/bootstrap.min.css'

import logo from './logo.svg';
import PageNotFound from './PageNotFound';
import SpaceQuizApp from './quiz/SpaceQuiz'
import DemoLifeCycle from './basic/LifeCycle';
import HookExamples from './basic/ReactHooks';
import OtherConcepts from './basic/OtherConcepts';
import WineriesPage from './wineshop/Wineries';


/**
 * Install react-router-dom
 * 1. Use "exact" to match entire path
 * 2. Dont use "exact" for partial match
 */
const App = () => {
	return <section>
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
								<NavLink to="/wineries" className="nav-link" activeClassName="active">WineShop</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/otherConcepts" className="nav-link" activeClassName="active">Other</NavLink>
							</li>
						</ul>
						<form className="form-inline mt-2 mt-md-0">
							<input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
							<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
						</form>
					</div>
				</nav>
			</header>
			<main className="container">
				<Switch>
					<Route exact path="/" render={() => <div className="App">
						<header className="App-header">
							<img src={logo} className="App-logo" alt="logo" />
							<div>Welcome to React Headstart!</div>
						</header>
					</div>} />
					<Route path="/spacequiz" component={SpaceQuizApp} />
					<Route path="/lifecycle" component={DemoLifeCycle} />
					<Route path="/wineries" component={WineriesPage} />
					<Route path="/otherConcepts" component={OtherConcepts} />
					<Route path="/hooks" component={HookExamples} />
					<Route component={PageNotFound} />
				</Switch>
				<ToastContainer autoClose={3000} hideProgressBar />
			</main>
		</BrowserRouter>
	</section>
};

export default App;