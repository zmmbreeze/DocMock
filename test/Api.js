/*global require:true, describe:true, it:true */
var assert = require('assert');
var Api = require('../lib/Api');

describe('Api', function() {
    var apiStr = [
        { text: 'NAME: Create a ID card.', start: 'name', index: 8 },
        { text: 'DESCRIPTION: This is a description of api. Make it more clearly to developer. It\'s optional.',
        start: '',
        index: 9 },
        { text: 'URL: /data/card', start: 'url', index: 10 },
        { text: 'REQEUST:', start: '', index: 11 },
        { text: '    METHOD: POST', start: '', index: 12 },
        { text: '    PARAM:', start: '', index: 13 },
        { text: '', start: '', index: 14 },
        { text: '        name: "string text"         // normal string',
        start: '',
        index: 15 },
        { text: '        weight[OPTION]: 52.1        // float number, it\'s optional',
        start: '',
        index: 16 },
        { text: '        height[OPTION]: 180         // number, it\'s optional',
        start: '',
        index: 17 },
        { text: '        // uploaded local file, DocMock will save this picture for future',
        start: '',
        index: 18 },
        { text: '        picture: %FILE("./pic.png", true)%',
        start: '',
        index: 19 },
        { text: '        // uploaded local file, DocMock will not save this picture, it\'s optional',
        start: '',
        index: 20 },
        { text: '        picture2[OPTION]: %FILE(\'./pic2.png\')%',
        start: '',
        index: 21 },
        { text: '        blog: %URL("http://nodejs.in")%     // url link',
        start: '',
        index: 22 },
        { text: '', start: '', index: 23 },
        { text: 'RESPONSE:', start: 'response', index: 24 },
        { text: '    TYPE: JSON  // content type: JSON | TEXT',
        start: '',
        index: 25 },
        { text: '    STATUS: 200 // OPTION. status code, default value is 200',
        start: '',
        index: 26 },
        { text: '    CONTENT:', start: '', index: 27 },
        { text: '', start: '', index: 28 },
        { text: '        success: true,', start: '', index: 29 },
        { text: '        id_card:', start: '', index: 30 },
        { text: '            id: %RANDOM_NUMBER(9, 12)%  // return a random number, length between \'9 - 12\'',
        start: '',
        index: 31 },
        { text: '            weight: %PARAM(\'weight\')%   // return the passed param as string',
        start: '',
        index: 32 },
        { text: '            height: %PARAM(\'height\')%',
        start: '',
        index: 33 },
        { text: '            picture: %PARAM("picture")% // return the url string of uploaded pictrue',
        start: '',
        index: 34 },
        { text: '            blog: %PARAM("blog")%',
        start: '',
        index: 35 },
        { text: '            create_date: %NOW_DATE(\'YYYY"MDD\')% // return date by given format',
        start: '',
        index: 36 },
        { text: '        logo: %RANDOM_PIC(\'png\', \'24x24\')%      // return a random 24x24 png format picture',
        start: '',
        index: 37 },
        { text: '        key: %RANDOM_TEXT(12, 15)%              // return random string, length between \'12 - 15\'',
        start: '',
        index: 38 },
        { text: '', start: '', index: 39 },
        { text: 'RESPONSE:', start: 'response', index: 40 },
        { text: '    TYPE: JSON  // content type: JSON | TEXT',
        start: '',
        index: 41 },
        { text: '    CONTENT:', start: '', index: 42 },
        { text: '', start: '', index: 43 },
        { text: '    success: false,', start: '', index: 44 },
        { text: '    message: \'ERROR\'', start: '', index: 45 },
        { text: '', start: '', index: 46 }
    ];

    describe('#init()', function() {
        it('should return -1 when the value is not present', function() {
        });
    });

    describe('#print()', function() {
        it('should return format print of api src.', function() {
            var api = new Api([
                { text: 'NAME: Delete a ID card', start: 'name', index: 67 },
                { text: 'URL: /data/card?id=%RANDOM_NUMBER(9, 12)%',
                start: 'url',
                index: 68 },
                { text: 'REQEUST:', start: '', index: 69 },
                { text: '    METHOD: DELETE', start: '', index: 70 },
                { text: 'RESPONSE:', start: 'response', index: 71 },
                { text: '    TYPE: TEXT', start: '', index: 72 },
                { text: '    CONTENT:', start: '', index: 73 },
                { text: '', start: '', index: 74 },
                { text: '        {', start: '', index: 75 },
                { text: '            "success": true,', start: '', index: 76 },
                { text: '            "id": %NUMBER(PARAM(\'id\'))%',
                start: '',
                index: 77 },
                { text: '        }', start: '', index: 78 }
            ]);
            assert.equal('API START =======================\n\
67: NAME: Delete a ID card\n\
68: URL: /data/card?id=%RANDOM_NUMBER(9, 12)%\n\
69: REQEUST:\n\
70:     METHOD: DELETE\n\
71: RESPONSE:\n\
72:     TYPE: TEXT\n\
73:     CONTENT:\n\
74: \n\
75:         {\n\
76:             "success": true,\n\
77:             "id": %NUMBER(PARAM(\'id\'))%\n\
78:         }\n\
API END ====================\n', api.print());
        });
    });
});
