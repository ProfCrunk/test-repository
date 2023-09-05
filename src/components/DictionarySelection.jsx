import {Chip, Stack} from '@mui/material';
import {useEffect, useState} from 'react';

export default function DictionarySelection (props){
  const [selectedDictionary, setSelectedDictionary] =useState(undefined)
  const [dictionaries, setDictionaries] = useState([]);
  useEffect(() => {
    fetch('https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/dictionaries')
      .then((data) => data.json())
      .then((data) => {
        setDictionaries(data)
        props.setActiveDictionary(data[0])
        setSelectedDictionary(data[0])
      })
      .catch((e) => console.log(e));
  }, []);
  return <Stack direction='column' spacing={8}>
            {dictionaries &&
              dictionaries.map((d, index) => (
                <Chip 
                  label={d.title}
                  key={index}
                  onClick={() => {
                    setSelectedDictionary(d)
                    props.setActiveDictionary(d);
                  }}
                  color={
                    d._id === selectedDictionary._id? "primary": "secondary"
                  }
                />
              ))}
          </Stack>
}



