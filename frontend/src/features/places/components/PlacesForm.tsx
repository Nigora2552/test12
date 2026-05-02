import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Paper,
    Box, Checkbox, FormControlLabel,
} from '@mui/material';
import {create} from "../placesThunk.ts";
import type {PlacesMutation} from "../../../types";
import {useState} from "react";
import {useAppDispatch} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";

const PlacesForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [form, setForm]= useState<PlacesMutation>({
        user: '',
        name: '',
        description: '',
        image:  null,
    });
    const [agreement, setAgreement] = useState(false);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm(prevState => {
            return {...prevState, [name]: value,}
        })
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files && files[0]) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await dispatch(create(form));
        navigate('/');
    }
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{p: 4, mt: 4, borderRadius: 2}}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{mb: 3}}>
                    Add New Places
                </Typography>

                <Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                required
                                name="name"
                                label="Name"
                                variant="outlined"
                                value={form.name}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                required
                                multiline
                                minRows={4}
                                name="description"
                                label="description"
                                value={form.description}
                                onChange={inputChangeHandler}
                                variant="outlined" // Гарантирует наличие рамки
                            />
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{border: '1px dashed #ccc', p: 2, borderRadius: 1, textAlign: 'center'}}>
                                <FileInput
                                    label="Upload Image"
                                    name="image"
                                    onChange={fileInputChangeHandler}
                                />
                            </Box>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
                            <Typography variant="body2" sx={{ mr: 2, flex: 1 }}>
                                By submitting this form, you agree that the following information
                                will be submitted to the public domain, and administrators of this
                                site will have full control over the said information.
                            </Typography>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    required
                                    onChange={(e) => setAgreement(e.target.checked)}
                                    name="agreement"
                                />
                            }
                                label="I understand"
                                sx={{ alignItems: 'flex-start', mt: -1 }}
                            />
                        </Box>
                        <Grid size={12}>
                            <Button
                                disabled={!agreement}
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    backgroundColor: '#1976d2',
                                    '&:hover': {backgroundColor: '#115293'}
                                }}
                            >
                                Submit new place
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default PlacesForm;