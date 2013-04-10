DocMock Test Api
===

Some markdown syntax word.

##First Api

NAME: Create a ID card.
DESCRIPTION: This is a description of api. Make it more clearly to developer. It's optional.
URL: /data/card
REQEUST:
    METHOD: POST
    PARAM:

        name: "string text"         // normal string
        weight[OPTION]: 52.1        // float number, it's optional
        height[OPTION]: 180         // number, it's optional
        // uploaded local file, DocMock will save this picture for future
        picture: %FILE("./pic.png", true)%
        // uploaded local file, DocMock will not save this picture, it's optional
        picture2[OPTION]: %FILE('./pic2.png')%
        blog: %URL("http://nodejs.in")%     // url link

RESPONSE:
    TYPE: JSON  // content type: JSON | TEXT
    STATUS: 200 // OPTION. status code, default value is 200
    CONTENT:

        success: true,
        id_card:
            id: %RANDOM_NUMBER(9, 12)%  // return a random number, length between '9 - 12'
            weight: %PARAM('weight')%   // return the passed param as string
            height: %PARAM('height')%
            picture: %PARAM("picture")% // return the url string of uploaded pictrue
            blog: %PARAM("blog")%
            create_date: %NOW_DATE('YYYY"MDD')% // return date by given format
        logo: %RANDOM_PIC('png', '24x24')%      // return a random 24x24 png format picture
        key: %RANDOM_TEXT(12, 15)%              // return random string, length between '12 - 15'

RESPONSE:
    TYPE: JSON  // content type: JSON | TEXT
    CONTENT:

    success: false,
    message: 'ERROR'


##Other two api

NAME: Get a ID card.
URL: /data/card?id=%RANDOM_NUMBER(9, 12)%
REQEUST:
    METHOD: GET
RESPONSE:
    TYPE: TEXT
    CONTENT:

        {
            "id_string": %PARAM('id')%,         // return passed id as string
            "id": %NUMBER(PARAM('id'))%,        // return passed id as number
            "type": %URL_PATH(1)%               // return 'card', path of url
        }

NAME: Delete a ID card
URL: /data/card?id=%RANDOM_NUMBER(9, 12)%
REQEUST:
    METHOD: DELETE
RESPONSE:
    TYPE: TEXT
    CONTENT:

        {
            "success": true,
            "id": %NUMBER(PARAM('id'))%
        }

