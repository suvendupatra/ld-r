'use strict';
import React from 'react';
import {NavLink} from 'fluxible-router';

class Nav extends React.Component {
    showHelpModal() {
        /*global $*/
        $('.ui.modal').modal('show');
    }
    render() {
        return (
            <nav ref="defaultNavbar" className="ui blue menu inverted navbar page grid">
                    <NavLink routeName="home" className="brand item" activeClass="active"><img className="ui mini image" src="/assets/img/ld-reactor.gif" alt="ld-reactor" /></NavLink>
                    <NavLink routeName="about" className="item" activeClass="active">About LD-Reactor</NavLink>
                    <NavLink routeName="dataset" className="item" activeClass="active" href="/dataset">Default Dataset</NavLink>
                    <div className="ui right item link" onClick={this.showHelpModal}>
                            <i className="small help circle icon"></i>
                    </div>
            </nav>
        );
    }
}

export default Nav;
