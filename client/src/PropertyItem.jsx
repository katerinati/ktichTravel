import React from 'react';
import {observer} from "mobx-react-lite";
import styles from "./App.module.css"


const PropertyItem = observer(({property}) => {
    return (<div className={styles.propertyItemWrapper}>
            <img className={styles.propertyImg} src={property.image} alt="property"/>
            <div className={styles.margin}>
                <div className={styles.cardContent}>
                    <h2>{property.title}</h2>
                    <p>{property.description}</p>
                    {property.superhost &&
                        <div className={styles.superhost}>
                            Superhost
                            <div className={styles.superhostImg}/>
                        </div>
                    }
                    <div className={styles.cardDetails}>
                        <div className={styles.bedroomImg}/>
                        <div className={styles.bedroomText}>{property.capacity.bedroom} bedroom</div>
                        <div className={styles.guestsImg}/>
                        <div>{property.capacity.people} guests</div>
                    </div>
                </div>
                <div className={styles.cardFooter}>
                    <div>
                        <span className={styles.price}>${property.price}</span>
                    /night</div>
                    <div className={styles.ratingWrapper}>
                        <div className={styles.ratingImg}/>
                        <div className={styles.rating}>
                        {property.rating}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
});

export default PropertyItem;