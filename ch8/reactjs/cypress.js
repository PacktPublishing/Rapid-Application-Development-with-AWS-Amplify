const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
const reports = { reportDir: 'mochawesome-report' }
const mergedReport = { reportDir: 'cypress/report/mochawesome-report' }
merge(reports).then((report) => marge.create(report, mergedReport))
