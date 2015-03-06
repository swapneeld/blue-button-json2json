"use strict";

var nestedTemplate = {
    content: {
        name: {
            dataKey: 'detail.name'
        },
        subjects: {
            dataKey: 'detail.notes.subject'
        },
        grades: {
            dataKey: 'detail.notes.grade'
        },
        firstSubject: {
            dataKey: 'detail.notes.0.subject'
        },
        first: {
            value: function (input) {
                return input.subject + ': ' + input.grade;
            },
            dataKey: 'detail.notes.0'
        },
        total: {
            dataKey: 'detail.notes',
            dataTransform: function (input) {
                return input.reduce(function (r, e) {
                    r += e.grade;
                    return r;
                }, 0);
            }
        }
    }
};

exports.template = {
    content: {
        title: {
            value: 'GRADE'
        },
        summary: {
            dataKey: 'summary'
        },
        info: nestedTemplate
    }
};

exports.input = {
    summary: 'Summary Of Grades',
    detail: {
        name: 'Joe',
        notes: [{
            subject: 'Math',
            grade: 81
        }, {
            subject: 'Reading',
            grade: 50
        }, {
            subject: 'Writing',
            grade: 25
        }]
    }
};

exports.expected = {
    title: 'GRADE',
    summary: 'Summary Of Grades',
    info: {
        name: 'Joe',
        subjects: ['Math', 'Reading', 'Writing'],
        firstSubject: 'Math',
        first: 'Math: 81',
        grades: [81, 50, 25],
        total: 156
    }
};