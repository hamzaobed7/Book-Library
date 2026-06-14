import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "../Css/Navbar.css";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import SearchIcon from '@mui/icons-material/Search';
function CollapsibleExample() {
  return (
    <Navbar  collapseOnSelect expand="lg" className="bg-body-tertiary nav">
      <Container>
        <Box sx={{ position: "relative", right: "50px" }}>
          <Link as={Link}
          to="/HomePage"
           onClick={() => {
                const element = document.getElementById("home-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
          
          style={{ fontSize: "50px", textDecoration: "none", fontWeight: "700", color: "white", marginRight: "20px" }}>
            M<span style={{ color: "red" }}>.</span>H<span style={{ color: "red" }}>.</span>O<span style={{ color: "red" }}>.</span>
          </Link>
        </Box>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ color: "white" }} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ position: "relative", left: "50px" }}>
            <Nav.Link as={NavLink} to="/GetBooks" className="a">
              All Books
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                const element = document.getElementById("trending-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="a"
              style={{ cursor: "pointer" }}
            >
              Trending
            </Nav.Link>
            <Nav.Link 

             onClick={() => {
                const element = document.getElementById("wish-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="a"
              style={{ cursor: "pointer" }}
            >
            
              Wishlist
            </Nav.Link>

            <Nav.Link  onClick={() => {
                const element = document.getElementById("About-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="a"
              style={{ cursor: "pointer" }}
            >
              About
            </Nav.Link>

            <Nav.Link as={NavLink} to="/ContactUs" className="a">
              Contact us
            </Nav.Link>
          </Nav>

          <Nav style={{ position: "relative", left: "200px" }}>
            <Nav.Link as={Link} to="/login" className="Log" style={{ color: "white", textAlign: "center" }}>
              <AccountCircleIcon />
              <br />
              Login
            </Nav.Link>
            <Nav.Link eventKey={2} as={Link} to="/signup" className="Log" style={{ color: "white", extAlign: "center" }}>
              <FollowTheSignsIcon />
              <br />
              Sign up
            </Nav.Link>

             <Nav.Link eventKey={2} as={Link} to="/searchG" className="Log" style={{ color: "white", extAlign: "center" }}>
              <SearchIcon />
              <br />
              Search
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
