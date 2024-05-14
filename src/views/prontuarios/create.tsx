import { ArrowBack } from "@mui/icons-material";
import { Grid, Typography, FormControl, InputLabel, TextField, Select, MenuItem, Button, Box, Paper, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

interface Paciente {
    id: number
    nome: string
}

interface Prontuario {
    id: number
    id_paciente: number
    historia_clinica: string
    queixa_principal: string
    habitos_vida: any
    hma: any
    hmp: any
    antecedentes_pessoais: any
    antecedentes_familiares: any
    tratamentos_realizados: any
    deambulando: number
    internado: number
    deambulando_apoio: number
    orientado: number
    cadeira_rodas: number
    exames_complementares: any
    usa_medicamentos: any
    realizou_cirurgia: any
    inspecao_palpacao: any
    semiotica: any
    testes_especificos: any
    avaliacao_dor: any
    objetivos_tratamento: any
    recursos_terapeuticos: any
    plano_tratamento: any
    diagnostico_clinico: any
    diagnostico_fisioterapeutico: any
    data_criacao: string
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
    const { id } = useParams();
    const [prontuarioData, setProntuarioData] = useState<Prontuario | null>(null);

    useEffect(() => {
        fetchPacientes();
    }, []);

    useEffect(() => {
        if (id) {
            axios.get(`https://back-91wd3u7j4-vieiraluizs-projects.vercel.app/api/api/prontuarios/${id}`).then(response => {
                setProntuarioData(response.data.prontuario);
                setSelectedPaciente(response.data.prontuario.id_paciente.toString());
                setDeambulando(response.data.prontuario.deambulando === 1);
                setInternado(response.data.prontuario.internado === 1);
                setDeambulandoApoio(response.data.prontuario.deambulando_apoio === 1);
                setOrientado(response.data.prontuario.orientado === 1);
                setCadeiraRodas(response.data.prontuario.cadeira_rodas === 1);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id]);

    const fetchPacientes = async () => {
        try {
            const response = await  axios.get('https://back-91wd3u7j4-vieiraluizs-projects.vercel.app/api/api/pacientes')
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
        console.log(deambulandoApoio);
        if(id){ 
            axios.put(`https://back-91wd3u7j4-vieiraluizs-projects.vercel.app/api/api/prontuarios/${id}`, {FormData:data}).then(response => {
                navigate('/prontuarios');
            }).catch(error => {
                console.log(error);
                setLoading(false);
            });
            return;
        }
        axios.post('https://back-91wd3u7j4-vieiraluizs-projects.vercel.app/api/api/prontuarios',{FormData:data}).then(response => {
        navigate('/pacientes');
    }).catch(error => {
        console.log(error);
        setLoading(false);
    });
    };

    const handleSelectChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedPaciente(event.target.value);
    };

    if(id && prontuarioData === null) return (<Box display='flex' justifyContent='center' alignItems='center' height='100vh'><CircularProgress size={100} /></Box>)

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
                                <TextField id="historia_clinica" name="historia_clinica" label="História Clínica" multiline rows={2} required defaultValue={prontuarioData?.historia_clinica}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="queixa_principal" name="queixa_principal" label="Queixa Principal" multiline rows={2} required defaultValue={prontuarioData?.queixa_principal}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="habitos_vida" name="habitos_vida" label="Hábitos de Vida" multiline rows={2} defaultValue={prontuarioData?.habitos_vida}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="hma" name="hma" label="HMA" multiline rows={2} defaultValue={prontuarioData?.hma}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="hmp" name="hmp" label="HMP" multiline rows={2} defaultValue={prontuarioData?.hmp}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="antecedentes_pessoais" name="antecedentes_pessoais" label="Antecedentes Pessoais" multiline rows={2} defaultValue={prontuarioData?.antecedentes_pessoais}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="antecedentes_familiares" name="antecedentes_familiares" label="Antecedentes Familiares" multiline rows={2} defaultValue={prontuarioData?.antecedentes_familiares}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="tratamentos_realizados" name="tratamentos_realizados" label="Tratamentos Realizados" multiline rows={2} defaultValue={prontuarioData?.tratamentos_realizados}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Apresentação do Paciente</Typography>
                            <FormControlLabel checked={deambulando} onChange={(e) => setDeambulando((e.target as HTMLInputElement).checked)}
                                control={
                                    <Checkbox id="deambulando" name="deambulando" />
                                }
                                label="Deambulando"
                            />
                            <FormControlLabel checked={internado} onChange={(e) => setInternado((e.target as HTMLInputElement).checked)}
                                control={
                                    <Checkbox id="internado" name="internado" />
                                }
                                label="Internado"
                            />
                            <FormControlLabel checked={deambulandoApoio} onChange={(e) => setDeambulandoApoio((e.target as HTMLInputElement).checked)}
                                control={
                                    <Checkbox id="deambulando_apoio" name="deambulando_apoio" />
                                }
                                label="Deambulando com apoio/auxílio" />
                                <FormControlLabel checked={orientado} onChange={(e) => setOrientado((e.target as HTMLInputElement).checked)}
                                control={
                                    <Checkbox id="orientado" name="orientado" />
                                }
                                label="Orientado" />
                                 <FormControlLabel checked={cadeiraRodas} onChange={(e) => setCadeiraRodas((e.target as HTMLInputElement).checked)}
                                control={
                                    <Checkbox id="cadeira_rodas" name="cadeira_rodas" />
                                }
                                label="Cadeira de rodas" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="exames_complementares" name="exames_complementares" label="Exames Complementares" multiline rows={2} defaultValue={prontuarioData?.exames_complementares}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="usa_medicamentos" name="usa_medicamentos" label="Usa Medicamentos" multiline rows={2} defaultValue={prontuarioData?.usa_medicamentos}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="realizou_cirurgia" name="realizou_cirurgia" label="Realizou Cirurgia" multiline rows={2} defaultValue={prontuarioData?.realizou_cirurgia}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="inspecao_palpacao" name="inspecao_palpacao" label="Inspeção/Palpação" multiline rows={2} defaultValue={prontuarioData?.inspecao_palpacao}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="semiotica" name="semiotica" label="Semiótica" multiline rows={2} defaultValue={prontuarioData?.semiotica}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="testes_especificos" name="testes_especificos" label="Testes Específicos" multiline rows={2} defaultValue={prontuarioData?.testes_especificos}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="avaliacao_dor" name="avaliacao_dor" label="Avaliação da Intensidade da Dor" multiline rows={2} defaultValue={prontuarioData?.avaliacao_dor}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="objetivos_tratamento" name="objetivos_tratamento" label="Objetivos de Tratamento" multiline rows={2} defaultValue={prontuarioData?.objetivos_tratamento}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="recursos_terapeuticos" name="recursos_terapeuticos" label="Recursos Terapêuticos" multiline rows={2} defaultValue={prontuarioData?.recursos_terapeuticos}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <TextField id="plano_tratamento" name="plano_tratamento" label="Plano de Tratamento" multiline rows={2} defaultValue={prontuarioData?.plano_tratamento}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : id ?  'Editar' : 'Cadastrar'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}