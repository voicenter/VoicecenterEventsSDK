import i18n from '@/i18n'

export const activeCallColumns = [{
    prop: 'QueueName',
    fixed: false,
    align: 'center',
    label: i18n.t('queue.queueName'),
    sortable: true
}, {
    prop: 'CallerNumber',
    fixed: false,
    align: 'center',
    label: i18n.t('queue.callerNumber'),
}, {
    prop: 'CallerName',
    fixed: false,
    align: 'center',
    label: i18n.t('queue.callerName'),
    sortable: true
}, {
    prop: 'CallerID',
    fixed: false,
    align: 'center',
    label: i18n.t('CallerID'),
    sortable: true
}, {
    prop: 'WaitingTime',
    fixed: false,
    align: 'center',
    label: i18n.t('queue.waitingTime'),
    sortable: true
}]

export const activeGaugeCallColumns = [{
    prop: 'Id',
    fixed: false,
    align: 'center',
    label: '#',
    sortable: false
}, {
    prop: 'CallerID',
    fixed: false,
    align: 'center',
    label: i18n.t('CallerID'),
    sortable: false
}, {
    prop: 'WaitingTime',
    fixed: false,
    align: 'center',
    label: i18n.t('Waiting Time'),
    sortable: false
}]

export const allSeries = [
    {
        label: i18n.t('queue.maximum.waiting.time'),
        value: 0
    },
    {
        label: i18n.t('queue.amount.callers.waiting'),
        value: 1
    },
    {
        label: i18n.t('queue.agents.available'),
        value: 2
    },
    {
        label: i18n.t('queue.agents.on.a.call'),
        value: 3
    },
    {
        label: i18n.t('queue.agents.on.administrative.break'),
        value: 4
    },
    {
        label: i18n.t('queue.agents.on.break'),
        value: 5
    },
    {
        label: i18n.t('queue.agents.calls.on.hold'),
        value: 6
    }
]
