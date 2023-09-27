import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapboxMap({ map, setMap, location, setLocation }) {
    const mapNode = useRef(null);
    const marker = useRef(null);

    useEffect(() => {
        const node = mapNode.current;

        if (typeof window === "undefined" || node === null) {
            return;
        }

        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: "pk.eyJ1Ijoiam9leWRpIiwiYSI6IlM5SE1BT0kifQ.gp3XWWKTK3xpw6dkg-zeUg",
            style: "mapbox://styles/joeydi/cln13e1r806cw01qrbyj99cnq",
            center: [-73.16, 44.47],
            zoom: 12,
            maxZoom: 19,
            // maxBounds: [
            //     [-90.246, 29.7953],
            //     [-89.8728, 30.1002],
            // ],
        });

        marker.current = new mapboxgl.Marker({ color: "#4d8396" });

        mapboxMap.on("click", (e) => {
            setLocation(e.lngLat);
            console.log("click", e.lngLat);
            console.log("center", mapboxMap.getCenter());
        });

        setMap(mapboxMap);

        return () => {
            mapboxMap.remove();
        };
    }, [setLocation, setMap]);

    useEffect(() => {
        if (location) {
            marker.current.setLngLat(location).addTo(map);
        }
    }, [location, map]);

    return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}
