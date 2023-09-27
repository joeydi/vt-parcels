import { useEffect, useState } from "react";
import Search from "./Search.jsx";
import Feature from "./Feature.jsx";

export default function Sidebar({ map, location, setLocation }) {
    const [polygonTilequery, setPolygonTilequery] = useState([]);
    const features = polygonTilequery?.features || [];

    useEffect(() => {
        const polygonTilesets = ["joeydi.6gcyid8j"];

        async function fetchData() {
            const radius = 0;
            const limit = 10;
            const token = "pk.eyJ1Ijoiam9leWRpIiwiYSI6IlM5SE1BT0kifQ.gp3XWWKTK3xpw6dkg-zeUg";
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
            {!features?.length && <p>Click on the map or use the search bar above to identify parcels.</p>}
            {!!features?.length && (
                <div className="results">
                    {features.map((feature) => (
                        <Feature feature={feature} key={`${feature.properties.tilequery.layer}-${feature.id}`} />
                    ))}
                </div>
            )}
        </div>
    );
}
