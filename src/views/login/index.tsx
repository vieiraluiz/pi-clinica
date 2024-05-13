import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Aqui você pode adicionar a lógica de autenticação
        // Por exemplo, verificar as credenciais no backend
        // e redirecionar para a próxima página se a autenticação for bem-sucedida
        if (username === 'UsuarioCli' && password === 'admin') {
            navigate('/home')
        } else {
            alert('Credenciais inválidas');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Box
                width={300}
                padding={3}
                boxShadow={3}
                borderRadius={5}
                bgcolor="background.paper"
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Login Clínica
                </Typography>
                <TextField
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Senha"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
}
