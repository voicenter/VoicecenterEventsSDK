export const layoutTypes = {
    LIST: 'list',
    TABBED: 'tabbed',
};

export const LAYOUT_TYPE_KEY = 'layout-type'
export const ACTIVE_WIDGET_GROUP_KEY = 'active-widget-group'

export const settingsColors = [
    "primary",
    "background",
    "frames",
    "widgetGroupBackground",
    "widgetGroupFrames",
    'widgetGroupTitles'
];

export const defaultWidgetColors = [
    "background",
    "frames",
    "fonts",
];
 export const areaChartWidgetColors = [
     ...defaultWidgetColors,
     "outgoing",
     "incoming"
 ];

 export const queueChartWidgetColors = [
     ...defaultWidgetColors,
     "maxWaitingTime",
     "queueCalls"
 ]

export const queueGaugeWidgetColors = [
    ...defaultWidgetColors,
    "minimumRangeColor",
    "middleRangeColor",
    "maximumRangeColor",
]

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
];
