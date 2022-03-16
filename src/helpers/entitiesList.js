import get from 'lodash/get'
import store from '@/store/store'
import {filters} from '@/enum/widgetTemplateConfigs'

export function getOptionsList(ParameterName) {
    let templateConfig = getTemplateConfig(ParameterName)
    let EntitiesListKey = get(templateConfig, 'EntitiesListKey')
    
    let options = store.getters['entities/getEntityList'](EntitiesListKey)
    
    if (!options) {
        return []
    }
    
    options = options.filter(object => {
        if (!(templateConfig.value in object) || !(templateConfig.label in object)) {
            return false
        }
        return Object.keys(object).every(field => {
            if (!object[field]) {
                return false
            }
            // console.log(object, 'object')
            // console.log(templateConfig.filterByType in object, 'qqq')
            // if (templateConfig.filterByType in object) {
            //     console.log(object[field], templateConfig.filterByType)
            //     // if (object[field])
            // }
            return object;
        })
    })
    
    return options
}

export function getTemplateConfig(ParameterName) {
    return filters[ParameterName.toLowerCase()]
}

export function getOptionsValues(ParameterName) {
    let options = getOptionsList(ParameterName)
    
    if (!options) return;
    
    let templateConfig = getTemplateConfig(ParameterName)
    
    options = options.map(el => {
        //templateConfig.value = key for value
        return Number(el[templateConfig.value]);
    });
    return options
}
