import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
          <List component="nav" className='nav'>
              <Link to="/" className="nav-link">
                <ListItem button>
                     <ListItemText primary="Sign in" />
                </ListItem>
              </Link>
              <Link to="/register" className="nav-link">
                 <ListItem button>
                     <ListItemText primary="Sign up" />
                 </ListItem>
              </Link>
          </List>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
        <List component="nav" className='nav'>
            <Link to="/" className="nav-link">
                <ListItem button>
                    <ListItemText primary="Sign in" />
                </ListItem>
            </Link>
            <Link to="/" className="nav-link">
            <Button variant="contained" color="primary"
                    onClick={props.logout}
            >
                Logout
            </Button>
            </Link>
        </List>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
        <div className='header'>
            <Link to="/" className='appname'>
                <h1 >{this.props.appName.toUpperCase()}</h1>
            </Link>
            <nav className="navbar navbar-light">
                <LoggedOutView currentUser={this.props.currentUser} />
                <LoggedInView currentUser={this.props.currentUser} />
            </nav>
        </div>
    );
  }
}

export default Header;
