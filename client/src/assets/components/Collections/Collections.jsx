import "./Collections.css";

export const Collections = () => {
    const newArrivals = [
        {
            id: 1,
            name: "Lace Bralette",
            description: "Elegant lace design with comfortable fit",
            price: "$49.99",
            image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop",
            route: "/product/lace-bralette",
            isNew: true
        },
        {
            id: 2,
            name: "Silk Robe",
            description: "Luxurious silk robe for special moments",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1585487000128-7c0044e295dc?q=80&w=1000&auto=format&fit=crop",
            route: "/product/silk-robe",
            isNew: true
        },
        {
            id: 3,
            name: "Cotton Briefs Set",
            description: "Comfortable everyday essentials",
            price: "$29.99",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop",
            route: "/product/cotton-briefs",
            isNew: true
        }
    ];

    return (
        <section className="collections-section">
            <div className="collections-header">
                <h2>New Arrivals</h2>
                <p>Discover our latest additions to the collection</p>
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