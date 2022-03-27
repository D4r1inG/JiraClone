import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuJira() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../../assets/img/download.jfif")} alt='1' />
                </div>
                <div className="account-info">
                    <h4>Jira clone</h4>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="mr-2 fa fa-credit-card" />
                    <NavLink to={'/jiraApp'} style={{color: 'black', fontSize: '16px'}} activeClassName='active text-success '>Jira Board</NavLink>
                </div>
                <div>
                    <i className="mr-2 fa fa-cog" />
                    <NavLink to={'/createProject'} style={{color: 'black', fontSize: '16px'}} activeClassName='active text-success '>Create Project</NavLink>
                </div>
                <div>
                    <i className="mr-2 fa fa-cog" />
                    <NavLink to={'/projectManagement'} style={{color: 'black', fontSize: '16px'}} activeClassName='active text-success '>Project Management</NavLink>
                </div>
                <div>
                    <i className="mr-2 fa fa-cog" />
                    <NavLink to={'/userManagement'} style={{color: 'black', fontSize: '16px'}} activeClassName='active text-success '>Users Management</NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="mr-2 fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="mr-2 fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="mr-2 fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="mr-2 fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="mr-2 fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>

    )
}
