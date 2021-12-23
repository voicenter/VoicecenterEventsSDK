const TEMPLATE_CATEGORIES = 'TEMPLATE_CATEGORIES'
const CATEGORY_PREVIEW = 'CATEGORY_PREVIEW'
const TEMPLATE_PREVIEW = 'TEMPLATE_PREVIEW'
const TEMPLATES_SETUP = 'TEMPLATES_SETUP'
const TEMPLATES_SUMMARY = 'TEMPLATES_SUMMARY'
const UPDATE_SUMMARY = 'UPDATE_SUMMARY'
const TEMPLATE_EDIT_WIDGET  = 'TEMPLATE_EDIT_WIDGET '

const allSteps = {
    [TEMPLATE_CATEGORIES]: {
        component: 'TemplateCategories',
    },
    [CATEGORY_PREVIEW]: {
        component: 'TemplateCategoryPreview',
        hasSummary: true,
    },
    [TEMPLATE_PREVIEW]: {
        component: 'TemplatePreview',
        hasSummary: true,
    },
    [TEMPLATES_SETUP]: {
        component: 'TemplatesSettingSetup',
        hasSummary: true,
    },
    [TEMPLATES_SUMMARY]: {
        component: 'TemplateSummaries',
        hasSummary: true,
    },
    [TEMPLATE_EDIT_WIDGET]: {
        component: 'TemplatesEditWidget',
        hasSummary: true,
    },
}

const types = {
    RESET_STATE: 'RESET_STATE',
    SELECT_CATEGORY: 'SELECT_CATEGORY',
    PREVIEW_TEMPLATE: 'PREVIEW_TEMPLATE',
    SETUP_TEMPLATES: 'SETUP_TEMPLATES',
    VIEW_SUMMARY: 'VIEW_SUMMARY',
    GO_TO_SELECTED_CATEGORY: 'GO_TO_SELECTED_CATEGORY',
    TEMPLATE_SETUP: 'TEMPLATE_SETUP',
    UPDATE_SUMMARY: 'UPDATE_SUMMARY',
    TEMPLATE_EDIT_WIDGET: 'TEMPLATE_EDIT_WIDGET',
    TEMPLATE_UPDATE: 'TEMPLATE_UPDATE',
    RESET_COPY_TEMPLATE: 'RESET_COPY_TEMPLATE',
    COPY_TEMPLATE: 'COPY_TEMPLATE'
}

const state = {
    step: 'TEMPLATE_CATEGORIES',
    category: {},
    summaries: false,
    templates: '',
    templateToEdit: false,
    templateToPreview: null,
    copyOfUniqTemplatesDefaultConfig: null
}

const mutations = {
    [types.SELECT_CATEGORY]: (state, category) => {
        state.category = category
        state.step = CATEGORY_PREVIEW
    },
    [types.RESET_STATE]: (state) => {
        state.step = TEMPLATE_CATEGORIES
        state.summaries = false
    },
    [types.PREVIEW_TEMPLATE]: (state, data) => {
        state.templateToPreview = {
            ...state,
            ...data
        }
        state.step = TEMPLATE_PREVIEW
    },
    [types.GO_TO_SELECTED_CATEGORY]: (state) => {
        state.step = CATEGORY_PREVIEW
    },
    [types.SETUP_TEMPLATES]: (state, data) => {
        if (data) {
            state.templates = ''
            setTimeout(() => {
                state.templates = data.templates
            }, 250)
        }
        state.step = TEMPLATES_SETUP
    },
    [types.VIEW_SUMMARY]: (state) => {
        state.step = TEMPLATES_SUMMARY
    },
    [types.TEMPLATE_SETUP]: (state, template) => {
        state.templateToEdit = template
        if (!template) {
            return
        }
        state.step = TEMPLATE_EDIT_WIDGET
    },
    [types.UPDATE_SUMMARY]: (state, summary) => {
        state.summaries = summary
    },
    [types.TEMPLATE_EDIT_WIDGET]: (state) => {
        state.step = TEMPLATE_EDIT_WIDGET
    },
    [types.TEMPLATE_UPDATE]: (state, summary) => {
        state.templates[summary.templateID].DefaultWidgetConfig = summary.template
    },
    [types.RESET_COPY_TEMPLATE]: (state) => {
        state.copyOfUniqTemplatesDefaultConfig = null
    },
    [types.COPY_TEMPLATE]: (state, data) => {
        state.copyOfUniqTemplatesDefaultConfig = data
    }
}

const actions = {
    async onSelectCategory({ commit }, category) {
        await commit(types.SELECT_CATEGORY, category)
    },
    async resetState({ commit }) {
        await commit(types.RESET_STATE)
    },
    async previewTemplate({ commit }, data) {
        await commit(types.PREVIEW_TEMPLATE, data)
    },
    async goToCategory({ commit }) {
        await commit(types.GO_TO_SELECTED_CATEGORY)
    },
    async goToSetupTemplates({ commit }, data) {
        await commit(types.SETUP_TEMPLATES, data)
    },
    async goToSummary({ commit }) {
        await commit(types.VIEW_SUMMARY)
    },
    async editTemplate({ commit }, template) {
        await commit(types.TEMPLATE_SETUP, template)
    },
    async updateSummaries({ commit }, summary) {
        await commit(types.UPDATE_SUMMARY, summary)
    },
    async updateTemplate({ commit }, template) {
        await commit(types.TEMPLATE_UPDATE, template)
    },
    async resetCopyTemplate({ commit }) {
        await commit(types.RESET_COPY_TEMPLATE)
    },
    async copyTemplate({ commit }, template) {
        await commit(types.COPY_TEMPLATE, template)
    }
}

const getters = {
    getComponent: state => allSteps[state.step].component,
    componentHasSummary: state => allSteps[state.step].hasSummary,
    getCategoryTemplates: state => state.category,
    getTemplateToPreview: state => state.templateToPreview,
    getTemplatesToSetup: state => state.templates,
    getSummaries: state => state.summaries,
    getTemplateToEdit: state => state.templateToEdit,
    getCopyTemplate: state => state.copyOfUniqTemplatesDefaultConfig
}

export default {
    namespaced: true,
    mutations,
    getters,
    actions,
    types,
    state,
}
