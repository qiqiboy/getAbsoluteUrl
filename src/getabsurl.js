/*
 * @author qiqiboy
 * @github https://github.com/qiqiboy/CMask
 */
;
function getAbsUrl(url){
    var a=document.createElement('a');
    a.href=url;
    return /^http/i.test(a.href)?a.href:a.getAttribute('href',4);
}
