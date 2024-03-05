import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export function Home(){

    const rows = ["Apartments"];

    return(
        <>
        <div>

        
            
                <ActionAreaCard name="Apartments" url="/apartments"/>
                <br></br>
                <ActionAreaCard name="Guards" url="/guards"/>
                <br></br>
                <ActionAreaCard name="Supervisors" url="/supervisors/"/>
            
            </div>
        </>
    )
}

function ActionAreaCard(props) {
  return (
    <a href={props.url}>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrxbjmj0V5LDK_2HUnKVx5HzW4mPlG1-YmmHmYKuOvTA&s"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" href={props.url}>
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </a>
  );
}