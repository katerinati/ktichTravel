import React, {useState} from 'react';
import styles from './styles/Product.module.css'
import properties from "./store/properties.js";
import {observer} from "mobx-react-lite";

const FilterContainer = observer(() => {
    const [isClicked, setIsClicked,] = useState('all')
    const [isPropertTypeBtnClicked, setIsPropertTypeBtnClicked,] = useState(false)
    const [isSuperhost, setIsSuperhost] = useState(true)
    return (<>

        <div className={styles.filterContainer}>
            <div>
                <button className={isClicked === 'all' ? styles.filterBtnActive : styles.filterBtn} onClick={() => {
                    properties.showAllProperties()
                    setIsClicked('all')
                }}>All countries
                </button>
                {properties.propertiesLocation.map((item) => {
                    return (<button className={isClicked === item ? styles.filterBtnActive : styles.filterBtn}
                                    onClick={() => {
                                        properties.filterProperties(item)
                                        setIsClicked(item)
                                    }}>{item}</button>)
                })}
            </div>


            <div className={styles.propertyTypeWrapper}>
                <div>
                    <label className={styles.toggle}>
                        <input type="checkbox" className={styles.toggleInput}
                               onClick={() => {
                                   setIsSuperhost(!isSuperhost)
                                   isSuperhost ? properties.filterProperties(null, null, isSuperhost) : properties.showAllProperties()

                               }}
                        />
                        <span className={styles.toggleSlider}></span>
                    </label>
                    <span>
                        Superhost
                    </span>
                </div>
                <div className={styles.superhostWrapper}>
                    <div onClick={() => {
                        setIsPropertTypeBtnClicked(!isPropertTypeBtnClicked)
                        properties.showAllProperties()
                    }}>Property Type
                    </div>
                    <div
                        className={isPropertTypeBtnClicked ? styles.propertyTypeBtnWrapperActive : styles.propertyTypeBtnWrapper}>
                        {properties.propertiesType.map((type) => {
                            return (<button
                                className={styles.propertyTypeBtn}
                                onClick={() => properties.filterProperties(null, type)}>{type} bedroom</button>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>);
});

export default FilterContainer;