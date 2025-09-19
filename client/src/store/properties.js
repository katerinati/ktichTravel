import {makeAutoObservable, runInAction} from "mobx";

class Properties {
    propertiesList = []
    propertiesLocation = []
    filteredPropertiesList = []
    propertiesType = []
    isFiltered = false
    propertiesSuperhost = []
    constructor() {
        makeAutoObservable(this)
    }
    fetchProperties () {
        this.isFiltered = false
        runInAction(() => {
            fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json")
                .then(response => response.json())
                .then(data => {
                    this.propertiesList = [...data]
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
            // console.log(superhost)
            const res = this.propertiesList.filter(item=> item.superhost === superhost)
            this.filteredPropertiesList = res
        }

    }
    showAllProperties() {
        this.isFiltered = false

    }
}

export default new Properties();