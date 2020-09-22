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

export default function Main() {
  const classes = useStyles();
  const [plants, setPlants] = React.useState<Plant[] | undefined>(undefined);
  if (plants === undefined) {
    getPlants().then(data => {
      setPlants(data);
    });
    return (<div>Loading...</div>);
  }

  const url = process.env.NODE_ENV === 'production' ? 'https://plants-jushita.s3-us-west-2.amazonaws.com' : '';
  const asset_url = url;
  return (
    <AppBar position="relative" className="main-container">
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {plants.map(plant => (
            <Grid item key={plant.id} xs={12} sm={10} md={4}>
              <Card>
                <CardMedia
                  className={classes.cardMedia}
                  image={`${asset_url}/${plant.plantResource}.jpeg`}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" className="card-title">
                    {plant.plantName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" >
                    <Link to={`/product/${plant.id}`} className="details-button">Details</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </AppBar>
  )
}
