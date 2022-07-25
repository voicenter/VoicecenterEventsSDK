import get from 'lodash/get'
import { LayoutApi } from '@/api/layoutApi'
import store from '@/store/store'
import { defaultLayout, extensionThresholdKeys, defaultExtensionThresholdConfig } from '@/enum/default-layout-config'
import { convertHex } from '@/helpers/convertHex'
import {
    DEFAULT_LOGO,
    ENABLED_STATUS_ID,
    globalAccountSettings,
} from '@/views/DashboardSettings/LayoutManagement/layout-management'

const types = {
    SET_ALL_LAYOUTS: 'SET_ALL_LAYOUTS',
    SET_ACTIVE_LAYOUT: 'SET_ACTIVE_LAYOUT',
    UPDATE_ACTIVE_LAYOUT: 'UPDATE_ACTIVE_LAYOUT',
    SET_GLOBAL_LAYOUT: 'SET_GLOBAL_LAYOUT',
    SET_PREVIEW_LAYOUT: 'SET_PREVIEW_LAYOUT',
    RESET_ACTIVE_LAYOUT: 'RESET_ACTIVE_LAYOUT',
    SET_TYPE_OF_LAYOUT: 'SET_TYPE_OF_LAYOUT'
};
const state = {
    data: [],
    activeLayout: {},
    globalLayout: defaultLayout(null),
    previewLayout: {},
    typeOfLayout: 'activeLayout'
};

const mutations = {
    [types.SET_ACTIVE_LAYOUT]: (state, value) => {
        state.activeLayout = value;
    },
    [types.SET_ALL_LAYOUTS]: (state, value) => {
        state.data = value;
    },
    [types.UPDATE_ACTIVE_LAYOUT]: (state, layout) => {
        state.activeLayout = layout;
    },
    [types.SET_GLOBAL_LAYOUT]: (state, value) => {
        if (!state.data.find(layout => layout.LayoutID === value.LayoutID)) {
            state.data.splice(0, 0, value)
        }

        state.globalLayout = value
    },
    [types.SET_PREVIEW_LAYOUT]: (state, value) => {
        state.previewLayout = value;
    },
    [types.RESET_ACTIVE_LAYOUT]: (state) => {
        state.previewLayout = {};
    },
    [types.SET_TYPE_OF_LAYOUT]: (state, typeOfLayout) => {
        state.typeOfLayout = typeOfLayout;
    }
};

const actions = {
    async setupActiveLayout({ commit }) {
        const dashboard = store.state.dashboards.activeDashboard
        if (dashboard) {
            const { DashboardLayoutID } = dashboard
            const data = {
                LayoutID: DashboardLayoutID,
            }
            const layouts = await LayoutApi.get(data)
            commit(types.SET_ACTIVE_LAYOUT, layouts[0])
            return
        }
        const layout = defaultLayout(null)
        commit(types.SET_ACTIVE_LAYOUT, layout)
    },
    async setupLayouts({ commit }) {
        const accountID = store.state.entities.selectedAccountID
        const layouts = await LayoutApi.get({ LayoutAccountID: accountID })
        commit(types.SET_ALL_LAYOUTS, layouts)
    },
    async getGlobalLayout({ commit }) {
        const layout = await LayoutApi.get(globalAccountSettings)
        if (!layout[0]) {
            return
        }
        commit(types.SET_GLOBAL_LAYOUT, layout[0])
    },
    async updateActiveLayout({ commit }, layout) {
        commit(types.UPDATE_ACTIVE_LAYOUT, layout)
    },
    async setLogo({ commit, state }, config) {
        const logoParameterIndex = state.activeLayout.LayoutParametersList.findIndex(el => el.LayoutParameterName === 'DashboardLogo')
        if (logoParameterIndex !== -1) {
            let logoParameter = state.activeLayout.LayoutParametersList[logoParameterIndex]
            logoParameter['ValueText'] = config
            commit(types.UPDATE_ACTIVE_LAYOUT, state.activeLayout)
        }
    },
    async setPreviewLayout({ commit }, layout) {
        commit(types.SET_PREVIEW_LAYOUT, layout)
    },
    async resetPreviewLayout({ commit }) {
        commit(types.RESET_ACTIVE_LAYOUT)
    },
    async setTypeOfLayout({ commit }, typeOfLayout) {
        commit(types.SET_TYPE_OF_LAYOUT, typeOfLayout)
    }
};

