# API Document

## Create a new book.
```dm
POST /api/book/new {
    receive: 'ajax',
    get: {
        csrf: String
    },
    post: {
        title: String,
        content: String,
        time: String
    }
    data: {
        success: false,
        msg: '出错了',
        data: {
            id: @random(string)
        }
    },
    dataType: 'json'
}
```

## Get the content of one book.
```dm
GET /api/book/{id} {
    receive: 'ajax',
    get: {
        id: String
    },
    data: {
        title: String,
        content: String,
        time: String
    },
    dataType: 'json'
}
```
