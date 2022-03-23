import React, {FormEvent, useState} from "react";
import { Link } from "react-router-dom";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED"

export interface User {
    id: number;
    name: string;
    username: string;
   
}
export interface NewUser {
    name: string;
    username: string;
    email: string;
    password : string;
}

export async function createUser(newUser: NewUser) {
    const response = await fetch(`https://localhost:5001/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
    });
    
    if (!response.ok) {
        throw new Error(await response.json())
    }
}

export function SignUpForm(): JSX.Element {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<FromStatus>("READY");

    function submitForm(event: FormEvent) {
        event.preventDefault();
        setStatus("SUBMITTING");
        createUser({name, username, email, password})
            .then(() => setStatus("FINISHED"))
            .catch(() => setStatus("ERROR"));
    }

    if(status === "FINISHED") {
        return <div>
            <p>Form Submitted Succesfully!</p>
            <Link to="/">Return to your feed?</Link>
        </div>
    }

    return (
        <form className="signup-form" onSubmit={submitForm}>
           <label className="form-label">
                Name
                <input className="form-input" value={name} onChange={event => setName(event.target.value)}/>
            </label>
            <label className="form-label">
                Username
                <input className="form-input" value={username} onChange={event => setUsername(event.target.value)}/>
            </label>
            <label className="form-label">
                Email
                <input className="form-input" value={email} onChange={event => setEmail(event.target.value)}/>
            </label>
            <label className="form-label">
                Password
                <input className="form-input" value={password} onChange={event => setPassword(event.target.value)}/>
            </label>

            <button className="submit-button" disabled={status === "SUBMITTING"} type="submit">Sign Up</button>
            {status === "ERROR" && <p>Something went wrong! Please try again!</p>}
        </form>
    );
}

export function CreateUser(): JSX.Element {
    return (
        <div>
            <h1>Sign Up</h1>
            <SignUpForm/>
        </div>
    )
}