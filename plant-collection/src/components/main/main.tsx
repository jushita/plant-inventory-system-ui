import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './main.css'
import useStyles, { Card } from './main-styles';
import { Link } from 'react-router-dom';
import { getPlants } from '../../services/plant';
import { Plant } from '../../models/Plant';
import Footer from './footer';
import Search from '../common/search';

export default function Main() {
  const classes = useStyles();
  const [plants, setPlants] = React.useState<Plant[] | undefined>(undefined);
  const [searchResults, setSearchResults] = React.useState<Plant[] | undefined>([]);
  //   const [state, setState] = React.useState<{ plants: Plant[] | undefined, searchResults: Plant[] }>({
  //   plants: [],
  //   searchResults: []
  // });

  function getAllPlantsAndSet() {
    getPlants().then(data => {
      setPlants(data);
      setSearchResults(data);
      // setState({
      //   plants: data,
      //   searchResults: data
      // });
    });
  }

  if (plants === undefined || searchResults === undefined) {
    getAllPlantsAndSet();
    return (<div>Loading...</div>);
  }

  function onSearch(plants: Plant[]) {
    setSearchResults(plants);
  }

  // const url = process.env.NODE_ENV === 'production' ? 'https://plants-jushita.s3-us-west-2.amazonaws.com' : '';
  // const asset_url = url;
  const asset_url = 'https://d1bot71ci7wa6y.cloudfront.net/';

  return (
    <AppBar position="relative" className="main-container">
      <div className="search-nav">
        <Search plants={plants}
          search={onSearch}
          onResults={onSearch}
        />
      </div>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {searchResults.map(plant => (
            <Grid item key={plant.PlantId} xs={12} sm={10} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  className={classes.cardMedia}
                  image={`${asset_url}${plant.PlantResource}`}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" className="card-title">
                    {plant.PlantName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" >
                    <Link to={`/product/${plant.PlantId}`} className="details-button">Details</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer></Footer>

    </AppBar>

  )
}
