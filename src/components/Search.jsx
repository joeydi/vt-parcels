import { SearchBox } from "@mapbox/search-js-react";

export default function Search({ map, setLocation }) {
    const onRetrieveHandler = (response) => {
        const lngLat = response?.features[0].geometry.coordinates;
        setLocation({ lng: lngLat[0], lat: lngLat[1] });
    };

    return (
        <div className="search">
            <SearchBox
                accessToken="pk.eyJ1IjoiY2FzdWFsYXN0cm9uYXV0IiwiYSI6ImNsbXppeTRiNTEwZmQybGxjbjJwcWQ1NGkifQ.RBFaqoShtUQLEO39XM3-iw"
                map={map}
                options={{
                    proximity: [-90.03659, 29.96653],
                    bbox: [
                        [-90.16, 29.873],
                        [-89.6317, 30.179],
                    ],
                }}
                value=""
                placeholder="Search"
                onRetrieve={onRetrieveHandler}
            />
        </div>
    );
}
