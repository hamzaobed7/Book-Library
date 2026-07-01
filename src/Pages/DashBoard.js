import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SelectActionCard from "../Componants/Boards";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InventoryIcon from "@mui/icons-material/Inventory";
import { DataContext } from "../Context/ApiContext";
import { useContext, useEffect } from "react";
import TableStock from "../Componants/TableStock";
import TableBooks from "../Componants/TableUpdateBooks";
import PersonIcon from "@mui/icons-material/Person";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Charts from "../Componants/Charts";
import { BookContext } from "../Context/BookContext";
const data = [
  { month: "January", books: 10 },
  { month: "February", books: 15 },
  { month: "March", books: 20 },
];
export default function Dashboard({ Bookc, AuthorC, user }) {
  const {  hasNoBook, users, StockCount } = useContext(DataContext);
  const {bookCount, AuthorCount, CategoryCount,fetchAuthors,fetchCategories,fetchBooks}=useContext(BookContext)
  useEffect(()=>{
    fetchBooks();
    fetchCategories();
    fetchAuthors()
  },[fetchBooks,fetchCategories,fetchAuthors])
  return (
    <>
      <section className="data-of-project" style={{ padding: "20px", textAlign: "center" }}>
        <Box sx={{ flexGrow: 1, marginBottom: "40px" }}>
          <Typography variant="h4" sx={{ fontWeight: "800", color: "#667eea", marginBottom: "30px" }}>
            Admin Dashboard
          </Typography>

          <Grid container spacing={6} sx={{ marginLeft: "10%" }}>
            <Grid xs={12} sm={6} md={3}>
              <SelectActionCard name={"Total Books"} count={bookCount} icon={<MenuBookIcon sx={{ fontSize: 40 }} />} />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <SelectActionCard name={"Authors"} count={AuthorCount} icon={<GroupsIcon sx={{ fontSize: 40 }} />} />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <SelectActionCard name={"Categories"} count={CategoryCount} icon={<TrendingUpIcon sx={{ fontSize: 40 }} />} />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <SelectActionCard name={"Stock Balance"} count={StockCount} icon={<InventoryIcon sx={{ fontSize: 40 }} />} />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <SelectActionCard name={"Author Has No Books"} count={hasNoBook} icon={<GroupsIcon sx={{ fontSize: 40 }} />} />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <SelectActionCard name={"Number of users"} count={users} icon={<PersonIcon sx={{ fontSize: 40 }} />} />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <SelectActionCard name={"Number of rental Book"} count={6} icon={<ArrowOutwardIcon sx={{ fontSize: 40 }} />} />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <SelectActionCard name={"Customer rental"} count={10} icon={<ArrowOutwardIcon sx={{ fontSize: 40 }} />} />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4, marginLeft: "15%" }}>
          <Grid xs={12}>
            <TableStock />
          </Grid>
        </Grid>
        <Grid container spacing={10} sx={{ marginLeft: "15%" }}>
          <Grid xs={12} md={7}>
            <TableBooks />
          </Grid>
          <Grid xs={12} md={5}>
            <Charts data={data} />
          </Grid>
        </Grid>
      </section>
    </>
  );
}
