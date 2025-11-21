import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import properties from "./store/properties.js";
import {useParams} from "react-router-dom";
import styles from "./styles/Property.module.css";
import {DateRangePicker} from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";

const Property = observer(() => {
    console.log("propertyItem", properties.propertyItem)
    const {id} = useParams();
    const [dateValue, setDateValue] = useState([null, null])

    // console.log(dateValue)

    useEffect(() => {
        console.log("here")
        properties.fetchPropertyById(id)
    }, [properties]);

    const shouldDisableDate = (date) => {
        return dayjs(date).isBefore(dayjs(), 'day')
    }

    const handleBookingOnClick = () => {

        if(dateValue.length > 0) {
            // const dateValueFormat = dayjs(dateValue)
            // const isoDate = dateValueFormat.toISOString()
            // console.log(dateValue)
           const jsonData =  dateValue.map(date => date.toISOString())
            console.log(jsonData);
        }
    }



    return (
        <div className={styles.container}>
            <img src={properties.propertyItem.image}/>
            <div className={styles.wrapper}>
                <div className={styles.propertyWrapper}>
                    <h2>{properties.propertyItem.title}</h2>
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
                </div>
                <div className={styles.calendarWrapper}>
                    <DateRangePicker
                    value={dateValue}
                    onChange={(value) => setDateValue(value)}
                    shouldDisableDate={shouldDisableDate}
                    format="DD.MM.YYYY"
                    />
                    <button onClick={handleBookingOnClick}>Забронировать</button>
                </div>
            </div>
        </div>
    );
});

export default Property;