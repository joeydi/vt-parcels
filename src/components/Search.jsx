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
                    proximity: [-73.16, 44.47],
                    bbox: [
                        [-73.13, 44.39],
                        [-72.74, 44.63],
                    ],
                }}
                value=""
                placeholder="Search"
                onRetrieve={onRetrieveHandler}
            />
        </div>
    );
}
