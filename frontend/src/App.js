/* eslint-disable */
import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';

function App() {
    let [shoes, modShoes] = useState(Data);

    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">BONG MARKET</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Product List
                            </Nav.Link>
                            <Nav.Link as={Link} to="/detail">
                                Product Detail
                            </Nav.Link>
                            <NavDropdown
                                title="Dropdown"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/">
                    <Jumbotron />
                    <div className="container">
                        <div className="row">
                            {shoes.map((a, i) => {
                                return <Card shoes={shoes[i]} i={i} key={i} />;
                            })}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                axios
                                    .get(
                                        'https://codingapple1.github.io/shop/data2.json'
                                    )
                                    .then((result) => {
                                        {
                                            modShoes([
                                                ...shoes,
                                                ...result.data
                                            ]);
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }}
                        >
                            더보기
                        </button>
                    </div>
                </Route>

                <Route path="/detail/:id">
                    <Detail shoes={shoes} />
                </Route>

                <Route path="/:id">
                    <div>아무거나아무거나아무거나</div>
                </Route>
            </Switch>

            {/* <Route path="/aaa" component={'컴포넌트 이름'}></Route> */}
        </div>
    );
}

function Jumbotron() {
    return (
        <div className="JumboBox">
            <h1>20% Season Off</h1>
            <p>
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
            </p>
            <p>
                <button type="button" className="btn btn-primary">
                    Learn More
                </button>
            </p>
        </div>
    );
}

function Card(props) {
    console.log('in');
    console.log(props);
    return (
        <div className="col-md-4">
            <img
                src={
                    'https://codingapple1.github.io/shop/shoes' +
                    (props.i + 1) +
                    '.jpg'
                }
                width="100%"
            />
            <h4>{props.shoes.title}</h4>
            <p>
                {props.shoes.content} & {props.shoes.price}
            </p>
        </div>
    );
}

export default App;

// data.map((a, b) => {})
// a는 data 자체, b는 index
