import i18n from '@/i18n';

export const GLOBAL_LAYOUT_ID = 1
export const PRIMARY_COLOR_KEY = 'ColorPrimary'

export const globalAccountSettings = {
    'LayoutID': GLOBAL_LAYOUT_ID,
}

export const ENABLED_STATUS_ID = 1;
export const DELETED_STATUS_ID = 2;

export const availableLayouts = [{
    label: i18n.t('Active Layouts'),
    statusID: ENABLED_STATUS_ID,
    statusName: 'Enable',
    name: 'enabledLayouts',
}, {
    label: i18n.t('Recycle Bin'),
    statusID: DELETED_STATUS_ID,
    statusName: 'Deleted',
    name: 'deletedLayouts',
}]

export const statusDictionary = {
    1: 'enable layout',
    2: 'move layout to bin',
}

export const sliderOptionConfigs = {
    FontSize: {
        min: 8,
        max: 24,
        step: 1,
        marks: {
            14: '9px',
            16: '16px',
            20: '20px',
        },
    },
    WidgetTitlesFontSize: {
        min: 12,
        max: 48,
        step: 1,
        marks: {
            16: '16px',
            22: '24px',
            32: '40px',
        },
    },
    WidgetGroupTitlesFontSize: {
        min: 12,
        max: 48,
        step: 1,
        marks: {
            16: '16px',
            22: '24px',
            32: '32px',
        },
    },
    MinRefreshInterval: {
        min: 10,
        max: 1000,
        step: 10,
        marks: {
            100: '100s',
            200: '200s',
            400: '400s',
            600: '600s',
            800: '800s',
        },
    },
    RefreshRealTimeDataDelay: {
        min: 3,
        max: 90,
        step: 1,
        marks: {
            5: '5min',
            15: '15min',
            30: '30min',
            45: '45min',
            60: '75min',
        },
    },
    ReportInterval: {
        min: 10,
        max: 1000,
        step: 10,
        marks: {
            100: '120s',
            200: '360s',
            600: '600s',
            800: '800s',
        },
    },
}

export const predefinedColors = [
    '#F7FAFC',
    '#EDF2F6',
    '#38B2AC',
    '#4299E1',
    '#667EEA',
    '#9F7AEA',
    '#ED8936',
    '#D53F8C',
    '#E53E3E',
    '#000000',
]

export const DEFAULT_SELECTED_GROUP = 'Colors'

export const DEFAULT_LAYOUT_GROUPS = [
    'Colors',
    'Fonts',
    'Timers',
]

export const DEFAULT_GROUP_KEYS = {
    'Colors': [
        'ColorPrimary',
        'ColorBackground',
        'ColorFrames',
    ],
    'AllColors': [
        'ColorPrimary',
        'ColorBackground',
        'ColorFrames',
        'ColorWidgetGroupBackground',
        'ColorWidgetGroupFrames',
        'ColorWidgetGroupTitles',
        'DashboardLogo',
    ],
    'Fonts': [
        'ShowWidgetTitles',
        'FontSize',
        'WidgetTitlesFontSize',
        'WidgetGroupTitlesFontSize',
        'MinRefreshInterval',
        'RefreshRealTimeDataDelay',
    ],
    'Timers': [
        'ReportInterval',
        'ReportSwitching',
        'ReportRefresh'
    ],
}

export const DEFAULT_LOGO = '/img/navbar/logo.png'