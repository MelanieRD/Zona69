import { useState } from "react";
import "./Newsletter.css";

export const Newsletter = ({ 
    title = "Subscribe to Our Newsletter",
    description = "Get the latest updates on new products and upcoming sales",
    buttonText = "Subscribe",
    placeholder = "Enter your email",
    onSubmit = (email) => console.log("Subscribed:", email)
}) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email);
        setEmail("");
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-container">
                <h2>{title}</h2>
                <p>{description}</p>
                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder={placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <button type="submit">{buttonText}</button>
                </form>
            </div>
        </section>
    );
}; 