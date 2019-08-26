import {DashboardApi} from "@/api/dashboardApi";
import Vue from 'vue'

const types = {
    SET_ALL_DASHBOARDS: 'SET_ALL_DASHBOARDS',
    SET_ACTIVE_DASHBOARD: 'SET_ACTIVE_DASHBOARD',
    ADD_DASHBOARD: 'ADD_DASHBOARD',
    UPDATE_DASHBOARD: 'UPDATE_DASHBOARD'
};
const state = {
    allDashboards: [],
    activeDashboard: null
};

function sortDashboardWidgetsByorder(dashboard) {
    dashboard.WidgetGroupList = dashboard.WidgetGroupList.map(widgetGroup => {
        let WidgetList = widgetGroup.WidgetList.sort((a, b) => {
            return a.WidgetLayout.Order - b.WidgetLayout.Order
        });
        return {
            ...widgetGroup,
            WidgetList
        }
    })
    return dashboard
}

const mutations = {
    [types.SET_ALL_DASHBOARDS]: (state, value) => {
        state.allDashboards = value;
    },
    [types.ADD_DASHBOARD]: (state, value) => {
        state.allDashboards = {
            ...state.allDashboards,
            ...value
        }
    },
    [types.UPDATE_DASHBOARD]: (state, dashboard) => {
        state.allDashboards.forEach((el, index) => {
            if (el.DashBoardsID === dashboard.DashBoardsID) {
                Vue.set(state.allDashboards, index, dashboard)
            }
        })
        state.activeDashboard = dashboard
    },
    [types.SET_ACTIVE_DASHBOARD]: (state, dashboard) => {
        state.activeDashboard = dashboard
    },
};

const actions = {
    async getDashboards({commit}) {
        let dashboards = await DashboardApi.getAll()
        commit(types.SET_ALL_DASHBOARDS, dashboards)

    },
    async selectDashboard({commit, state}, dashboard) {
        dashboard = dashboard || state.allDashboards[0]
        if (dashboard) {
            dashboard = await DashboardApi.find(dashboard.DashBoardsID)
            commit(types.SET_ACTIVE_DASHBOARD, dashboard)
        }
    },
    async createDashboard({commit}, newDashboard) {
        const dashboard = {
            "AccountID": "1",
            "DashboardsTitle": newDashboard.title,
            "WidgetGroupList": []
        }

        newDashboard = await DashboardApi.store(dashboard)

        commit(types.ADD_DASHBOARD, newDashboard)
        commit(types.SET_ACTIVE_DASHBOARD, newDashboard)
    },
    async updateDashboard({commit}, dashboard) {
        await DashboardApi.update(dashboard)
        commit(types.UPDATE_DASHBOARD, dashboard)
    }
};
const getters = {};

export default {
    namespaced: true,
    types,
    state,
    mutations,
    actions,
    getters
};
