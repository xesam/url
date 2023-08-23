# `@xesam/url-dispatcher`

dispatch dynamic action with url-style text.

## Usage

```shell script
npm install @xesam/url-dispatcher
```

```javascript
const UrlDispatcher = requier('@xesam/url-dispatcher');

const urlDispatcher = new UrlDispatcher('test-url-dispatcher');
urlDispatcher.setActionParser(function(urlObject){
    return urlObject;
});

urlDispatcher.appendPlugin(function(action, pageContext, next){
    if(actin.type !== 'function'){
        return false;
    }
    if(action.name in pageConetxt){
        pageContext[actin.name](action.data);
    }
    next();
    return true;
});

urlDispatcher.appendPlugin(function(action, pageContext, next){
    if(actin.type !== 'link'){
        return false;
    }
    pageContext.openLink({
        src : action.data.src
    });
    next();
    return true;
});

urlDispatcher.appendPlugin(function(action, pageContext, next){
    if(actin.type !== 'pickImage'){
        return false;
    }
    pageContext.pickImage({
        type : action.data.type
    });
    return true;
});

```

打开一个链接：

```javascript
urlDispatcher.start('action://link?src=https%3A%2F%2Fgithub.com%2Fxesam%2Furl', pageContext); //https://github.com/xesam/url
```

执行一个方法：

```javascript
urlDispatcher.start('action://function/showModal?title=Title&content=ThisIsTheContent', pageContext);

```

选取一张图片：

```javascript
urlDispatcher.start('action://pickImage?type=png', pageContext);
setTimeout(()=>{
    urlDispatcher.receive({
        token:'1234',
        payload:{
            err:null,
            imagePath:'file://${the_image_path}'
        }
    });
}, 5000); //模拟 5 秒后用户选择图片成功
```


