import React from 'react';
import Barcode from 'react-barcode';
 
class barcodeGen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            storeId:''
          };

        this.handleChange = this.handleChange.bind(this);
       
      }

   moveTobarcode(){
        console.log("hello world")
    }

    handleChange(event) {
        this.setState({storeId: event.target.value});
      }


    getOrders(){
        console.log("get the orderas");
        const data = { status: 'all' };
        var url="https://api-qa.jaegar.io/order/store/orders/"+this.state.storeId;
       // var url="https://www.youtube.com/watch?v=jXgc6ctpEpo";
    fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            "x-api-key": "uXegSDiQLQ8xwgrv1ehJCavoH4v0b7Ww9eMmQBmW"
        },
        body:JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
           // console.log("datafrom api"+JSON.stringify(result[0].order_id)+JSON.stringify(result[0].items[0].product_description)+JSON.stringify(result[0].items[0].upcs[0]));
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    
    render(){
    return (
       <div>
          <h1 style={titleStyle}>Welcome To Barcode Generator</h1>
           <p style={subTitle}>Please enter store id to see the inProgrees orders</p>
           <div style={storeID}>
                <label>
                    STORE ID:
                    <input style={inputBox} type="text" name="name" value={this.state.storeId} onChange={this.handleChange}/>
                </label>
                <button style={button} onClick={()=>this.getOrders()}>generate</button>
           </div>
           <div >

              { this.state.data.map(order=>(
               <ul style={mainBarcodes} key={order.order_id} onClick={this.moveTobarcode}> 
                 <h1 style={{color:'#b10689'}}>{order.order_id}</h1>
                  
                   {order.items.map(item=>(
                   <ul>  
                   <h2 style={{color:'green'}}>{item.product_description}</h2>
                   <h3>{item.upcs[0]}</h3>
                   <Barcode value={item.upcs[0]}/>
                   </ul>       
                  ))}
                   {/* {order.items[i].product_description} */}
                   {/* {order.items[i].upcs[0]} */}
                   
               </ul>
               ))}
               
           </div> 
       </div>
       

    );
}


}



//styles goes here

const titleStyle={
    color:'blue',
    textAlign:'center'
};

const subTitle={
    color:'green',
    textAlign:'center'
}

const  storeID={
    textAlign:'center'
}

const inputBox={
    borderColor:'black'
}

const button={
    paddingLeft:20,
    color:'grey',
    borderColor:'green'
}

const mainBarcodes={
    textAlign:'center',
    borderStyle:'double'
}



 
export default barcodeGen;