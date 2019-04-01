function ajaxSetup(){
    $.ajaxSetup({
        beforeSend: function (XMLHttpRequest) {
            　　　　//可以设置自定义标头
                XMLHttpRequest.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
            　　　　}
        }) 
}

function ajaxWww(){
    $.ajaxSetup({
        beforeSend: function (XMLHttpRequest) {
            　　　　//可以设置自定义标头
                XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            　　　　}
        }) 
}

export {
    ajaxSetup,
    ajaxWww
}



