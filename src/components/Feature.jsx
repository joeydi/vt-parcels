import { useState } from "react";
import { Tooltip } from "react-tooltip";

const tilesets = {
    "chittenden_county_parcels-2ztecj": {
        name: "Parcel",
        color: "#f97d69",
        type: "polygon",
    },
};

const fields = {
    OBJECTID: "OBJECTID",
    SPAN: "GIS SPAN",
    GLIST_SPAN: "Grand List SPAN",
    MAPID: "MAPID",
    PARCID: "Parcel ID",
    PROPTYPE: "Property Type",
    YEAR: "GIS Year",
    GLYEAR: "Grand List Year",
    TOWN: "Town",
    TNAME: "Grand-List Town-Name",
    SOURCENAME: "Source Name",
    SOURCETYPE: "Source Type",
    SOURCEDATE: "Source Date",
    EDITMETHOD: "Edit Method",
    EDITOR: "Editor",
    EDITDATE: "Editdate",
    MATCHSTAT: "Matchstat",
    EDITNOTE: "Editnote",
    OWNER1: "Owner Name 1",
    OWNER2: "Owner Name 2",
    ADDRGL1: "Mailing Address 1",
    ADDRGL2: "Mailing Address 2",
    CITYGL: "Mailing Address City",
    STGL: "Mailing Address State",
    ZIPGL: "Mailing Address Zip",
    DESCPROP: "Property Description",
    LOCAPROP: "Location",
    CAT: "Category",
    RESCODE: "Resident Ownership Code",
    ACRESGL: "Total Acres",
    REAL_FLV: "Listed Real Value (Full)",
    HSTED_FLV: "Homestead Listed Value (Full)",
    NRES_FLV: "Non-Residential Value (Full)",
    LAND_LV: "Listed Value of Land",
    IMPRV_LV: "Listed Value of Improvements",
    EQUIPVAL: "Equipment Value (Personal Property)",
    EQUIPCODE: "Equipment Code (Cable only)",
    INVENVAL: "Inventory Value",
    HSDECL: "Homestead Declared (Y/N)",
    HSITEVAL: "Housesite Value",
    VETEXAMT: "Veterans Exemption Amount",
    EXPDESC: "Other Exemption Type",
    ENDDATE: "Exemption End Date",
    STATUTE: "Exemption Statute",
    EXAMT_HS: "Exemption Homestead Amount",
    EXAMT_NR: "Exemption Non-Residential Amount",
    UVREDUC_HS: "Current Use Homestead Reduction Amount",
    UVREDUC_NR: "Current Use Non-Residential Reduction Amount",
    GLVAL_HS: "Education Grand List Value Homestead (1%)",
    GLVAL_NR: "Education Grand List Value Non-Residential (1%)",
    CRHOUSPCT: "Covenant Restricted Housing Percent",
    MUNGL1PCT: "Municipal Grand List Value (1%)",
    AOEGL_HS: "AOE Grand List Value Homestead (1%)",
    AOEGL_NR: "AOE GL Value Non-Residential (1%)",
    E911ADDR: "Emergency 911 Address",
    SHAPE__Area: "SHAPE__Area",
    SHAPE_Length: "SHAPE_Length",
};

function FeatureField({ feature, field }) {
    return (
        <div className="field" key={field}>
            <span className="field-name">{fields[field]}</span>
            <span className="field-value">{feature.properties[field]}</span>
        </div>
    );
}

export default function Feature({ feature }) {
    const [layerId] = useState(`layer-${Math.floor(Math.random() * 100000)}`);

    const tileset = tilesets[feature.properties.tilequery.layer];
    const layerName = tileset?.name || feature.properties.tilequery.layer;
    const layerType = tileset?.type || "polygon";
    const layerColor = tileset?.color || "#4d8396";

    return (
        <div className="feature">
            <h2>
                <div className={`layer-type ${layerType}`} style={{ color: layerColor }}></div>
                <span>{layerName}</span>
            </h2>

            {Object.keys(fields).map((field) => {
                if (feature.properties[field]) {
                    return <FeatureField key={`${layerId}-${field}`} feature={feature} field={field} />;
                }

                return null;
            })}
        </div>
    );
}
