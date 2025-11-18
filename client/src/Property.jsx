import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import properties from "./store/properties.js";
import {useParams} from "react-router-dom";
import {DatePicker} from "@mui/x-date-pickers";

const Property = observer(() => {
    console.log("propertyItem", properties.propertyItem)
    const {id} = useParams();

    useEffect(() => {
        console.log("here")
        properties.fetchPropertyById(id)
    }, [properties]);
    return (
        <div>
            <h2>{properties.propertyItem.title}</h2>
            <img src={properties.propertyItem.image}/>
            <div>{properties.propertyItem.location}</div>
            <div>{properties.propertyItem?.capacity?.bedroom} bedroom</div>
            <div>
                {properties.propertyItem.superhost
                    &&
                    <>
                        <div>Суперхост</div>
                        <div>Это жилье - одно из самых любимых</div>
                        {properties.propertyItem.rating}
                    </>
                }
            </div>
            <DatePicker/>

        </div>
    );
});

export default Property;