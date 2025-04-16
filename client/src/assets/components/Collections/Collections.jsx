import "./Collections.css";

export const Collections = () => {
    const newArrivals = [
        {
            id: 1,
            name: "Vagina realista",
            description: "Vagina realista, suave, con textura y diferentes niveles de vibración",
            price: "$2,500",
            image: "/images/nuevo/nuevo1.jpg",
            route: "/product/lace-bralette",
            isNew: true
        },
        {
            id: 2,
            name: "PLUG METÁLICO",
            description: "Plug metálico, duradero",
            price: "$500",
            image: "/images/nuevo/nuevo5.jpg",
            route: "/product/silk-robe",
            isNew: true
        },
        {
            id: 3,
            name: "RealisticDick",
            description: "Textura premium, para los golosos",
            price: "$1,500",
            image: "/images/nuevo/nuevo3.jpg",
            route: "/product/cotton-briefs",
            isNew: true
        }
    ];

    return (
        <section className="collections-section">
            <div className="collections-header">
                <h2>Tendencias</h2>
                <p>Nuevos productos de la temporada</p>
            </div>
            
            <div className="collections-grid">
                {newArrivals.map((item) => (
                    <div key={item.id} className="collection-card">
                        <div className="collection-image">
                            <img src={item.image} alt={item.name} />
                            {item.isNew && <span className="new-badge">New</span>}
                            <div className="collection-overlay">
                                <div className="collection-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <span className="collection-price">{item.price}</span>
                                </div>
                                <button className="collection-button">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}; 