import React, {useEffect} from 'react';
import styles from './App.module.css';
import {observer} from "mobx-react-lite";
import properties from "./store/properties.js";
import FilterContainer from "./FilterContainer.jsx";
import PropertyItemsContainer from "./PropertyItemsContainer.jsx";


const Home = observer(() => {

    useEffect(() => {
        properties.fetchProperties()

    }, [properties]);
    return (
        <>
            <div className={styles.bg}>

                <h1>Peace, nature, dream</h1>
                <p>Find and book a great experience</p>
            </div>
            <div className={styles.contentContainer}>
                <FilterContainer/>
                <PropertyItemsContainer/>
            </div>
        </>
    )
});

export default Home;