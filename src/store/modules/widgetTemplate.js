import {widgetTemplateApi} from '@/api/widgetTemplateApi'

const types = {
    SET_ALL_WIDGET_TEMPLATES: 'SET_ALL_WIDGET_TEMPLATES'
};
const state = {
    allWidgetTemplates: []
};

const mutations = {
    [types.SET_ALL_WIDGET_TEMPLATES]: (state, value) => {
        state.allWidgetTemplates = value;
    }
};

const actions = {
    async getAllWidgetTemplates({commit}) {
        const widgetTemplates = await widgetTemplateApi.getAll()
        commit(types.SET_ALL_WIDGET_TEMPLATES, widgetTemplates)
    }
};

export default {
    namespaced: true,
    types,
    state,
    mutations,
    actions,
};