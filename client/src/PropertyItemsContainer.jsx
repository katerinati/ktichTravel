import React from 'react';
import styles from "./App.module.css";
import properties from "./store/properties.js";
import PropertyItem from "./PropertyItem.jsx";
import {observer} from "mobx-react-lite";
import Property from "./Property.jsx";

const PropertyItemsContainer = observer(() => {
    return (

        <div className={styles.propertyItemContainer}>
            {

                properties.isFiltered ?
                    properties.filteredPropertiesList.map((item, index) => {
                        return (
                            <PropertyItem key={index} property={item}/>
                        )
                    })
                     :
                    properties.propertiesList.map((item, index) => {
                        return (
                            <>
                            <PropertyItem key={index} property={item}/>
                            </>
                        )
                    })
            }
        </div>
    );
});

export default PropertyItemsContainer;