import { ArrowBack } from "@mui/icons-material";
import { Grid, Typography, FormControl, InputLabel, TextField, Select, MenuItem, Button, Box, Paper, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface Paciente {
    id: number
    nome: string
}

export default function ProntuariosCreate() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [selectedPaciente, setSelectedPaciente] = useState('');
    const [deambulando, setDeambulando] = useState(false);
    const [internado, setInternado] = useState(false);
    const [deambulandoApoio, setDeambulandoApoio] = useState(false);
    const [orientado, setOrientado] = useState(false);
    const [cadeiraRodas, setCadeiraRodas] = useState(false)

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        try {
            const response = await  axios.get('http://localhost:8000/api/pacientes')
            setPacientes(response.data);
        } catch (error) {
            console.error('Error fetching pacientes:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        data['id_paciente'] = selectedPaciente;
        data['deambulando'] = deambulando.toString() === 'false' ? '0' : '1' ;
        data['internado'] = internado.toString() === 'false' ? '0' : '1';
        data['deambulando_apoio'] = deambulandoApoio.toString() === 'false' ? '0' : '1';
        data['orientado'] = orientado.toString() === 'false' ? '0' : '1';
        data['cadeira_rodas'] = cadeiraRodas.toString() === 'false' ? '0' : '1';
        axios.post('http://localhost:8000/api/prontuarios',{FormData:data}).then(response => {
        console.log(response.data);
        setLoading(false);
        navigate('/pacientes');
    }).catch(error => {
        console.log(error);
        setLoading(false);
    });
    };

    const handleSelectChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedPaciente(event.target.value);
    };

    return (
        //create a form using material ui
        <Box margin={5}>
                        <NavLink to='/prontuarios'>
          <Button variant='text' color='info' startIcon={<ArrowBack/>} >
                Voltar
            </Button>
            </NavLink>
            <Typography variant="h4" align="center">Formulário de Cadastro de Prontuário</Typography>
            <Paper elevation={3} sx={{ backgroundColor: '#f5f0f0', '& > *': { padding: 2, marginTop: 2 } }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                        <FormControl fullWidth>
                                <InputLabel id="idPaciente-label">Paciente</InputLabel>
                                <Select
                                    labelId="idPaciente-label"
                                    id="idPaciente"
                                    value={selectedPaciente}
                                    onChange={handleSelectChange}
                                    required
                                >
                                    {pacientes.map((paciente) => (
                                        <MenuItem key={paciente.id} value={paciente.id}>{paciente.nome}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="historia_clinica" name="historia_clinica" label="História Clínica" multiline rows={2} required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="queixa_principal" name="queixa_principal" label="Queixa Principal" multiline rows={2} required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="habitos_vida" name="habitos_vida" label="Hábitos de Vida" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="hma" name="hma" label="HMA" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="hmp" name="hmp" label="HMP" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="antecedentes_pessoais" name="antecedentes_pessoais" label="Antecedentes Pessoais" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="antecedentes_familiares" name="antecedentes_familiares" label="Antecedentes Familiares" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="tratamentos_realizados" name="tratamentos_realizados" label="Tratamentos Realizados" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Apresentação do Paciente</Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox id="deambulando" name="deambulando" />
                                }
                                label="Deambulando"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox id="internado" name="internado" />
                                }
                                label="Internado"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox id="deambulando_apoio" name="deambulando_apoio" />
                                }
                                label="Deambulando com apoio/auxílio" />
                                <FormControlLabel
                                control={
                                    <Checkbox id="orientado" name="orientado" />
                                }
                                label="Orientado" />
                                 <FormControlLabel
                                control={
                                    <Checkbox id="cadeira_rodas" name="cadeira_rodas" />
                                }
                                label="Cadeira de rodas" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="exames_complementares" name="exames_complementares" label="Exames Complementares" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="usa_medicamentos" name="usa_medicamentos" label="Usa Medicamentos" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="realizou_cirurgia" name="realizou_cirurgia" label="Realizou Cirurgia" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="inspecao_palpacao" name="inspecao_palpacao" label="Inspeção/Palpação" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="semiotica" name="semiotica" label="Semiótica" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="testes_especificos" name="testes_especificos" label="Testes Específicos" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="avaliacao_dor" name="avaliacao_dor" label="Avaliação da Intensidade da Dor" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="objetivos_tratamento" name="objetivos_tratamento" label="Objetivos de Tratamento" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="recursos_terapeuticos" name="recursos_terapeuticos" label="Recursos Terapêuticos" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="plano_tratamento" name="plano_tratamento" label="Plano de Tratamento" multiline rows={2}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}