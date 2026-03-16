import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

interface LoginInfos {
	email: string;
	password: string;
}

interface User {
	id: number;
	email: string;
	role: string;
}

// décrit ce qu'il va se passer pour l'utilisateur

interface AuthContextType {
	user: User | null; // l'utilisateur connecté, ou null si déconnecté
	login: (infos: LoginInfos) => Promise<void>; // fonction pour se connecter
	logout: () => void; // fonction pour se déconnecter
}

export default function AuthProvider({ children }) {
	const [isLogin, setIsLogin] = useState(false);

    const handleLogin = async (infos) => {
        const newData = {login, password}

        const response = await fetch("http://localhost:3310/api/auth/signin", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData)
        })

        const data = await response.json()
        if(response.ok){
            setIsLogin(true)
        }
    }

    const handleSignup = async (infos) => {

    }

    const handleLogout = () => setIsLogin(false)

	return (
        <AuthContext value={{isLogin, handleLogin, handleLogout, handleSignup}}>
            {children}
        </AuthContext>
    );
}
