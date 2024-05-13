import { useState, useEffect, SetStateAction } from "react";
import { Add,Edit,Delete } from "@mui/icons-material";
import { Box, Button, Typography, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../../utilities/helperFunctions";

interface Prontuario {
    id: number;
    id_paciente: number;
    historia_clinica: string;
    queixa_principal: string;
    habitos_vida: string;
    hma: string;
    hmp: string;
    antecedentes_pessoais: string;
    antecedentes_familiares: string;
    tratamentos_realizados: string;
    deambulando: boolean;
    internado: boolean;
    deambulando_apoio: boolean;
    orientado: boolean;
    cadeira_rodas: boolean;
    exames_complementares: string;
    usa_medicamentos: string;
    realizou_cirurgia: string;
    inspecao_palpacao: string;
    semiotica: string;
    testes_especificos: string;
    avaliacao_dor: string;
    objetivos_tratamento: string;
    recursos_terapeuticos: string;
    plano_tratamento: string;
    diagnostico_clinico: string;
    diagnostico_fisioterapeutico: string;
    nome_paciente: string;
    data_criacao: string;
    quantidade_evolucoes: string;
}


export default function Prontuarios() {
    const [prontuarios, setProntuarios] = useState<Prontuario[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Prontuario[]>([]);
    const [openModal, setOpenModal] = useState(0);
    const [evolucao,setEvolucao] = useState('')
    const [dataEvolucao,setDataEvolucao] = useState('')

    const getProntuarios = () =>{
        axios.get('http://localhost:8000/api/prontuarios').then(response => {
            console.log(response.data)
            setProntuarios(response.data);
            setSearchResults(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getProntuarios()
    }, []);

    useEffect(() => {
        const results = prontuarios.filter(prontuario =>
            prontuario.nome_paciente.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
        setSearchResults(results);
    }, [searchTerm, prontuarios]);

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenModal = (id:number) => {
        setOpenModal(id);
    };

    const handleCloseModal = () => {
        setOpenModal(0);
    };

    const createEvolucao = ()=>{
        axios.post('http://localhost:8000/api/evolucao',{FormData:{
            descricao_evolucao:evolucao,data_atendimento:dataEvolucao,id_prontuario:openModal}}).then(r=>{
                getProntuarios()
                setOpenModal(0)
            }).catch(err =>{

            })
    }

    return (
        <Box margin={5}>
            <Typography variant="h4" align="center">Prontuarios:</Typography>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <TextField
                    label="Pesquisar"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </Box>
            <NavLink to='/prontuarios/novo'>
                <Button variant='contained' color='info' endIcon={<Add />} >
                    Novo
                </Button>
            </NavLink>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Paciente</TableCell>
                            <TableCell>Criado em</TableCell>
                            <TableCell>N° Atendimentos</TableCell>
                            <TableCell>Queixa Principal</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((paciente) => (
                            <TableRow key={paciente.id}>
                                <TableCell>{paciente.nome_paciente}</TableCell>
                                <TableCell>{formatDate(paciente.data_criacao)}</TableCell>
                                <TableCell>{paciente.quantidade_evolucoes}</TableCell>
                                <TableCell>{paciente.queixa_principal}</TableCell>
                                <TableCell>
                                <IconButton color="success" aria-label="excluir" onClick={() => handleOpenModal(paciente.id)}>
                                        <Add />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="editar">
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" aria-label="excluir">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openModal === 0 ? false : true} onClose={handleCloseModal} fullWidth>
                <DialogTitle>Adicionar Evolução</DialogTitle>
                <DialogContent>
                    <Typography>Data Evolução:</Typography>
                <TextField id="data_nascimento" name="data_nascimento" type="date" required value={dataEvolucao}
                onChange={(e) => setDataEvolucao(e.target.value)}/>
                <Typography>Descrição:</Typography>
                    <TextField
                        label="Evolução"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={evolucao}
                        onChange={(e) => setEvolucao(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button  onClick={createEvolucao} color="primary">Adicionar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
