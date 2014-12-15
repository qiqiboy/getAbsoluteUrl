getAbsoluteUrl
==============

获取页面中资源完整绝对的url地址

## 来龙去脉
页面中很多资源文件有时候我们都是用的相对路径引入的，但是遇到需要将地址传给第三方（如分享微博 微信时），往往需要传给完整的路径。此时简单暴力的写法是直接写个地址上去，该方法适用于已经预先知道将要上线的实际地址。还有一种可以变通的方法就是根据页面得到资源的完整绝对路径。

到底怎么做呢？
* A：解析页面url，得到http头、host、端口、path，再分析资源路径，然后拼接成最终的完整路径。很麻烦。
* B：通过小技巧让浏览器自动解析，简单快捷，这正式我们要讨论的内容。

我们可以利用浏览器本身支持的具有 src href 属性的节点对象来实现。\n
具体到我测试了两种情况，a链接和img图像。

```javascript

//测试一
//测试结果：ie8+ 得到完整地址，ie6 7得到的还是相对地址
var a=document.createElement('a');
a.href='abc.jpg';
console.log(a.href); 

//测试二
//测试结果：所有浏览器均支持。但是img只要赋予了src，浏览器就会立即开始加载资源，所以该方法不可取。
var img=new Image;
a.src='abc.jpg';
console.log(a.src);

````

由于Image对象的特性，我们不能使用它，只能从a标签上想想办法，既然只有ie6 ie7不兼容，那么就单独想想这俩货有啥hack办法。
于是想到了早期版本ie的getAttribute的一个特性，具体参见这里 http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
具体到就是利用第二个参数，让a标签返回完整的地址。


```javascript

//测试三
//测试结果：ie6 7得到完整地址，ie8+还是相对地址（不支持第二个参数模式）
var a=document.createElement('a');
a.href='abc.jpg';
console.log(a.getAttribute('href',4)); 

````

所以嘛，我们就结合第一个测试和第三个测试的结果就行了，最终得到了如下方法：

```javascript

function getAbsUrl(url){
    var a=document.createElement('a');
    a.href=url;
    return /^http/i.test(a.href)?a.href:a.getAttribute('href',4);
}

````
