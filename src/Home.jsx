import {
    Button,
    Chip,
    Grid,
    Stack,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import TopDrawer from './components/TopDrawer';
  import { useEffect, useState } from 'react';
  import DictionarySelection from './components/DictionarySelection';
  
  
  
  
  const Home = (props) => {
    
    const [activeDictionary, setActiveDictionary] = useState(undefined);
    const [wordAndDefinition, setWordAndDefinition] = useState(undefined);
  
   
  
    const getRandomWord = () => {
      fetch(
        `https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/random-word?tag=${props.activeDictionary.tags[0]}`
      )
        .then((data) => data.json())
        .then((data) => setWordAndDefinition(data))
        // .catch((e) => console.log(e));
    };
  
    return (
      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        display="flex"
      >
        <Grid item xs={12}>
          <TopDrawer />
        </Grid>
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Button onClick={getRandomWord} variant="contained">
              Get Random Word
            </Button>
  
            {wordAndDefinition && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{wordAndDefinition.word}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{wordAndDefinition.definition}</Typography>
                </AccordionDetails>
              </Accordion>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default Home;