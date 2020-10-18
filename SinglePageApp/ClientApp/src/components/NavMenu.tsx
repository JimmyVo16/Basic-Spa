import React from 'react';
import { Container, Navbar, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navItems: {
    fontSize: '20px',
  },
});

export function NavMenu(): JSX.Element {

  const style = useStyles({});

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className={style.navItems} to="/product/items">All-Tab</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link}  className={style.navItems} to="/product/items/max-price">Max-Price-Tab</NavLink>
              </NavItem>
            </ul>
        </Container>
      </Navbar>
    </header>
  );
}