const getters = {
    colors: (state) => (layoutType) => {
        let result = {
            primary: '#2575FF',
            primary_rgba: '37, 117, 255',
            background: '#edf2f7',
            frames: '#edf2f7',
            widgetGroupBackground: '#edf2f7',
            widgetGroupFrames: '#edf2f7',
            widgetGroupTitles: '#000000',
            loginStatusLimit: '#FF3636',
            loginStatusWarning: '#FAB11E'
        }

        result['primary_rgba'] = convertHex(result.primary);

        if (!get(state, `${layoutType}.LayoutParametersList.length`, false)) {
            return result
        }

        state[layoutType].LayoutParametersList.forEach((el) => {

            if (el.LayoutParameterName === 'ColorPrimary') {
                result.primary = el.Value
            }

            if (el.LayoutParameterName === 'ColorBackground') {
                result.background = el.Value
            }

            if (el.LayoutParameterName === 'ColorFrames') {
                result.frames = el.Value
            }

            if (el.LayoutParameterName === 'ColorWidgetGroupBackground') {
                result.widgetGroupBackground = el.Value
            }

            if (el.LayoutParameterName === 'ColorWidgetGroupFrames') {
                result.widgetGroupFrames = el.Value
            }

            if (el.LayoutParameterName === 'ColorWidgetGroupTitles') {
                result.widgetGroupTitles = el.Value
            }

            if (el.LayoutParameterName === 'LoginStatusLimitColor') {
                result.loginStatusLimit = el.Value
            }

            if (el.LayoutParameterName === 'LoginStatusWarningColor') {
                result.loginStatusWarning = el.Value
            }
        });

        result['primary_rgba'] = convertHex(result.primary);

        return result
    },
    baseFontSize: (state) => (layoutType) => {
        try {
            let result = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'FontSize')
            return Number(result[0]['Value'])
        } catch (e) {
            console.warn(e)
            return 16
        }
    },
    refreshDelay: (state) => (layoutType) => {
        try {
            let result = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'RefreshRealTimeDataDelay')
            return Number(result[0]['Value'])
        } catch (e) {
            console.warn(e)
            return 30
        }
    },
    switchInterval: (state) => (layoutType) => {
        try {
            let result = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'ReportInterval')
            return Number(result[0]['Value'])
        } catch (e) {
            console.warn(e)
            return null
        }
    },
    switchReport: (state) => (layoutType) => {
        try {
            let result = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'ReportSwitching')
            return Boolean(result[0]['Value'] === '1');
        } catch (e) {
            console.warn(e)
            return false
        }
    },
    widgetGroupTitleStyles: (state) => (layoutType) => {
        try {
            const fontSize = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'WidgetGroupTitlesFontSize')
            const _fontSize = Number(fontSize[0]['Value'])
            const color = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'ColorWidgetGroupTitles')
            const _color = color[0]['Value']

            return {
                color: _color,
                fontSize: `${_fontSize}px`,
            }
        } catch (e) {
            console.warn(e)
            return {
                color: '#000000',
                fontSize: '22px',
            }
        }
    },
    widgetTitleStyles: (state) => (layoutType) => {
        try {
            const result = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'WidgetTitlesFontSize')
            const fontSize = Number(result[0]['Value'])
            return {
                fontSize: `${fontSize}px`,
            }
        } catch (e) {
            console.warn(e)
            return {
                fontSize: '22px',
            }
        }
    },
    widgetTableContentFontSize: (state) => (layoutType) => {
        try {
            const result = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'WidgetTableContentFontSize')
            const fontSize = Number(result[0]['Value'])
            return {
                fontSize: `${fontSize}px`,
            }
        } catch (e) {
            console.warn(e)
            return {
                fontSize: '16px',
            }
        }
    },
    showWidgetTitles: (state) => (layoutType) => {
        try {
            let result = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'ShowWidgetTitles')
            return Boolean(result[0]['Value'] === '1');
        } catch (e) {
            console.warn(e)
            return true
        }
    },
    minRefreshInterval: (state) => (layoutType) => {
        try {
            let result = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'MinRefreshInterval')
            return Number(result[0]['Value'])
        } catch (e) {
            console.warn(e)
            return 10
        }
    },
    getLogo: (state) => (layoutType) => {
        try {
            const logo = state[layoutType].LayoutParametersList.filter((el) => el.LayoutParameterName === 'DashboardLogo')
            return get(logo, `[0]['ValueText']`, DEFAULT_LOGO) || DEFAULT_LOGO
        } catch (e) {
            console.warn(e)
            return DEFAULT_LOGO
        }
    },

    getActiveLayout: state => {
        return state.activeLayout || defaultLayout
    },
    getAllLayouts: state => state.data,
    getActiveLayouts: state => {
        return state.data.filter(layout => layout.LayoutStatusID.toString() === ENABLED_STATUS_ID.toString())
    },
    storedDashboardLayout: state => LayoutID => {
        return state.data.find(layout => layout.LayoutID.toString() === LayoutID.toString())
    },
    getThresholdConfig: (state) => (layoutType) => {
        const { LayoutParametersList } = state[layoutType] || {}

        if (!LayoutParametersList) {
            return defaultExtensionThresholdConfig
        }

        let config = {}
        LayoutParametersList.forEach(el => {
            if (extensionThresholdKeys.includes(el.LayoutParameterName)) {
                config[el.LayoutParameterName] = el.Value
            }
        })
        return config
    },
    getPreviewLayout: state => {
        return state.previewLayout
    },
    getTypeOfLayout: state => {
        return state.typeOfLayout
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};


