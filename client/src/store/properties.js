import {makeAutoObservable, runInAction} from "mobx";
import $api from "../http/index.js";

class Properties {
    propertiesList = []
    propertiesLocation = []
    filteredPropertiesList = []
    propertiesType = []
    isFiltered = false
    propertiesSuperhost = []
    propertyItem = {}
    constructor() {
        makeAutoObservable(this)
    }
    fetchProperties () {
        this.isFiltered = false
        runInAction(() => {
                $api.get("/property")
                .then(data => {
                    this.propertiesList = [...data.data]
                    this.propertiesLocation = [...new Set(this.propertiesList.map(item => item.location))];
                    this.propertiesType = [...new Set(this.propertiesList.map(item => item.capacity.bedroom))];
                    this.propertiesSuperhost = [...new Set(this.propertiesList.map(item => item.superhost))];
                })
        })


    }
    filterProperties (location, type, superhost) {
        console.log(superhost)

        this.isFiltered = true
        if(location) {
            const res =  this.propertiesList.filter(item => item.location === location)
            this.filteredPropertiesList = res
        }
        if(type > 0) {
            const res =  this.propertiesList.filter(item => item.capacity.bedroom === type)
            this.filteredPropertiesList = res
        }
        if(superhost) {
            const res = this.propertiesList.filter(item=> item.superhost === superhost)
            this.filteredPropertiesList = res
        }

    }
    showAllProperties() {
        this.isFiltered = false

    }
    fetchPropertyById (id) {
        runInAction(() => {
            $api.get(`/property/${id}`)
                .then(data => {
                    this.propertyItem = data.data
                })
        })


    }
}

export default new Properties();