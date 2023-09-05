import DictionarySelection from './DictionarySelection'
import {useState} from 'react';
import{Chip, Grid, Stack, Button} from '@mui/material';
import TopDrawer from './TopDrawer';


const MultipleChoice = (props) => {
    const [wordList, setWordList] =useState ([]);
    const [definition, setDefinition] = useState([]);
    const[questionAnswer, setAnswer] = useState('');
const getMultiChoiceWords = () => {
    
    fetch(
        `https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multichoice?tag=${props.activeDictionary.tags[0]}`
    )
    .then((data) => data.json())
    .then((data) => {
        console.log(data)
        setAnswer('')
    setWordList(data)
    setDefinition(data[(Math.floor(Math.random()*4))])
});
};
    const checkDefinition = (word) =>{
        if(word.definition === definition.definition)
    {
        setAnswer('correct')
    }
    else {
        setAnswer('incorrect')
    }

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
        <Grid item>
        <Button onClick={getMultiChoiceWords} variant="contained">
              New Game!
            </Button>
            <Grid item>
                {definition.definition}
            </Grid>
        <Stack direction="column" spacing={1}>
            {wordList &&
            wordList.map((d, index) => (
                <Chip
                color ={d._id === wordList._id? "primary": "secondary"}
                label={d.word}
                key={index}
                onClick={() => {
                    checkDefinition(d);
                }}
                />
            ))}
            </Stack>
            <Grid item>
                {questionAnswer}
            </Grid>
               
        </Grid>
        </Grid>
    

    );
};

export default MultipleChoice;