import $axios from './apiConnection'
import instance from './apiConnectionExternal'
import parseCatch from '../helpers/handleErrors'

export const WidgetDataApi = {
    async getData(endPoint) {
        try {
            let res = await $axios.post(endPoint)
            return res.Data
        } catch (e) {
            parseCatch(e, true)
            return Promise.reject(e)
        }
    },

    async getExternalData(endPoint) {
        try {
            return await instance.get(endPoint)
        } catch (e) {
            parseCatch(e, true)
        }
    }
}
