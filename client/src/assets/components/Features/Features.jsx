import "./Features.css";
import { FaTruck, FaLock, FaUndo, FaHeadset, FaGift } from 'react-icons/fa';

export const Features = ({ features = [] }) => {
    const defaultFeatures = [
        {
            icon: <FaTruck />,
            title: "Free Shipping",
            description: "Free shipping on orders over $50",
            highlight: "Worldwide"
        },
        {
            icon: <FaLock />,
            title: "Secure Payment",
            description: "100% secure payment processing",
            highlight: "Protected"
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            description: "Dedicated customer support",
            highlight: "Anytime"
        },
        {
            icon: <FaGift />,
            title: "Special Offers",
            description: "Exclusive deals and discounts",
            highlight: "Save Now"
        }
    ];

    const featuresToDisplay = features.length > 0 ? features : defaultFeatures;

    return (
        <section className="features-section">
            <div className="features-container">
                {featuresToDisplay.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon-wrapper">
                            <span className="feature-icon">{feature.icon}</span>
                        </div>
                        <div className="feature-content">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <span className="feature-highlight">{feature.highlight}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}; 