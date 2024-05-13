import { ArrowBack } from "@mui/icons-material";
import { Grid, Typography, FormControl, InputLabel, TextField, Select, MenuItem, Button, Box, Paper, IconButton, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function PacientesCreate() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        setLoading(true);
       axios.post('http://localhost:8000/api/pacientes',{FormData:data}).then(response => {
        console.log(response.data);
        setLoading(false);
        navigate('/pacientes');
    }).catch(error => {
        console.log(error);
        setLoading(false);
    });
    };

    return (
        <Box margin={5}>
            <NavLink to='/pacientes'>
          <Button variant='text' color='info' startIcon={<ArrowBack/>} >
                Voltar
            </Button>
            </NavLink>
                    <Typography variant="h4" align="center" marginTop={0}>Formulário de Pacientes</Typography>

            <Paper elevation={3} sx={{ backgroundColor: '#f5f0f0', '& > *': { padding:2,marginTop:2,} }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>

                            <TextField id="nome" name="nome" label={'Nome:'} required />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <TextField id="cpf" name="cpf" label={"CPF:"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <TextField id="estado_civil" name="estado_civil" label={"Estado Civil:"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <TextField id="email" name="email" type="email" required label={"Email:"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <TextField id="telefone" name="telefone" required label={"Telefone:"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <TextField id="data_nascimento" name="data_nascimento" type="date" required label={"data de Nascimento:"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="sexo">Sexo:</InputLabel>
                            <Select id="sexo" name="sexo" defaultValue={'M'} required>
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Feminino</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <TextField id="profissao" name="profissao" label={"Profissão:"}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <TextField id="cidade" name="cidade" required label={"Cidade:"}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <TextField id="bairro" name="bairro" label={"Bairro:"}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <TextField id="naturalidade" name="naturalidade" label={"Naturalidade:"}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}  md={6}>
                        <FormControl fullWidth>
                            <TextField id="endereco_residencial" name="endereco_residencial" label={"Endereço Residencial:"}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <TextField id="endereco_comercial" name="endereco_comercial" label={"Endereço Comercial:"}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
                            </Button>
                    </Grid>
                </Grid>  </form> </Paper></Box>
    );
}