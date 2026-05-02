import React, {useRef, useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";

interface Props{
    name: string;
    label: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput:React.FC<Props> = ({name, label, onChange}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [filename, setFilename] = useState('');

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       if(e.target.files && e.target.files[0]){
           setFilename(e.target.files[0].name)
       } else {
           setFilename('');
       }
        onChange(e)
    }

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    return (
        <>
            <input
                style={{display: 'none'}}
                type='file'
                name={name}
                ref={inputRef}
                onChange={onFileChange}
            />

            <Grid  spacing={2} direction='row' sx={{alignItems:'center'}}>
                <Grid>
                    <TextField
                        disabled
                        value={filename}
                        label={label}
                    />
                </Grid>
                <Grid>
                    <Button
                        sx={{mt:3}}
                        onClick={activateInput}
                        type='button'
                        variant="contained"
                    >
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;