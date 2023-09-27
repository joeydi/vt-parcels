import { useState } from "react";
import { Tooltip } from "react-tooltip";

const tilesets = {
    "HDLC_Landmarks-8okgla": {
        name: "HDLC Landmark",
        color: "#4d8396",
        type: "point",
    },
    "Local_Historic_Districts-7h8pft": {
        name: "Local Historic District",
        color: "#94c3b4",
        type: "polygon",
    },
    "National_Register_Historic_Pl-1rxkaz": {
        name: "National Register of Historic Places",
        color: "#4d8396",
        type: "polygon",
    },
    "Neighborhood_Conservation_Dis-05ft1s": {
        name: "Neighborhood Conservation District",
        color: "#59375e",
        type: "polygon",
    },
    "Parcels_To_Join-1sn8lf": {
        name: "Parcel",
        color: "#f97d69",
        type: "polygon",
    },
};

const fields = {
    name: "Name",
    descript: "Description",
    addr: "Address",
    architect: "Architect",
    date: "Date",
    jurisdicti: "Jurisdiction",
    ordinance: "Ordinance",
    control: "Control",
    nom_des: "Status",
    parid: "Parcel ID",
};

function getFeatureContent(content, layer, field = null, value = null) {
    return content.filter((item) => {
        // Always match on layer name
        let layerMatches = item.layer === layer;
        // If field is provided, check for equivalence. Otherwise, check for empty.
        let fieldMatches = field ? item.field === field : item.field === "";
        // If value is provided, check for equivalence. Otherwise, check for empty.
        let valueMatches = value ? item.value === value : item.value === "";

        return layerMatches && fieldMatches && valueMatches;
    });
}

function FeatureField({ content, feature, field }) {
    const tileset = tilesets[feature.properties.tilequery.layer];
    const layerName = tileset?.name || feature.properties.tilequery.layer;

    const [fieldId] = useState(`layer-${Math.floor(Math.random() * 100000)}`);

    const fieldContent = getFeatureContent(content, feature.properties.tilequery.layer, field)[0];
    const fieldLink = fieldContent?.link.url;

    const valueContent = getFeatureContent(content, feature.properties.tilequery.layer, field, feature.properties[field])[0];
    let valueLink;

    if (layerName === "HDLC Landmark" && field === "name") {
        valueLink = valueContent?.link.url || feature.properties.hyperlink;
    } else if (layerName === "Parcel" && field === "parid") {
        valueLink =
            valueContent?.link.url ||
            `https://beacon.schneidercorp.com/Application.aspx?AppID=979&PageTypeID=4&KeyValue=${feature.properties.parid}`;
    } else {
        valueLink = valueContent?.link.url;
    }

    return (
        <div className="field" key={field}>
            {fieldLink && (
                <>
                    <a
                        className="field-name"
                        href={fieldLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-tooltip-id={fieldContent?.note && fieldId}>
                        {fields[field]}
                    </a>
                    {fieldContent?.note && <Tooltip id={fieldId} className="tooltip" content={fieldContent.note} />}
                </>
            )}

            {!fieldLink && (
                <>
                    <span className="field-name" data-tooltip-id={fieldContent?.note && fieldId}>
                        {fields[field]}
                    </span>
                    {fieldContent?.note && <Tooltip id={fieldId} className="tooltip" content={fieldContent.note} />}
                </>
            )}

            {valueLink && (
                <>
                    <a
                        className="field-value"
                        href={valueLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-tooltip-id={valueContent?.note && `${fieldId}-value`}>
                        {feature.properties[field]}
                    </a>
                    {valueContent?.note && <Tooltip id={`${fieldId}-value`} className="tooltip" content={valueContent.note} />}
                </>
            )}

            {!valueLink && (
                <>
                    <span className="field-value" data-tooltip-id={valueContent?.note && `${fieldId}-value`}>
                        {feature.properties[field]}
                    </span>
                    {valueContent?.note && <Tooltip id={`${fieldId}-value`} className="tooltip" content={valueContent.note} />}
                </>
            )}
        </div>
    );
}

export default function Feature({ content, feature }) {
    const [layerId] = useState(`layer-${Math.floor(Math.random() * 100000)}`);

    const tileset = tilesets[feature.properties.tilequery.layer];
    const layerName = tileset?.name || feature.properties.tilequery.layer;
    const layerType = tileset?.type || "polygon";
    const layerColor = tileset?.color || "#4d8396";

    const layerContent = getFeatureContent(content, feature.properties.tilequery.layer)[0];

    let link;
    if (layerName === "HDLC Landmark") {
        link = layerContent?.link.url || feature.properties.hyperlink;
    } else if (layerName === "Parcel") {
        link =
            layerContent?.link.url ||
            `https://beacon.schneidercorp.com/Application.aspx?AppID=979&PageTypeID=4&KeyValue=${feature.properties.parid}`;
    } else {
        link = layerContent?.link.url;
    }

    return (
        <div className="feature">
            <h2>
                <div className={`layer-type ${layerType}`} style={{ color: layerColor }}></div>
                {link && (
                    <>
                        <a href={link} target="_blank" rel="noopener noreferrer" data-tooltip-id={layerContent?.note && layerId}>
                            {layerName}
                        </a>
                        {layerContent?.note && <Tooltip id={layerId} className="tooltip" content={layerContent.note} />}
                    </>
                )}

                {!link && (
                    <>
                        <span data-tooltip-id={layerContent?.note && layerId}>{layerName}</span>
                        {layerContent?.note && <Tooltip id={layerId} className="tooltip" content={layerContent.note} />}
                    </>
                )}
            </h2>

            {Object.keys(fields).map((field) => {
                if (feature.properties[field]) {
                    return <FeatureField key={`${layerId}-${field}`} content={content} feature={feature} field={field} />;
                }

                return null;
            })}
        </div>
    );
}
