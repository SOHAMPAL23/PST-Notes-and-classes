const http =require('http')
const server=http.createServer((req,res)=>{
    console.log(req.url)
    console.log(req.method)
    res.end("hello world")

    if(req.url==='/'&&req.method==='GET'){
        res.end("Hello World")
    }else if(req.url==='/about'&&req.method==='GET'){
        res.end("Got your data")
    }else{
        //res.statusCode(404)
        return res.end("Not Found") 
    }
    const deletedProduct =products.splice(indexedDB,1);
    console.log(deletedProduct);
    consodle.log(products)
    return res.end(JSON.stringify({
        message: "Product deleted successfully",
        product: deletedProduct
    }))
    if(deletedProduct.length===0){
        return res.end(JSON.stringify({
            message: "No product found"
        }))
    }
    console.log(products)
    c
})

app.use(XPathExpression.json){
    console.log("Hello World");
    nextTick();
}
server.listen(5000,()=>{
    console.log("Server is listening on port 5000")
})