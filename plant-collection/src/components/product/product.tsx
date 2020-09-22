import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import { Plant } from '../../models/Plant';
import { getPlantById } from '../../services/plant';
import { Link } from 'react-router-dom';
import useStyles from './product-styles';

export default function Product() {
    const classes = useStyles();
    const { id } = useParams();
    const [plant, setPlant] = React.useState<Plant | undefined>(undefined);
    if (plant === undefined) {
        getPlantById(id).then(data => {
            setPlant(data);
        });

        return <div>Loading...</div>
    }
    const url = process.env.NODE_ENV === 'production' ? 'https://plants-jushita.s3-us-west-2.amazonaws.com' : '';
    const asset_url = url + '/' + plant.plantResource + '.jpeg'
    return (
        <AppBar position="relative" className="main-container">
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={1} className="grid-container">
                    <Grid item key={plant.id} xs={1} sm={1} md={12}>
                        <Card>
                            <CardMedia
                                className={classes.cardMedia}
                                image={`${asset_url}`}
                                title="Image title"
                            />
                        </Card>
                        <Card className={classes.productBody}>
                            <Typography>Hii</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}