import { useEffect, useState } from "react";
import Search from "./Search.jsx";
import Feature from "./Feature.jsx";

export default function Sidebar({ map, location, setLocation }) {
    const [content, setContent] = useState([]);
    const [pointTilequery, setPointTilequery] = useState([]);
    const [polygonTilequery, setPolygonTilequery] = useState([]);
    const tilequery = [...(pointTilequery?.features || []), ...(polygonTilequery?.features || [])];

    useEffect(() => {
        async function fetchData() {
            const url = "/wp-admin/admin-ajax.php?action=map_content";
            const response = await fetch(url);
            const features = await response.json();

            setContent(features.data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const pointTilesets = ["casualastronaut.33c7ov6i"];

        async function fetchData() {
            const radius = 20;
            const limit = 10;
            const token = "pk.eyJ1IjoiY2FzdWFsYXN0cm9uYXV0IiwiYSI6ImNsbXppeTRiNTEwZmQybGxjbjJwcWQ1NGkifQ.RBFaqoShtUQLEO39XM3-iw";
            const url = `https://api.mapbox.com/v4/${pointTilesets.join(",")}/tilequery/${location.lng},${
                location.lat
            }.json?radius=${radius}&limit=${limit}&access_token=${token}`;

            const response = await fetch(url);
            const tilequery = await response.json();

            setPointTilequery(tilequery);
        }

        if (location) {
            fetchData();
        }
    }, [location]);

    useEffect(() => {
        const polygonTilesets = [
            "casualastronaut.29oqdz6l",
            "casualastronaut.2l5ucqqa",
            "casualastronaut.b0e5cyqu",
            "casualastronaut.6qmlnfju",
        ];

        async function fetchData() {
            const radius = 0;
            const limit = 10;
            const token = "pk.eyJ1IjoiY2FzdWFsYXN0cm9uYXV0IiwiYSI6ImNsbXppeTRiNTEwZmQybGxjbjJwcWQ1NGkifQ.RBFaqoShtUQLEO39XM3-iw";
            const url = `https://api.mapbox.com/v4/${polygonTilesets.join(",")}/tilequery/${location.lng},${
                location.lat
            }.json?radius=${radius}&limit=${limit}&access_token=${token}`;

            const response = await fetch(url);
            const tilequery = await response.json();

            setPolygonTilequery(tilequery);
        }

        if (location) {
            fetchData();
        }
    }, [location]);

    return (
        <div className="sidebar">
            <Search map={map} setLocation={setLocation} />
            {!tilequery?.length && (
                <p>Click on the map or use the search bar above to identify historic districts and landmarks.</p>
            )}
            {!!tilequery?.length && (
                <div className="results">
                    {tilequery.map((feature) => (
                        <Feature
                            content={content}
                            feature={feature}
                            key={`${feature.properties.tilequery.layer}-${feature.id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
